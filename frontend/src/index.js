import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";

// import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faArrowRight,
  faSpinner,
  faInfoCircle,
  faExclamationCircle,
  faList,
  faPlus,
  faSignOutAlt,
  faPencilAlt,
  faTrashAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faKey,
  faArrowRight,
  faArrowLeft,
  faSpinner,
  faInfoCircle,
  faExclamationCircle,
  faList,
  faPlus,
  faSignOutAlt,
  faPencilAlt,
  faTrashAlt
);

import history from "./lib/history";

// load css
import css from "../scss/style.scss";

import Login from "./pages/login";
import UserList from "./pages/user/list";
import UserAdd from "./pages/user/add";
import UserDetail from "./pages/user/detail";
import UserDelete from "./pages/user/delete";
import UserEdit from "./pages/user/edit";

import TagList from "./pages/tag/list";
import TagAdd from "./pages/tag/add";
import TagDetail from "./pages/tag/detail";
import TagDelete from "./pages/tag/delete";
import TagEdit from "./pages/tag/edit";

import FileList from "./pages/file/list";
import FileAdd from "./pages/file/add";
import FileDetail from "./pages/file/detail";
import FileDelete from "./pages/file/delete";
import FileEdit from "./pages/file/edit";

import PhotoList from "./pages/photo/list";
import PhotoAdd from "./pages/photo/add";
import PhotoDetail from "./pages/photo/detail";
import PhotoDelete from "./pages/photo/delete";
import PhotoEdit from "./pages/photo/edit";

import Document from "./pages/document";

import NotFound from "./pages/notfound";

import createRootReducer from "./reducers";

const preloadedState = undefined;

const store = createStore(
  createRootReducer(), // root reducer with router state
  preloadedState,
  compose(applyMiddleware(ReduxThunk))
);

document.title = "File Manager | backend+";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user" component={UserList} />
        <Route path="/user/add" component={UserAdd} />
        <Route path="/user/detail/:id" component={UserDetail} />
        <Route path="/user/delete/:id" component={UserDelete} />
        <Route path="/user/edit/:id" component={UserEdit} />

        <Route exact path="/tag" component={TagList} />
        <Route path="/tag/add" component={TagAdd} />
        <Route path="/tag/detail/:id" component={TagDetail} />
        <Route path="/tag/delete/:id" component={TagDelete} />
        <Route path="/tag/edit/:id" component={TagEdit} />

        <Route exact path="/file" component={FileList} />
        <Route path="/file/add" component={FileAdd} />
        <Route path="/file/detail/:id" component={FileDetail} />
        <Route path="/file/delete/:id" component={FileDelete} />
        <Route path="/file/edit/:id" component={FileEdit} />

        <Route exact path="/photo" component={PhotoList} />
        <Route path="/photo/add" component={PhotoAdd} />
        <Route path="/photo/detail/:id" component={PhotoDetail} />
        <Route path="/photo/delete/:id" component={PhotoDelete} />
        <Route path="/photo/edit/:id" component={PhotoEdit} />

        <Route exact path="/doc" component={Document} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
