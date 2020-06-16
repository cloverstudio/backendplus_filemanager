import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  Icon,
  List,
  Typography,
  Divider,
  Button,
  Alert,
  Tag,
} from "antd";

const { Title, Text } = Typography;

import * as conf from "../../lib/conf";
import Base from "../../components/base";
import history from "../../lib/history";
import * as constants from "../../lib/constants";
import * as actions from "../../actions";
import * as utils from "../../lib/utils";

export default (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [model, setModel] = useState(null);

  const [tagList, setTagList] = useState({});
  const [tagIdList, setTagIdList] = useState({});

  const [listDataSource, setListDataSource] = useState([]);

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    photo: useSelector((state) => state.photo.detail),
    references: useSelector((state) => state.photo.references),
  };

  const localActions = {
    loadOne: (id) => dispatch(actions.photo.loadOne(id)),
    checkToken: () => dispatch(actions.login.checkToken()),
    deleteOne: (id) => dispatch(actions.photo.deleteOne(id)),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();
  }, []);

  useEffect(() => {
    if (!globalState.photo) return;

    setListDataSource([
      {
        label: "Id",
        content: <span>{globalState.photo.id}</span>,
      },

      {
        label: "Photo",
        content: (
          <span>
            {globalState.photo.photo ? (
              <ul className="image-list">
                {globalState.photo.photo.map((file) => {
                  return (
                    <li key={file.localFilename}>
                      <a
                        href={`${conf.baseRouteURL}/api/photo/file/${globalState.photo.id}/${file.localFilename}`}
                      >
                        {file.thumbs && file.thumbs["128"] ? (
                          <img
                            style={{ width: "128px" }}
                            src={`${conf.baseRouteURL}/api/photo/file/${globalState.photo.id}/${file.thumbs["128"]}`}
                          />
                        ) : (
                          <span>{file.name}</span>
                        )}
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
        label: "Tag",
        content: (
          <span>
            <Link to={`/tag/detail/${tagIdList[globalState.photo.tag]}`}>
              {tagList[globalState.photo.tag]}
            </Link>
          </span>
        ),
      },

      {
        label: "Modified At",
        content: <span>{utils.formatDate(globalState.photo.modified_at)}</span>,
      },
      {
        label: "Created At",
        content: <span>{utils.formatDate(globalState.photo.created_at)}</span>,
      },
    ]);
  }, [globalState.photo]);

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

  const tagOptions = constants.photoTagOptions;

  return (
    <Base
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/photo">Photo</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Delete ({globalState.photo.id})</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Delete</Title>
      <Text>Delete ({globalState.photo.id})</Text>
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
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.label} description={item.content} />
          </List.Item>
        )}
      />
      <Button
        type="primary"
        icon={globalState.loading ? "loading" : "delete"}
        onClick={(e) => localActions.deleteOne(id)}
      >
        Delete
      </Button>
      &nbsp;
      <Button type="danger" icon="caret-left" onClick={(e) => history.goBack()}>
        Cancel
      </Button>
    </Base>
  );
};
