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

  const [photo, setPhoto] = useState([]);
  const [photoAdd, setPhotoAdd] = useState([]);
  const [photoDelete, setPhotoDelete] = useState([]);

  const [tag, setTag] = useState("");

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    photo: useSelector((state) => state.photo.detail),

    tagList: useSelector((state) => state.photo.tagList),
  };

  const localActions = {
    loadOne: (id) => dispatch(actions.photo.loadOne(id)),
    unLoad: () => dispatch(actions.photo.unLoad()),
    checkToken: () => dispatch(actions.login.checkToken()),
    update: (params) => dispatch(actions.photo.update(params)),
    showModal: (params) => dispatch(actions.ui.showModal(params)),

    loadTag: () => dispatch(actions.photo.loadTag()),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
      await localActions.loadOne(id);

      await localActions.loadTag();
    })();

    return () => {
      localActions.unLoad();
    };
  }, []);

  useEffect(() => {
    if (!globalState.photo) return;

    if (globalState.photo.photo) {
      setPhoto(globalState.photo.photo);
    }

    if (globalState.photo.tag) {
      if (globalState.photo.tag === null) setTag("");
      else setTag(globalState.photo.tag);
    }
  }, [globalState.photo]);

  const update = async () => {
    if (globalState.loading) return;

    // validation

    let options = {};

    await localActions.update({
      id: id,

      photoAdd: photoAdd,
      photoDelete: photoDelete,

      tag: tag,
    });

    setPhoto([]);
    setPhotoAdd([]);
    setPhotoDelete([]);

    setTag("");
  };

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
          <Breadcrumb.Item>Edit ({id})</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Edit Photo</Title>
      <Text> Please modify fields to be changed.</Text>
      <Divider />

      <Form
        {...constants.defailtFormLoayout.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item label="Photo">
          <Row>
            <Col span={12}>
              <Tooltip title="Check files to delete" className="fileedit-col">
                {photo ? (
                  <ul className="normal-list">
                    {photo.map((file) => {
                      return (
                        <div class="fileedit-checkbox">
                          <input
                            class="form-check-input"
                            id={file.localFilename}
                            type="checkbox"
                            value={file.localFilename}
                            onChange={(e) => {
                              const fileIdChecked = e.target.value;
                              if (
                                photoDelete.find(
                                  (fileId) => fileId === fileIdChecked
                                )
                              )
                                setPhotoDelete(
                                  photoDelete.filter(
                                    (fileId) => fileId !== fileIdChecked
                                  )
                                );
                              else {
                                photoDelete.push(fileIdChecked);
                                setPhotoDelete([...photoDelete]);
                              }
                            }}
                          />

                          {photoDelete.find(
                            (fileId) => fileId === file.localFilename
                          ) ? (
                            <label
                              class="form-check-label"
                              for={file.localFilename}
                            >
                              <del>
                                <Truncate text={file.name} />
                              </del>
                            </label>
                          ) : (
                            <label
                              class="form-check-label"
                              for={file.localFilename}
                            >
                              <Truncate text={file.name} />
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </ul>
                ) : null}
              </Tooltip>
            </Col>

            <Col span={12}>
              <div className="fileedit-col">
                {photo && photoDelete ? (
                  <input
                    class="form-control"
                    id="file-input"
                    type="file"
                    name="file"
                    accept="image/*"
                    disabled={
                      photo.length == 0 ||
                      photo.length - photoDelete.length == 0
                        ? ""
                        : "disabled"
                    }
                    onChange={(e) => setPhotoAdd(e.target.files)}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Tag">
          <Select
            id="tag"
            name="tag"
            value={tag}
            onChange={(value) => setTag(value)}
          >
            <Option value=""></Option>

            {globalState.tagList.map((obj) => {
              return <Option value={obj.id}>{obj.tag}</Option>;
            })}
          </Select>
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
