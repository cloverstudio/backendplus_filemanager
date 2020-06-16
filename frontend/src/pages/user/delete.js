import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment';
import { Link } from "react-router-dom";
import { Breadcrumb, Icon,List,  Typography, Divider, Button, Alert  } from 'antd';
const { Title,Text } = Typography;

import Base from "../../components/base";
import * as constants from "../../lib/constants";
import history from '../../lib/history';
import * as actions from "../../actions";
import * as utils from "../../lib/utils";

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
    deleteOne:(id) => dispatch(actions.user.deleteOne(id)),
  };

  useEffect(() => {

    (async() => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();

  },[]);


  useEffect(() => {

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
      <Breadcrumb.Item>Delete ({id})</Breadcrumb.Item>
    </Breadcrumb>
  }>


        <Title level={2}>User Delete</Title>
        <Divider />

        <Alert
          message="Warning"
          description="Are you sure you want to permanently remove this record ?"
          type="warning"
          showIcon
        />


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

        <Button type="primary" icon={globalState.loading? "loading":"delete"} onClick={e => localActions.deleteOne(id)}>Delete</Button>
        &nbsp;<Button type="danger" icon="caret-left" onClick={e => history.goBack()}>Cancel</Button>

    </Base>
};
