import React, { Component } from "react";
import classes from "./AddressCreator.module.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { countryCodes } from "./countryCodes";
import { queryAddressLatLong } from "./LocationQuery";

class AddressCreator extends Component {
    state = {
        street: { value: "", valid: false },
        number: { value: "", valid: false },
        postalcode: { value: "", valid: false },
        city: { value: "", valid: false },
        country: { value: "NL", valid: true },
        isFormValid: false,
        isSubmitting: false,
        isBadAddress: false,
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.addAddressLoading === false &&
            this.props.addAddressLoading
        ) {
            this.resetAddressForm();
            this.props.toggleModal();
        }
    }

    onInputChange = (id, value, valid) => {
        this.setState({
            [id]: { value, valid },
        });
        this.setFormValidityToState();
    };

    setFormValidityToState = () => {
        this.setState((prevState) => {
            return {
                isFormValid:
                    prevState.street.valid &&
                    prevState.number.valid &&
                    prevState.postalcode.valid &&
                    prevState.city.valid &&
                    prevState.country.valid,
            };
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ isSubmitting: true });

        if (this.state.isBadAddress) {
            this.submitNewAddress();
        } else {
            this.checkAddressExists();
        }
    };

    getAddressFromInputValues = () => {
        return {
            street: this.state.street.value,
            houseNumber: this.state.number.value,
            postalcode: this.state.postalcode.value.split(" ").join(""),
            city: this.state.city.value,
            country: this.state.country.value,
        };
    };

    checkAddressExists = () => {
        const address = this.getAddressFromInputValues();
        queryAddressLatLong(address)
            .then(() => {
                this.submitNewAddress();
            })
            .catch(() => {
                this.showBadAddressWarning(address);
            });
    };

    showBadAddressWarning = () => {
        this.setState({
            isBadAddress: true,
            isSubmitting: false,
        });
    };

    submitNewAddress = () => {
        const address = this.getAddressFromInputValues();
        this.props.onAddUserAddress(address);
    };

    resetAddressForm = () => {
        this.setState({
            street: { value: "", valid: false },
            number: { value: "", valid: false },
            postalcode: { value: "", valid: false },
            city: { value: "", valid: false },
            country: { value: "", valid: true },
            isFormValid: false,
            isBadAddress: false,
            isSubmitting: false,
        });
    };

    render() {
        let loadingSpinner = this.state.isSubmitting && (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );

        return (
            <div>
                <div className={classes.AddressCreator}>
                    {loadingSpinner}
                    <h5>Add a new Address</h5>
                    <form
                        onSubmit={this.onSubmit}
                        className={classes.AddressForm}
                    >
                        <Input
                            className={classes.InputHalf}
                            id="street"
                            type="text"
                            value={this.state.street.value}
                            label="Street"
                            placeholder="Applestreet"
                            validationRules={{
                                required: true,
                            }}
                            notifyParentOfChange={this.onInputChange}
                        />
                        <Input
                            className={classes.InputHalf}
                            id="number"
                            type="text"
                            value={this.state.number.value}
                            label="Number"
                            placeholder="12e"
                            validationRules={{
                                required: true,
                            }}
                            notifyParentOfChange={this.onInputChange}
                        />
                        <Input
                            className={classes.InputHalf}
                            id="postalcode"
                            type="text"
                            value={this.state.postalcode.value}
                            label="Postal code"
                            placeholder="1234AB"
                            validationRules={{
                                required: true,
                                isPostalcode: true,
                            }}
                            notifyParentOfChange={this.onInputChange}
                        />
                        <Input
                            className={classes.InputHalf}
                            id="city"
                            type="text"
                            value={this.state.city.value}
                            label="City"
                            placeholder="Leiden"
                            validationRules={{
                                required: true,
                            }}
                            notifyParentOfChange={this.onInputChange}
                        />
                        <Select
                            className={classes.Input}
                            id="country"
                            value={this.state.country.value}
                            label="Country"
                            invalidMessage="Please select a country"
                            options={countryCodes}
                            notifyParentOfChange={this.onInputChange}
                        />
                        <div className={classes.ButtonContainer}>
                            <Button disabled={!this.state.isFormValid}>
                                {this.state.isBadAddress
                                    ? "Yes continue"
                                    : "Add address"}
                            </Button>
                        </div>
                    </form>
                    {this.state.isBadAddress && (
                        <p className={classes.Warning}>
                            The address entered above could not be resolved do
                            you want to continue anyway?
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

AddressCreator.propTypes = {
    addAddress: PropTypes.func,
    notifyDockCreatorAddressAdded: PropTypes.func,
    onAddUserAddress: PropTypes.func,
    addAddressLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        addAddressLoading: state.address.addAddressLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUserAddress: (address) =>
            dispatch(actions.addUserAddress(address)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressCreator);
