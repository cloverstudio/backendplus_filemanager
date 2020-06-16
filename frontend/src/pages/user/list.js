import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu, Icon, Table, Breadcrumb, Button } from 'antd';
const { Header, Sider, Content } = Layout;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";


import Base from "../../components/base";
import * as utils from "../../lib/utils";
import * as actions from "../../actions";
import * as constants from "../../lib/constants";
import history from '../../lib/history';

export default (props) => {

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  
  const globalState = {
    loading : useSelector(state => state.ui.loading),
    list : useSelector(state => state.user.list),
    count : useSelector(state => state.user.count),
    rowCount : useSelector(state => state.user.pagingRowCount),
    collapsed : useSelector(state => state.ui.sidebar),
  }

  const localActions = {
    checkToken: () => dispatch(actions.login.checkToken()),
    load: (page) => dispatch(actions.user.load({page})),
    refreshMaster: (type) => dispatch(actions.master.refresh(type)),
    toggleSidebar: () => dispatch(actions.ui.toggleSidebar()),
  };

  const loadPage = async (pageToGo) => {

    const totalPageCount = Math.ceil( globalState.count / globalState.rowCount);

    if(pageToGo > totalPageCount || pageToGo < 1 )
      return;

    setPage(pageToGo);
    localActions.load(pageToGo);

  }

  useEffect(() => {
    (async() => {
      await localActions.checkToken();
      await localActions.load(page);
    })();
  },[]);

  const totalPageCount = Math.ceil( globalState.count / globalState.rowCount);
  const pages = [];

  for(let i = 0 ; i < totalPageCount; i++){
    pages.push(i + 1);
  }

  const tableColumns = [
    {
      title: 'ID',
      key: 'id',
      render: (tmp,row) => (
        <span>
            <Link to={`/user/detail/${row.id}`}>{row.id}</Link>
        </span>
      ),
    },
    {
      title: 'Username',
      key: 'username',
      render: (tmp,row) => (
        <span>
            {row.username} 
        </span>
      ),
    },
    {
      title: 'Modified',
      key: 'modified_at',
      render: (tmp,row) => (
        <span>
            {utils.formatDate(row.modified_at)} 
        </span>
      ),
    },
    {
      title: 'Created',
      key: 'created_at',
      render: (tmp,row) => {
        return <span>
          {utils.formatDate(row.created_at)}
        </span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (tmp,row) => (
        <span>
            <Link to={`/user/edit/${row.id}`}>Update </Link>
            &nbsp;<Link to={`/user/delete/${row.id}`}>Delete</Link>
        </span>
      ),
    },
  ];

  return <Base breadcrumb={
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <Icon type="home" />
      </Breadcrumb.Item>
      <Breadcrumb.Item>User</Breadcrumb.Item>
    </Breadcrumb>
  }>

    <Button 
      id="add-button" 
      type="danger" 
      size="large" 
      icon="plus" 
      shape="circle" 
      onClick={e => history.push("/user/add")}
    />

    {globalState.list.length > 0 ? 
      <Table 
        columns={tableColumns} 
        dataSource={globalState.list} 
        pagination={{
          defaultCurrent:page,
          defaultPageSize:globalState.rowCount,
          total:globalState.count,
          onChange:loadPage
        }}
      />
      :
      <Table 
        columns={tableColumns} 
        dataSource={globalState.list} 
      />
    }

  </Base>
}
