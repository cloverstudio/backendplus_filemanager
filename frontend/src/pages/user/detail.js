import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';
import { Link } from "react-router-dom";
import { Breadcrumb, Icon,List,  Typography, Divider, Button  } from 'antd';
const { Title,Text } = Typography;

import Base from "../../components/base";
import * as constants from "../../lib/constants";
import * as actions from "../../actions";
import * as utils from "../../lib/utils";
import history from '../../lib/history';

export default (props) => {

  const [id, setId] = useState(props.match.params.id);
  const [model, setModel] = useState(null);
  const [listDataSource, setListDataSource] = useState([]);

  const dispatch = useDispatch();

  const globalState = {
    loading : useSelector(state => state.ui.loading),
    user : useSelector(state => state.user.detail),
  }

  const localActions = {
    loadOne: (id) => dispatch(actions.user.loadOne(id)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal:(params) => dispatch(actions.ui.showModal(params)),
  };

  useEffect(() => {

    (async() => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();

  },[]);

  useEffect(() => {

    console.log('aaa',globalState.user.username);

    setListDataSource([
      {
        label:"Id",
        content:<span>{globalState.user.id}</span>
      },
      {
        label:"Username",
        content:<span>{globalState.user.username}</span>
      },
      {
        label:"Token",
        content:<span>{globalState.user.token}</span>,
      },
      {
        label:"Modified At",
        content:<span>{utils.formatDate(globalState.user.modified_at)}</span>,
      },
      {
        label:"Created At",
        content:<span>{utils.formatDate(globalState.user.created_at)}</span>,
      },
    ]);

  },[globalState.user]);

  return <Base breadcrumb={
    <Breadcrumb>
      <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/user">User</Link></Breadcrumb.Item>
      <Breadcrumb.Item>Detail ({id})</Breadcrumb.Item>
    </Breadcrumb>
  }>

        <Title level={2}>User Detail</Title>
        <Divider />

        <List
          itemLayout="horizontal"
          dataSource={listDataSource}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={item.content}
              />
            </List.Item>
          )}
        />

        <Button type="primary" icon="edit" onClick={e => history.push(`/user/edit/${id}`)}>Edit</Button>
        &nbsp;<Button type="danger" icon="delete" onClick={e => history.push(`/user/delete/${id}`)}>Delete</Button>

  </Base>
};
