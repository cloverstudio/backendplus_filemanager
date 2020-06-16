import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import * as types from '../actions/actionTypes';

import * as constants from '../lib/constants';

const user = (state = {}, action) => {

    switch (action.type) {

        case types.UPDATE_USER:
            return action.user;
        default:
            return state;
    }

}

export default combineReducers({
    user
});