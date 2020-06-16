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

  const [tagList, setTagList] = useState({});
  const [tagIdList, setTagIdList] = useState({});

  const [listDataSource, setListDataSource] = useState([]);

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    file: useSelector((state) => state.file.detail),
    references: useSelector((state) => state.file.references),
  };

  const localActions = {
    loadOne: (id) => dispatch(actions.file.loadOne(id)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal: (params) => dispatch(actions.ui.showModal(params)),

    loadTag: () => dispatch(actions.file.loadTag()),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();
  }, []);

  useEffect(() => {
    if (!globalState.file) return;

    setListDataSource([
      {
        label: "Id",
        content: <span>{globalState.file.id}</span>,
      },

      {
        label: "File",
        content: (
          <span>
            {globalState.file.file ? (
              <ul className="normal-list">
                {globalState.file.file.map((file) => {
                  return (
                    <li key={file.localFilename}>
                      <a
                        href={`${conf.baseRouteURL}/api/file/file/${globalState.file.id}/${file.localFilename}`}
                      >
                        {file.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </span>
        ),
      },

      {
        label: "Description",
        content: (
          <span>
            {globalState.file.description ? (
              <div>
                {globalState.file.description.split("\n").map(function (item) {
                  return (
                    <span>
                      {item}
                      <br />
                    </span>
                  );
                })}{" "}
              </div>
            ) : null}
          </span>
        ),
      },

      {
        label: "Tag",
        content: (
          <span>
            {globalState.file.tag ? (
              <ul className="normal-list">
                {globalState.file.tag.map((item) => {
                  return (
                    <li>
                      <Link to={`/tag/detail/${tagIdList[item]}`}>
                        {tagList[item]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </span>
        ),
      },

      {
        label: "Modified At",
        content: <span>{utils.formatDate(globalState.file.modified_at)}</span>,
      },
      {
        label: "Created At",
        content: <span>{utils.formatDate(globalState.file.created_at)}</span>,
      },
    ]);
  }, [globalState.file]);

  useEffect(() => {
    const tmpTagList = {};

    if (globalState.references.tag)
      globalState.references.tag.map((row) => {
        tmpTagList[row.id] = row.tag;
      });

    const tmpTagIdList = {};

    if (globalState.references.tag)
      globalState.references.tag.map((row) => {
        tmpTagIdList[row.id] = row.id;
      });

    setTagList(tmpTagList);
    setTagIdList(tmpTagIdList);
  }, [globalState.references]);

  const tagOptions = constants.fileTagOptions;

  return (
    <Base
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/file">File</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detail ({globalState.file.id})</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>File Detail</Title>
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
        onClick={(e) => history.push(`/file/edit/${id}`)}
      >
        Edit
      </Button>
      &nbsp;
      <Button
        type="danger"
        icon="delete"
        onClick={(e) => history.push(`/file/delete/${id}`)}
      >
        Delete
      </Button>
    </Base>
  );
};
