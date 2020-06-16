import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as types from "../actions/actionTypes";

import ui from "./ui";
import user from "./user";
import loginuser from "./loginuser";

import tag from "./tag";

import file from "./file";

import photo from "./photo";

const testReducer = (state = "", action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default () =>
  combineReducers({
    tag,

    file,

    photo,

    ui,
    user,
    testReducer,
    loginuser,
  });
