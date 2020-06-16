import shajs from 'sha.js';
import { push } from 'connected-react-router'
import { notification } from 'antd';

import history from '../lib/history';

import * as types from "./actionTypes";
import api from '../lib/api';
import * as conf from "../lib/conf";
import * as constants from "../lib/constants";

import * as actions from "./index";
import * as utils from '../lib/utils';

export function login({username,password}) {

    return async (dispatch, getState) => {

        dispatch(actions.ui.showLoading());

        const passwordHash = shajs('sha256').update(password + conf.cryptoSecret).digest('hex');

        const response = await api.post("/signin",{
            username:username,
            password:password
        });

        if(response && response.token){

            localStorage.setItem(
                constants.LocalStorageKeyToken, 
                response.token
            );

            notification['success']({
                message: 'Login succeed',
                description:''
            });

            dispatch(actions.ui.hideLoading());

            await utils.wait(0.1);
            
            history.push('/user');

        }else{

            dispatch(actions.ui.showToastError(response));

            notification['error']({
                message: 'Login faild',
                description:response
            });

            dispatch(actions.ui.hideLoading());

        }

        
    }

}

export function logout() {

    return async (dispatch, getState) => {

        localStorage.removeItem(
            constants.LocalStorageKeyToken
        );

        dispatch(actions.ui.showToastInfo('Logged out.'));

        history.push('/');
       
    }

}

export function checkToken() {

    return async (dispatch, getState) => {

        const token = localStorage.getItem(
            constants.LocalStorageKeyToken
        );

        const response = await api.post("/signin/checktoken",{
            token:token
        });

        if(response && response.valid){
            
            dispatch({
                type: types.UPDATE_USER,
                user:response.user
            });

        }else{

            dispatch(actions.ui.showToastError('Session timeout. Please login again.'));
            history.push('/');

        }

    }

}
