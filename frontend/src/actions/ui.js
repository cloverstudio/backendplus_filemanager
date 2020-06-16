import shajs from 'sha.js';
import { push } from 'connected-react-router'
import { Modal, Button, notification } from 'antd';

import * as types from "./actionTypes";
import api from '../lib/api';
import * as conf from "../lib/conf";
import * as utils from "../lib/utils";
import * as constants from "../lib/constants";

export function showLoading(){

    return {
        type: types.LOADING_SHOW
    }
}

export function hideLoading(){
    
    return {
        type: types.LOADING_HIDE
    }
}

export function toggleSidebar(){

    return async (dispatch, getState) => {

        if(getState().ui.sidebar)
            dispatch({
                type: types.SIDEBAR_HIDE
            });
        else    
            dispatch({
                type: types.SIDEBAR_SHOW
            });
    }

}
export function showToastInfo(message) {

    return async (dispatch, getState) => {

        const identifier = utils.getRandomString();

        notification['success']({
            message: message,
        });

    }

}

export function showToastError(message) {

    return async (dispatch, getState) => {

        const identifier = utils.getRandomString();

        notification['error']({
            message: message,
        });

    }

}

export function showModal({modalType,message,title}) {

    return async (dispatch, getState) => {

        if(modalType == constants.ModalTypeError){
            Modal.error({
                title: title,
                content: message
              });
        }


        if(modalType == constants.ModalTypeInfo){
            Modal.success({
                title: title,
                content: message
            });
        }

    }

}

export function hideModal() {

    return async (dispatch, getState) => {

        dispatch({
            type: types.MODAL_HIDE,
        });

    }

}

export function setSidemenuHighlight(page){

    return {
        type: types.SIDEBAR_HIGHLIGHT,
        page,
    }
}

