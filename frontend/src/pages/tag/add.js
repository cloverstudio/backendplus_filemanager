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
  const [tag, setTag] = useState("");

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
  };

  const localActions = {
    add: (params) => dispatch(actions.tag.add(params)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal: (params) => dispatch(actions.ui.showModal(params)),
  };

  useEffect(() => {
    (async () => {})();
  }, []);

  const add = async () => {
    if (globalState.loading) return;

    // validation

    if (!tag || tag == "")
      return localActions.showModal({
        modalType: constants.ModalTypeError,
        message: "Tag cannot be empty",
        title: "Validation Error",
      });

    await localActions.add({
      tag: tag,
    });

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
            <Link to="/tag">Tag</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add New</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Add New Tag</Title>
      <Text> Please input following fields</Text>
      <Divider />

      <Form
        {...constants.defailtFormLoayout.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item label="Tag">
          <Input
            id="tag"
            name="tag"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...constants.defailtFormLoayout.button}>
          <Button
            icon={globalState.loading ? "loading" : "plus"}
            type="primary"
            onClick={() => {
              add();
            }}
          >
            Add New Tag
          </Button>
        </Form.Item>
      </Form>
    </Base>
  );
};
