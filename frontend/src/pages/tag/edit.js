import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Creatable from "react-select/lib/Creatable";
import DateTime from "react-datetime";
import moment from "moment";
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
  Row,
  Col,
  Alert,
  Tooltip,
} from "antd";
const { Title, Text } = Typography;

import Truncate from "../../components/truncate";
import Base from "../../components/base";
import history from "../../lib/history";
import * as constants from "../../lib/constants";
import * as actions from "../../actions";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import * as validate from "../../lib/validate";

export default (props) => {
  const [id, setId] = useState(props.match.params.id);

  const [tag, setTag] = useState("");

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    tag: useSelector((state) => state.tag.detail),
  };

  const localActions = {
    loadOne: (id) => dispatch(actions.tag.loadOne(id)),
    unLoad: () => dispatch(actions.tag.unLoad()),
    checkToken: () => dispatch(actions.login.checkToken()),
    update: (params) => dispatch(actions.tag.update(params)),
    showModal: (params) => dispatch(actions.ui.showModal(params)),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();

    return () => {
      localActions.unLoad();
    };
  }, []);

  useEffect(() => {
    if (!globalState.tag) return;

    if (globalState.tag.tag) {
      setTag(globalState.tag.tag);
    }
  }, [globalState.tag]);

  const update = async () => {
    if (globalState.loading) return;

    // validation

    if (!tag || tag == "")
      return localActions.showModal({
        modalType: constants.ModalTypeError,
        message: "Tag cannot be empty",
        title: "Validation Error",
      });

    let options = {};

    await localActions.update({
      id: id,

      tag: tag,
    });

    setTag("");
  };

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
          <Breadcrumb.Item>Edit ({id})</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Edit Tag</Title>
      <Text> Please modify fields to be changed.</Text>
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
            defaultValue=""
            value={tag ? tag : ""}
            onChange={(e) => setTag(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...constants.defailtFormLoayout.button}>
          <Button
            icon={globalState.loading ? "loading" : "check"}
            type="primary"
            onClick={() => {
              update();
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Base>
  );
};
