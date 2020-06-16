import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as types from "../actions/actionTypes";

import * as constants from "../lib/constants";

const list = (state = [], action) => {
  switch (action.type) {
    case types.FILE_LOAD_LIST:
      return action.list;
    default:
      return state;
  }
};

const references = (state = [], action) => {
  switch (action.type) {
    case types.FILE_LOAD_LIST:
      return action.references;
    case types.FILE_LOAD_DETAIL:
      return action.references;
    default:
      return state;
  }
};

const count = (state = [], action) => {
  switch (action.type) {
    case types.FILE_LOAD_LIST:
      return action.count;
    default:
      return state;
  }
};

const pagingRowCount = (state = [], action) => {
  switch (action.type) {
    case types.FILE_LOAD_LIST:
      return action.pagingRowCount;
    default:
      return state;
  }
};

const detail = (state = {}, action) => {
  switch (action.type) {
    case types.FILE_LOAD_DETAIL:
      return action.detail;
    default:
      return state;
  }
};

const tagList = (state = [], action) => {
  switch (action.type) {
    case types.FILE_REFER_TAG_LOAD_LIST:
      return action.list;
    default:
      return state;
  }
};

export default combineReducers({
  list,
  references,
  detail,
  count,
  pagingRowCount,

  tagList,
});
