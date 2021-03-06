import React, { Component } from "react";
import classes from "./Layout.module.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import * as actionTypes from "../../store/actions/actionTypes";

import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import Modal from "../../components/UI/Modal/Modal";
import { ToastContainer } from "react-toastify";

class Layout extends Component {
    componentDidMount() {
        this.props.onAuthCheckState();
    }

    render() {
        return (
            <Auxiliary>
                <div>
                    <Toolbar />
                    <SideDrawer />

                    <Modal
                        show={this.props.showLoginModal}
                        modalClosed={this.props.onToggleLoginModal}
                    >
                        <Login
                            LoginModalToggle={this.props.onToggleLoginModal}
                        />
                    </Modal>

                    <Modal
                        show={this.props.showRegisterModal}
                        modalClosed={this.props.onToggleRegisterModal}
                    >
                        <Register
                            registerModalToggle={this.props.onToggleRegisterModal}
                        />
                    </Modal>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.any,
    onAuthCheckState: PropTypes.func,
    onToggleLoginModal: PropTypes.func,
    onToggleRegisterModal: PropTypes.func,
    showSideDrawer: PropTypes.func,
    showLoginModal: PropTypes.bool,
    showRegisterModal: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        showLoginModal: state.ux.showLoginModal,
        showRegisterModal: state.ux.showRegisterModal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState()),
        onToggleLoginModal: () =>
            dispatch({ type: actionTypes.TOGGLE_LOGIN_MODAL }),
        onToggleRegisterModal: () =>
            dispatch({ type: actionTypes.TOGGLE_REGISTER_MODAL }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
