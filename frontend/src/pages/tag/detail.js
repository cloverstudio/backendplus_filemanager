import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Link } from "react-router-dom";
import { Breadcrumb, Icon, List, Typography, Divider, Button, Tag } from "antd";
const { Title, Text } = Typography;

import Base from "../../components/base";
import history from "../../lib/history";
import * as constants from "../../lib/constants";
import * as actions from "../../actions";
import * as utils from "../../lib/utils";
import * as conf from "../../lib/conf";

export default (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [model, setModel] = useState(null);

  const [listDataSource, setListDataSource] = useState([]);

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    tag: useSelector((state) => state.tag.detail),
    references: useSelector((state) => state.tag.references),
  };

  const localActions = {
    loadOne: (id) => dispatch(actions.tag.loadOne(id)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal: (params) => dispatch(actions.ui.showModal(params)),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();
  }, []);

  useEffect(() => {
    if (!globalState.tag) return;

    setListDataSource([
      {
        label: "Id",
        content: <span>{globalState.tag.id}</span>,
      },

      {
        label: "Tag",
        content: <span>{globalState.tag.tag}</span>,
      },

      {
        label: "Modified At",
        content: <span>{utils.formatDate(globalState.tag.modified_at)}</span>,
      },
      {
        label: "Created At",
        content: <span>{utils.formatDate(globalState.tag.created_at)}</span>,
      },
    ]);
  }, [globalState.tag]);

  useEffect(() => {}, [globalState.references]);

  return (
    <Base
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/tag">Tag</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail ({globalState.tag.id})</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Tag Detail</Title>
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={listDataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.label} description={item.content} />
          </List.Item>
        )}
      />
      <Button
        type="primary"
        icon="edit"
        onClick={(e) => history.push(`/tag/edit/${id}`)}
      >
        Edit
      </Button>
      &nbsp;
      <Button
        type="danger"
        icon="delete"
        onClick={(e) => history.push(`/tag/delete/${id}`)}
      >
        Delete
      </Button>
    </Base>
  );
};
