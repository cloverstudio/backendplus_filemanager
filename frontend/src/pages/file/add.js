import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import DateTime from "react-datetime";
import {
  Breadcrumb,
  Icon,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Select,
  Radio,
  Checkbox,
  Upload,
} from "antd";
const { Title, Text } = Typography;
const { Option } = Select;

import Base from "../../components/base";
import * as constants from "../../lib/constants";
import * as utils from "../../lib/utils";

import Toast from "../../components/toast";
import Modal from "../../components/modal";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";

import * as actions from "../../actions";
import * as validate from "../../lib/validate";

export default () => {
  const [file, setFile] = useState([]);

  const [description, setDescription] = useState("");

  const [tag, setTag] = useState([]);

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),

    tagList: useSelector((state) => state.file.tagList),
  };

  const localActions = {
    add: (params) => dispatch(actions.file.add(params)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal: (params) => dispatch(actions.ui.showModal(params)),

    loadTag: () => dispatch(actions.file.loadTag()),
  };

  useEffect(() => {
    (async () => {
      await localActions.loadTag();
    })();
  }, []);

  const add = async () => {
    if (globalState.loading) return;

    // validation

    await localActions.add({
      file: file,

      description: description,

      tag: tag,
    });

    setFile("");

    setDescription("");

    setTag("");
  };

  // update handler

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
          <Breadcrumb.Item>Add New</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Add New File</Title>
      <Text> Please input following fields</Text>
      <Divider />

      <Form
        {...constants.defailtFormLoayout.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item label="File">
          <input
            class="form-control"
            id="file-input"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files)}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="9"
          />
        </Form.Item>

        <Form.Item label="Tag">
          <Select
            mode="multiple"
            id="tag"
            name="tag"
            onChange={(value) => setTag(value)}
          >
            {globalState.tagList.map((obj) => {
              return <Option value={obj.id}>{obj.tag}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item {...constants.defailtFormLoayout.button}>
          <Button
            icon={globalState.loading ? "loading" : "plus"}
            type="primary"
            onClick={() => {
              add();
            }}
          >
            Add New File
          </Button>
        </Form.Item>
      </Form>
    </Base>
  );
};
