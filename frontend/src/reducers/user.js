import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import * as types from '../actions/actionTypes';

import * as constants from '../lib/constants';

const list = (state = [], action) => {

    switch (action.type) {
        case types.USER_LOAD_LIST:
            console.log('ggg');
            return action.list;
        default:
            return state;
    }

}

const count = (state = [], action) => {

    switch (action.type) {
        case types.USER_LOAD_LIST:
            return action.count;
        default:
            return state;
    }

}

const pagingRowCount = (state = [], action) => {

    switch (action.type) {
        case types.USER_LOAD_LIST:
            return action.pagingRowCount;
        default:
            return state;
    }

}

const detail = (state = {}, action) => {

    switch (action.type) {
        case types.USER_LOAD_DETAIL:
            return action.detail;
        default:
            return state;
    }

}


export default combineReducers({
    list,
    detail,
    count,
    pagingRowCount
});