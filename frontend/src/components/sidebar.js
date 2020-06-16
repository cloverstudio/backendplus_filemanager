import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Icon, Layout } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;

import history from "../lib/history";
import * as actions from "../actions";

export default () => {
  const dispatch = useDispatch();

  const globalState = {
    collapsed: useSelector((state) => state.ui.sidebar),
    sidebarHightlight: useSelector((state) => state.ui.sidebarHightlight),
  };

  const localActions = {
    setSidemenuHighlight: (page) =>
      dispatch(actions.ui.setSidemenuHighlight(page)),
    doLogout: () => dispatch(actions.login.logout()),
    toggleSidebar: () => dispatch(actions.ui.toggleSidebar()),
  };

  const goPage = (page) => {
    localActions.setSidemenuHighlight(page);
    history.push("/" + page);
  };

  return (
    <Sider
      className="sidebar"
      collapsible
      collapsed={globalState.collapsed}
      onCollapse={localActions.toggleSidebar}
    >
      <div className="logo" />

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[globalState.sidebarHightlight]}
        selectedKeys={[globalState.sidebarHightlight]}
      >
        <Menu.Item key="user" onClick={() => goPage("user")}>
          <Icon type="table" />
          <span>User</span>
        </Menu.Item>

        <Menu.Item key="tag" onClick={() => goPage("tag")}>
          <Icon type="table" />
          <span>Tag</span>
        </Menu.Item>

        <Menu.Item key="file" onClick={() => goPage("file")}>
          <Icon type="table" />
          <span>File</span>
        </Menu.Item>

        <Menu.Item key="photo" onClick={() => goPage("photo")}>
          <Icon type="table" />
          <span>Photo</span>
        </Menu.Item>

        <Menu.Item key="doc" onClick={() => goPage("doc")}>
          <Icon type="read" />
          <span>Document</span>
        </Menu.Item>

        <Menu.Item key="signout" onClick={() => localActions.doLogout()}>
          <Icon type="logout" />
          <span>Sign out</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
