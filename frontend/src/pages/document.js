import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Layout,
  Menu,
  Icon,
  Row,
  Breadcrumb,
  Col,
  Alert,
  Typography,
  Card,
  Descriptions,
} from "antd";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Base from "../components/base";
import * as utils from "../lib/utils";
import * as actions from "../actions";
import * as constants from "../lib/constants";

export default (props) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const localActions = {
    checkToken: () => dispatch(actions.login.checkToken()),
  };

  useEffect(() => {
    (async () => {
      await localActions.checkToken();
    })();
  }, []);

  const handleClick = ({ item, key }) => {
    window.location.hash = "key" + key;
  };

  return (
    <Base
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Documents</Breadcrumb.Item>
        </Breadcrumb>
      }
      style={{ overflow: "hidden" }}
    >
      <Row>
        <Col span={6} className="document-menu">
          <Menu
            style={{ borderRight: "none" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            onClick={handleClick}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="info-circle" />
                  <span>Basics</span>
                </span>
              }
            >
              <Menu.ItemGroup key="g1" title="Setup">
                <Menu.Item key="1">Deployment</Menu.Item>
                <Menu.Item key="2">Setup Database</Menu.Item>
                <Menu.Item key="3">Setup Backend</Menu.Item>
                <Menu.Item key="4">Build Frontend</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Introduction">
                <Menu.Item key="5">API Basics</Menu.Item>
                <Menu.Item key="6">Authentication</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="user" />
                  <span>Users</span>
                </span>
              }
            >
              <Menu.Item key="7">List</Menu.Item>
              <Menu.Item key="8">Add</Menu.Item>
              <Menu.Item key="9">Update</Menu.Item>
              <Menu.Item key="10">Delete</Menu.Item>
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span>
                  <Icon type="block" />
                  <span>Tag</span>
                </span>
              }
            >
              <Menu.Item key="15">List</Menu.Item>
              <Menu.Item key="16">Add</Menu.Item>
              <Menu.Item key="17">Update</Menu.Item>
              <Menu.Item key="18">Delete</Menu.Item>
            </SubMenu>

            <SubMenu
              key="4"
              title={
                <span>
                  <Icon type="block" />
                  <span>File</span>
                </span>
              }
            >
              <Menu.Item key="19">List</Menu.Item>
              <Menu.Item key="20">Add</Menu.Item>
              <Menu.Item key="21">Update</Menu.Item>
              <Menu.Item key="22">Delete</Menu.Item>
            </SubMenu>

            <SubMenu
              key="5"
              title={
                <span>
                  <Icon type="block" />
                  <span>Photo</span>
                </span>
              }
            >
              <Menu.Item key="23">List</Menu.Item>
              <Menu.Item key="24">Add</Menu.Item>
              <Menu.Item key="25">Update</Menu.Item>
              <Menu.Item key="26">Delete</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col className="document-content">
          <div className="document-container">
            <div id="key1"></div>

            <div id="key2"></div>

            <div id="key3"></div>

            <div id="key4"></div>

            <div id="key5"></div>

            <div id="key6"></div>

            <div id="key7">
              <Title level={2}>Get User List</Title>
              <p>
                <Alert message="[GET] /api/user" type="info" />

                <Card
                  size="small"
                  title="Query Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="page" span={3}>
                      Page Number
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
  {
    "list": [{
      "id": 3,
      "username": "ken822",
      "modified_at": "2020-02-14T07:19:17.000Z",
      "created_at": "2020-01-13T18:02:23.000Z"
    }, {
      "id": 6,
      "username": "ken833",
      "modified_at": "2020-01-14T07:16:49.000Z",
      "created_at": "2020-01-14T07:16:49.000Z"
    }, {
      "id": 7,
      "username": "1111111",
      "modified_at": "2020-01-14T07:20:06.000Z",
      "created_at": "2020-01-14T07:20:06.000Z"
    }, {
      "id": 8,
      "username": "222222",
      "modified_at": "2020-01-14T07:56:51.000Z",
      "created_at": "2020-01-14T07:56:51.000Z"
    }, {
      "id": 9,
      "username": "3333333",
      "modified_at": "2020-01-14T07:56:56.000Z",
      "created_at": "2020-01-14T07:56:56.000Z"
    }, {
      "id": 10,
      "username": "44444444",
      "modified_at": "2020-01-14T07:57:01.000Z",
      "created_at": "2020-01-14T07:57:01.000Z"
    }, {
      "id": 11,
      "username": "5555555",
      "modified_at": "2020-01-14T07:57:07.000Z",
      "created_at": "2020-01-14T07:57:07.000Z"
    }, {
      "id": 12,
      "username": "6666666",
      "modified_at": "2020-01-14T07:57:12.000Z",
      "created_at": "2020-01-14T07:57:12.000Z"
    }, {
      "id": 13,
      "username": "777777777",
      "modified_at": "2020-01-14T07:57:20.000Z",
      "created_at": "2020-01-14T07:57:20.000Z"
    }, {
      "id": 14,
      "username": "88888888",
      "modified_at": "2020-01-14T07:57:31.000Z",
      "created_at": "2020-01-14T07:57:31.000Z"
    }],
    "count": 13,
    "pagingRowCount": 10
  }
