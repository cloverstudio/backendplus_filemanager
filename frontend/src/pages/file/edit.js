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

  const [file, setFile] = useState([]);
  const [fileAdd, setFileAdd] = useState([]);
  const [fileDelete, setFileDelete] = useState([]);

  const [description, setDescription] = useState("");

  const [tag, setTag] = useState([]);
  const [tagDefaultValue, setTagDefaultValue] = useState([]);

  const dispatch = useDispatch();

  const globalState = {
    loading: useSelector((state) => state.ui.loading),
    file: useSelector((state) => state.file.detail),

    tagList: useSelector((state) => state.file.tagList),
  };

  const localActions = {
    loadOne: (id) => dispatch(actions.file.loadOne(id)),
    unLoad: () => dispatch(actions.file.unLoad()),
    checkToken: () => dispatch(actions.login.checkToken()),
    update: (params) => dispatch(actions.file.update(params)),
    showModal: (params) => dispatch(actions.ui.showModal(params)),

    loadTag: () => dispatch(actions.file.loadTag()),
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
    if (!globalState.file) return;

    if (globalState.file.file) {
      setFile(globalState.file.file);
    }

    if (globalState.file.description) {
      setDescription(globalState.file.description);
    }

    if (globalState.file.tag) {
    }
  }, [globalState.file]);

  useEffect(() => {
    if (!globalState.file.tag) return;

    if (globalState.tagList) {
      setTag(
        globalState.file.tag.map((val) => {
          const obj = globalState.tagList.find((row) => row.id == val);
          if (obj) return obj.tag;
        })
      );
    }
  }, [globalState.tagList]);

  const update = async () => {
    if (globalState.loading) return;

    // validation

    let options = {};

    // convert label to value for multiple selection types
    // it is work around for wired behavior multiple select box for ant design

    let tagFiltered = [];

    tagFiltered = tag.map((valOrLabel) => {
      const intVal = parseInt(valOrLabel);

      globalState.tagList.map((row) => {
        options[row.id] = row.tag;
      });

      // it is val
      if (options[intVal]) return valOrLabel;
      // it is label
      else {
        return Object.keys(options).find((key) => {
          return options[key] == valOrLabel;
        });
      }
    });

    // make everything int
    tagFiltered = tagFiltered.map((val) => parseInt(val));

    // make unique
    tagFiltered = tagFiltered.reduce((res, val) => {
      if (res.indexOf(val) == -1) res.push(val);
      return res;
    }, []);

    await localActions.update({
      id: id,

      fileAdd: fileAdd,
      fileDelete: fileDelete,

      description: description,

      tag: tagFiltered,
    });

    setFile([]);
    setFileAdd([]);
    setFileDelete([]);

    setDescription("");

    setTag("");
  };

  const tagOptions = constants.fileTagOptions;

  const handleMultipleSelectboxChange = (setFunction, e) => {
    const options = e.target.options;
    const values = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) values.push(options[i].value);
    }

    setFunction(values);
  };

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
          <Breadcrumb.Item>Edit ({id})</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Title level={2}>Edit File</Title>
      <Text> Please modify fields to be changed.</Text>
      <Divider />

      <Form
        {...constants.defailtFormLoayout.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item label="File">
          <Row>
            <Col span={12}>
              <Tooltip title="Check files to delete" className="fileedit-col">
                {file ? (
                  <ul className="normal-list">
                    {file.map((file) => {
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
                                fileDelete.find(
                                  (fileId) => fileId === fileIdChecked
                                )
                              )
                                setFileDelete(
                                  fileDelete.filter(
                                    (fileId) => fileId !== fileIdChecked
                                  )
                                );
                              else {
                                fileDelete.push(fileIdChecked);
                                setFileDelete([...fileDelete]);
                              }
                            }}
                          />

                          {fileDelete.find(
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
                {file && fileDelete ? (
                  <input
                    class="form-control"
                    id="file-input"
                    type="file"
                    name="file"
                    disabled={
                      file.length == 0 || file.length - fileDelete.length == 0
                        ? ""
                        : "disabled"
                    }
                    onChange={(e) => setFileAdd(e.target.files)}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            id="description"
            name="description"
            placeholder="Description"
            defaultValue=""
            value={description ? description : ""}
            onChange={(e) => setDescription(e.target.value)}
            rows="9"
          />
        </Form.Item>

        <Form.Item label="Tag">
          <Select
            mode="multiple"
            id="tag"
            name="tag"
            value={tag}
            onChange={(value) => setTag(value)}
          >
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
