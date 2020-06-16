import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

import Sidebar from "./sidebar";

export default (props) => {
  
  return <Layout className="layout-top">

    <Sidebar />

    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}></Header>
      <div className="breadcrumb">{props.breadcrumb}</div>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
    </Layout>
</Layout>
}
