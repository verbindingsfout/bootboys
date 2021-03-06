import * as actionTypes from "../actions/actionTypes";

const initialState = {
    showSideDrawer: false,
    showLoginModal: false,
    showRegisterModal: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SIDEDRAWER:
            return {
                ...state,
                showSideDrawer: !state.showSideDrawer,
            };
        case actionTypes.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: !state.showLoginModal,
            };
        case actionTypes.TOGGLE_REGISTER_MODAL:
            return {
                ...state,
                showRegisterModal: !state.showRegisterModal,
            };
        default:
            return state;
    }
};

export default reducer;
