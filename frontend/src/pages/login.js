import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row, Col, Form, Icon, Input, Button, Typography, Layout } from "antd";
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

import "antd/dist/antd.css";

import Toast from "../components/toast";

import * as actions from "../actions";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.ui.loading);
  const testReducer = useSelector((state) => state.testReducer);

  const dispatch = useDispatch();

  function detectEnter(e) {
    if (e.key == "Enter") {
      dispatch(
        actions.login.login({
          username: username,
          password: password,
        })
      );
    }
  }

  return (
    <div className="login">
      <Layout>
        <Content>
          <Row className="header">
            <Col span={24}></Col>
          </Row>
          <Row className="content">
            <Col
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 12, offset: 6 }}
              lg={{ span: 8, offset: 8 }}
            >
              <Title>File Manager</Title>

              <Form className="login-form">
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => detectEnter(e)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() =>
                      dispatch(
                        actions.login.login({
                          username: username,
                          password: password,
                        })
                      )
                    }
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                    disabled={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>

            <Col xs={{ span: 3 }} sm={{ span: 6 }} lg={{ span: 8 }}></Col>
          </Row>
        </Content>
        <Footer className="footer" style={{ textAlign: "right" }}>
          Clover Studio Ltd.
        </Footer>
      </Layout>
    </div>
  );
};
