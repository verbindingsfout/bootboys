import React, {Component} from "react"
import './DockMap.css'
import ToastMaker from "../../shared/ToastMaker";
import Map from '../../Dock/Map/Map';

const EXTRA_SPACE_AT_TOP = 25
const PERCENTAGE_TO_SHRINK = 0.7
const MOBILE_WIDTH_PX = 750

export default class DockMap extends Component {


    state = {
        BASE_LAT: 52.143929,
        BASE_LON: 4.5603223,
        lat: 52.143929,
        lon: 4.5603223,
        zoom: 11,
        filteredDocks: [],
        geolocationAllowed: false
    }


    render() {
        return (
            <Map 
                defaultOptions
                id={'dockMap'} 
                center={[this.state.lat, this.state.lon]} 
                zoom={this.state.zoom} 
                docks={this.state.filteredDocks}
                bounds={!this.state.geolocationAllowed}
            />
        )
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        setMapHeight()
        this.getGeoPermissions().then(
            result => {
                this.validateGeoPerms(result.state)
            }
        )
    }

    getGeoPermissions() {
        return navigator.permissions.query({name: 'geolocation'}).then(function (result) {
            return result
        });
    }

    validateGeoPerms(state) {
        if (state === 'granted' || state === 'prompt') {
            this.getGeoLocation()
        } else {
            this.setDefaultMapCenter()
            ToastMaker.errorToast('Geolocation perms not granted')
        }
    }

    getGeoLocation(){
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                geolocationAllowed: true
            })
        }, () => {
            this.setDefaultMapCenter()
            if (navigator.permissions.query({ name: 'geolocation' })){
                ToastMaker.errorToast('Geolocation perms not granted')
            }else{
                ToastMaker.errorToast('Couldn\'t get current position')
            }

        })
    }

    setDefaultMapCenter() {
        this.setMapCenter(this.state.BASE_LAT, this.state.BASE_LON)
    }

    setMapCenter(lat, lon){
        this.setState({
            lat: lat,
            long: lon,
        })
    }

    setDataForMarkers(filteredDocksInput) {
        this.filteredDocks = filteredDocksInput
        this.setState({
            filteredDocks: filteredDocksInput
        })
    }

    // TODO delete
    getPositionFromIndex(index) {
        return [this.filteredDocks[index].latitude, this.filteredDocks[index].longitude]
    }

    getFieldFromFilterdDocks(index, field) {
        return this.filteredDocks[index][field]
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (isNotOnMobileResolution()) {
            document.getElementById('dockMap').style.marginTop = addSuffix((window.scrollY + EXTRA_SPACE_AT_TOP), "px")
            setMapHeight()
        }
    }
}

function addSuffix(input, suffix) {
    return input + suffix
}

function setMapHeight() {
    document.getElementById('dockMap').style.height = (window.innerHeight * PERCENTAGE_TO_SHRINK) + "px"
}

function isNotOnMobileResolution() {
    return window.innerWidth > MOBILE_WIDTH_PX
}