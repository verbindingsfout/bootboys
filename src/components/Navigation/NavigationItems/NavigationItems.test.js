import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import {NavigationItems} from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    it('should render three <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems/>)

        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    
    it('should render five <NavigationItem /> elements if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated />)

        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    })

})