import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  Layout,
  Menu,
  Icon,
  Table,
  Breadcrumb,
  Button,
  Tag,
  Tooltip,
} from "antd";

import Base from "../../components/base";
import Truncate from "../../components/truncate";
import history from "../../lib/history";
import customFilterTextBox from "../../components/customFilterTextbox";

import * as conf from "../../lib/conf";
import * as utils from "../../lib/utils";
import * as actions from "../../actions";
import * as constants from "../../lib/constants";

export default (props) => {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [filterString, setFilterString] = useState(null);

  const [tagList, setTagList] = useState({});
  const [tagIdList, setTagIdList] = useState({});

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    list: useSelector((state) => state.file.list),
    references: useSelector((state) => state.file.references),
    count: useSelector((state) => state.file.count),
    rowCount: useSelector((state) => state.file.pagingRowCount),

    tagList: useSelector((state) => state.file.tagList),
  };

  const localActions = {
    checkToken: () => dispatch(actions.login.checkToken()),
    load: () =>
      dispatch(actions.file.load({ page, sortKey, sortOrder, filterString })),
    refreshMaster: (type) => dispatch(actions.master.refresh(type)),

    loadTag: () => dispatch(actions.file.loadTag()),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
      await localActions.load();

      await localActions.loadTag();
    })();
  }, []);

  useEffect(() => {
    localActions.load();
  }, [page, sortKey, sortOrder, filterString]);

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.columnKey != sortKey) setSortKey(sorter.columnKey);

    if (sorter.order != sortOrder) setSortOrder(sorter.order);

    if (pagination.current != page) setPage(pagination.current);

    Object.keys(filters).map((paramName) => {
      if (Array.isArray(filters[paramName])) {
        if (filters[paramName].length > 0)
          filters[paramName] = filters[paramName].map((val) => val);
        else delete filters[paramName];
      }
    });

    const newFilterString = JSON.stringify(filters);
    console.log("newFilterString", newFilterString);

    if (newFilterString != filterString) setFilterString(newFilterString);
  };

  let tableColumns = [
    {
      title: "ID",
      key: "id",
      sorter: (a, b) => null,
      sortDirections: ["descend", "ascend"],
      render: (tmp, row) => (
        <span>
          <Link to={`/file/detail/${row.id}`}>{row.id}</Link>
        </span>
      ),
    },

    {
      title: "File",

      title: "File",
      key: "file",

      render: (tmp, row) => (
        <span>
          {row.file ? (
            <ul className="normal-list">
              {row.file.map((file) => {
                return (
                  <li key={file.localFilename}>
                    <a
                      href={`${conf.baseRouteURL}/api/file/file/${row.id}/${file.localFilename}`}
                    >
                      <Truncate text={file.name} />
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
      title: "Tag",

      title: "Tag",
      key: "tag",

      render: (tmp, row) => (
        <span>
          {row.tag ? (
            <ul className="normal-list">
              {row.tag.map((item) => {
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
      title: "Modified",
      key: "modified_at",
      sorter: (a, b) => null,
      sortDirections: ["descend", "ascend"],
      render: (tmp, row) => (
        <Tooltip
          placement="topLeft"
          title={utils.formatDate(row.modified_at)}
          arrowPointAtCenter
        >
          {utils.formatDateShort(row.modified_at)}
        </Tooltip>
      ),
    },
    {
      title: "Created",
      key: "created_at",
      sorter: (a, b) => null,
      sortDirections: ["descend", "ascend"],
      render: (tmp, row) => (
        <Tooltip
          placement="topLeft"
          title={utils.formatDate(row.created_at)}
          arrowPointAtCenter
        >
          {utils.formatDateShort(row.created_at)}
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (tmp, row) => (
        <span>
          <Link to={`/file/edit/${row.id}`}>Edit </Link>
          &nbsp;<Link to={`/file/delete/${row.id}`}>Delete</Link>
        </span>
      ),
    },
  ];

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

  const totalPageCount = Math.ceil(globalState.count / globalState.rowCount);
  const pages = [];

  for (let i = 0; i < totalPageCount; i++) {
    pages.push(i + 1);
  }

  const tagOptions = constants.fileTagOptions;

  return (
    <Base
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>File</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Button
        id="add-button"
        type="danger"
        size="large"
        icon="plus"
        shape="circle"
        onClick={(e) => history.push("/file/add")}
      />

      {(() => {
        // add dynamic filters
        tableColumns = tableColumns.map((column) => {
          if (column.key == "tag") {
            column.filters = globalState.tagList.map((obj) => {
              return {
                text: obj.tag,
                value: obj.id,
              };
            });
          }

          return column;
        });
      })()}

      {globalState.list.length > 0 ? (
        <Table
          columns={tableColumns}
          dataSource={globalState.list}
          pagination={{
            defaultCurrent: page,
            defaultPageSize: globalState.rowCount,
            total: globalState.count,
          }}
          onChange={handleTableChange}
        />
      ) : (
        <Table
          columns={tableColumns}
          dataSource={globalState.list}
          onChange={handleTableChange}
        />
      )}
    </Base>
  );
};
