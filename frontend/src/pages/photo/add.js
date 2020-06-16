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
  const [photo, setPhoto] = useState([]);

  const [tag, setTag] = useState("");

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),

    tagList: useSelector((state) => state.photo.tagList),
  };

  const localActions = {
    add: (params) => dispatch(actions.photo.add(params)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal: (params) => dispatch(actions.ui.showModal(params)),

    loadTag: () => dispatch(actions.photo.loadTag()),
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
      photo: photo,

      tag: tag,
    });

    setPhoto("");

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
            <Link to="/photo">Photo</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add New</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Add New Photo</Title>
      <Text> Please input following fields</Text>
      <Divider />

      <Form
        {...constants.defailtFormLoayout.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item label="Photo">
          <input
            class="form-control"
            id="file-input"
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files)}
          />
        </Form.Item>

        <Form.Item label="Tag">
          <Select id="tag" name="tag" onChange={(value) => setTag(value)}>
            <Option value="">&nbsp;</Option>

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
            Add New Photo
          </Button>
        </Form.Item>
      </Form>
    </Base>
  );
};