`}
                  </pre>
                </Card>
              </p>

              <Title level={2}>Get User Detail</Title>
              <p>
                <Alert message="[GET] /api/user/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      User ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"user": {
		"id": 3,
		"username": "ken822",
		"token": "JIqRuAx7934XHmPMWPmC12XKYM6Om9ET",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key8">
              <Title level={2}>Create User</Title>
              <p>
                <Alert message="[POST] /api/user/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      application/json
                    </Descriptions.Item>
                    <Descriptions.Item label="username" span={3}>
                      Username
                    </Descriptions.Item>
                    <Descriptions.Item label="password" span={3}>
                      Password
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"user": {
		"id": 19,
		"username": "adminasdfasdf",
		"token": null,
		"modified_at": "2020-02-14T12:17:33.000Z",
		"created_at": "2020-02-14T12:17:33.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key9">
              <Title level={2}>Modify User</Title>
              <p>
                <Alert message="[PUT] /api/user/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      application/json
                    </Descriptions.Item>
                    <Descriptions.Item label="username" span={3}>
                      Username
                    </Descriptions.Item>
                    <Descriptions.Item label="password" span={3}>
                      Password
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"user": {
		"id": 3,
		"username": "ken822",
		"token": "JIqRuAx7934XHmPMWPmC12XKYM6Om9ET",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key10">
              <Title level={2}>Delete User</Title>
              <p>
                <Alert message="[DELETE] /api/user/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      User ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{"deleted":true}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key15">
              <Title level={2}>Get Tag List</Title>
              <p>
                <Alert message="[GET] /api/tag" type="info" />

                <Card
                  size="small"
                  title="Query Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="page" span={3}>
                      Page Number
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
 {
  "list": [
  {
   "id": 1,
   "tag":"aaaaa",
   "modified_at": "2020-01-14T07:16:49.000Z",
   "created_at": "2020-01-14T07:16:49.000Z"
  }, 
  {
   ...
  }
 ],
 "count": 13,
 "pagingRowCount": 10
  }
`}
                  </pre>
                </Card>
              </p>

              <Title level={2}>Get Tag Detail</Title>
              <p>
                <Alert message="[GET] /api/tag/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      Tag ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"tag": {
		"id": 3,
		"tag":"aaaaa",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key16">
              <Title level={2}>Create Tag </Title>
              <p>
                <Alert message="[POST] /api/tag/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      application/json
                    </Descriptions.Item>

                    <Descriptions.Item label="tag" span={3}>
                      string
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"tag": {
		"id": 19,
		"tag":"aaaaa",
		"modified_at": "2020-02-14T12:17:33.000Z",
		"created_at": "2020-02-14T12:17:33.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key17">
              <Title level={2}>Modify Tag </Title>
              <p>
                <Alert message="[PUT] /api/tag/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      application/json
                    </Descriptions.Item>

                    <Descriptions.Item label="tag" span={3}>
                      string
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"tag": {
		"id": 3,
		"tag":"aaaaa",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key18">
              <Title level={2}>Delete Tag </Title>
              <p>
                <Alert message="[DELETE] /api/tag/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      Tag ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{"deleted":true}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key19">
              <Title level={2}>Get File List</Title>
              <p>
                <Alert message="[GET] /api/file" type="info" />

                <Card
                  size="small"
                  title="Query Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="page" span={3}>
                      Page Number
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
 {
  "list": [
  {
   "id": 1,
   "file":"aaaaa",
   "description":"aaaa",
   "tag":"123",
   "modified_at": "2020-01-14T07:16:49.000Z",
   "created_at": "2020-01-14T07:16:49.000Z"
  }, 
  {
   ...
  }
 ],
 "count": 13,
 "pagingRowCount": 10
  }
`}
                  </pre>
                </Card>
              </p>

              <Title level={2}>Get File Detail</Title>
              <p>
                <Alert message="[GET] /api/file/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      File ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"file": {
		"id": 3,
		"file":"aaaaa",
		"description":"aaaa",
		"tag":"123",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key20">
              <Title level={2}>Create File </Title>
              <p>
                <Alert message="[POST] /api/file/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      multipart/form-data
                    </Descriptions.Item>

                    <Descriptions.Item label="file" span={3}>
                      multipart
                    </Descriptions.Item>

                    <Descriptions.Item label="description" span={3}>
                      string
                    </Descriptions.Item>

                    <Descriptions.Item label="tag" span={3}>
                      array
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"file": {
		"id": 19,
		"file":"aaaaa",
		"description":"aaaa",
		"tag":"123",
		"modified_at": "2020-02-14T12:17:33.000Z",
		"created_at": "2020-02-14T12:17:33.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key21">
              <Title level={2}>Modify File </Title>
              <p>
                <Alert message="[PUT] /api/file/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      multipart/form-data
                    </Descriptions.Item>

                    <Descriptions.Item label="file" span={3}>
                      multipart
                    </Descriptions.Item>

                    <Descriptions.Item label="description" span={3}>
                      string
                    </Descriptions.Item>

                    <Descriptions.Item label="tag" span={3}>
                      array
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"file": {
		"id": 3,
		"file":"aaaaa",
		"description":"aaaa",
		"tag":"123",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key22">
              <Title level={2}>Delete File </Title>
              <p>
                <Alert message="[DELETE] /api/file/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      File ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{"deleted":true}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key23">
              <Title level={2}>Get Photo List</Title>
              <p>
                <Alert message="[GET] /api/photo" type="info" />

                <Card
                  size="small"
                  title="Query Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="page" span={3}>
                      Page Number
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
 {
  "list": [
  {
   "id": 1,
   "photo":"123",
   "tag":"1",
   "modified_at": "2020-01-14T07:16:49.000Z",
   "created_at": "2020-01-14T07:16:49.000Z"
  }, 
  {
   ...
  }
 ],
 "count": 13,
 "pagingRowCount": 10
  }
`}
                  </pre>
                </Card>
              </p>

              <Title level={2}>Get Photo Detail</Title>
              <p>
                <Alert message="[GET] /api/photo/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      Photo ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"photo": {
		"id": 3,
		"photo":"123",
		"tag":"1",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key24">
              <Title level={2}>Create Photo </Title>
              <p>
                <Alert message="[POST] /api/photo/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      multipart/form-data
                    </Descriptions.Item>

                    <Descriptions.Item label="photo" span={3}>
                      multipart
                    </Descriptions.Item>

                    <Descriptions.Item label="tag" span={3}>
                      integer
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"photo": {
		"id": 19,
		"photo":"123",
		"tag":"1",
		"modified_at": "2020-02-14T12:17:33.000Z",
		"created_at": "2020-02-14T12:17:33.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key25">
              <Title level={2}>Modify Photo </Title>
              <p>
                <Alert message="[PUT] /api/photo/" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="Content-Type" span={3}>
                      multipart/form-data
                    </Descriptions.Item>

                    <Descriptions.Item label="photo" span={3}>
                      multipart
                    </Descriptions.Item>

                    <Descriptions.Item label="tag" span={3}>
                      integer
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{
	"photo": {
		"id": 3,
		"photo":"123",
		"tag":"1",
		"modified_at": "2020-02-14T11:24:22.000Z",
		"created_at": "2020-01-13T18:02:23.000Z"
	}
}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key26">
              <Title level={2}>Delete Photo </Title>
              <p>
                <Alert message="[DELETE] /api/photo/:id" type="info" />

                <Card
                  size="small"
                  title="URL Params"
                  className="response-container"
                >
                  <Descriptions title="" bordered>
                    <Descriptions.Item label="id" span={3}>
                      Photo ID
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  size="small"
                  title="Sample Response"
                  className="response-container"
                >
                  <pre>
                    {`
{"deleted":true}
`}
                  </pre>
                </Card>
              </p>
            </div>

            <div id="key11"></div>
          </div>
        </Col>
      </Row>
    </Base>
  );
};
