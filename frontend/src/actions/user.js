import shajs from 'sha.js';
import { push } from 'connected-react-router'

import * as types from "./actionTypes";
import api from '../lib/api';
import * as conf from "../lib/conf";
import * as utils from "../lib/utils";
import * as constants from "../lib/constants";
import * as actions from "./index";
import history from '../lib/history';

export function load({page}) {

    return async (dispatch, getState) => {

        dispatch(actions.ui.showLoading());

        try{
            
            if(!page || page < 0)
                page = 1;

            const response = await api.get("/user?page=" + page);

            if(!response || !response.list){
                dispatch(actions.ui.showToastError('Failed to load user.'));
                dispatch(actions.ui.hideLoading());
                return;
            }

            const userList = response.list;
            const count = response.count;
            const pagingRowCount = response.pagingRowCount;

            dispatch({
                type:types.USER_LOAD_LIST,
                list:userList,
                count,
                pagingRowCount
            });

            dispatch(actions.ui.hideLoading());

        } catch(e){
            console.error(e);
            dispatch(actions.ui.showToastError('Failed to load user.'));
            dispatch(actions.ui.hideLoading());
        }
        
    }

}


export function add(params) {

    return async (dispatch, getState) => {

        dispatch(actions.ui.showLoading());

        try{

            const response = await api.post("/user",params);

            if(response && response.user){
                dispatch(actions.ui.showToastInfo("Successfuly added."));
            } else {
                dispatch(actions.ui.showToastError(response));
            }

            history.push('/user');

        } catch(e){
            dispatch(actions.ui.showToastError('Failed to add.'));
            dispatch(actions.ui.hideLoading());
        }
        
    }

}

export function loadOne(id) {


    return async (dispatch, getState) => {

        dispatch(actions.ui.showLoading());

        try{

            const response = await api.get(`/user/${id}`);

            dispatch({
                type:types.USER_LOAD_DETAIL,
                detail:response.user
            })

            dispatch(actions.ui.hideLoading());

        } catch(e){
            console.error(e);
            dispatch(actions.ui.showToastError('Failed to load user.'));
            dispatch(actions.ui.hideLoading());
        }
        
    }

}


export function deleteOne(id) {

    return async (dispatch, getState) => {

        dispatch(actions.ui.showLoading());

        try{

            const response = await api.delete(`/user/${id}`);

            if(response && response.deleted){
                dispatch(actions.ui.showToastInfo("Deleted successfully."));
            } else {
                dispatch(actions.ui.showToastError('Failed to delete user.'));
            }

            //dispatch(actions.ui.hideLoading());

            //history.push('/user');

        } catch(e){
            console.error(e);
            dispatch(actions.ui.showToastError('Failed to delete user.'));
            dispatch(actions.ui.hideLoading());
        }
        
    }

}

export function update(params) {

    return async (dispatch, getState) => {

        dispatch(actions.ui.showLoading());

        try{

            const response = await api.put("/user",params);

            if(response && response.user){
                dispatch(actions.ui.showToastInfo("Updated successfully."));
            } else {
                dispatch(actions.ui.showToastError(response));
            }

            dispatch(actions.ui.hideLoading());

            history.push('/user');

        } catch(e){
            console.error(e);
            dispatch(actions.ui.showToastError('Failed to update user.'));
            dispatch(actions.ui.hideLoading());
        }
        
    }

}

