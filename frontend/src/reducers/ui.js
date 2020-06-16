import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import * as types from '../actions/actionTypes';

import * as constants from '../lib/constants';

const loading = (state = false, action) => {

    switch (action.type) {
        case types.LOADING_SHOW:
            return true;
        case types.LOADING_HIDE:
            return false;
        default:
            return state;
    }

}

const alerts = (state = [], action) => {

    switch (action.type) {

        case types.TOAST_INFO_SHOW:
            return [...state,{
                type:constants.ToastTypeInfo,
                message:action.message,
                identifier:action.identifier
            }];

        case types.TOAST_ERROR_SHOW:
            return [...state,{
                type:constants.ToastTypeError,
                message:action.message,
                identifier:action.identifier
            }];

        case types.TOAST_HIDE:
            return state.filter( (alert) => {
                return alert.identifier != action.identifier
            });

        default:
            return state;
    }
};

const modal = (state = {
                show:false,
                message:"",
                type:constants.ModalTypeInfo,
                title:""
    }, action) => {

    switch (action.type) {
        case types.MODAL_SHOW:
            return {
                show:true,
                message:action.message,
                type:action.modalType,
                title:action.title
            };
        case types.MODAL_HIDE:
            return {
                show:false,
                message:action.message,
                type:action.modalType,
                title:action.title
            };
        default:
            return state;
    }

}

const sidebar = (state = false, action) => {

    switch (action.type) {
        case types.SIDEBAR_SHOW:
            return true;
        case types.SIDEBAR_HIDE:
            return false;
        default:
            return state;
    }

}

const sidebarHightlight = (state = "user", action) => {

    switch (action.type) {
        case types.SIDEBAR_HIGHLIGHT:
            return action.page;
        default:
            return state;
    }

}

export default combineReducers({
    alerts,
    modal,
    loading,
    sidebar,
    sidebarHightlight
});