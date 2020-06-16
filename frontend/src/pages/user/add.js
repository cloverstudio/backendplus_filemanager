import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import Select from 'react-select'
import Creatable from 'react-select/lib/Creatable';
import Base from "../../components/base";
import { Breadcrumb, Icon, Typography, Divider,Form, Input, Button } from 'antd';
const { Title,Text } = Typography;

import * as constants from "../../lib/constants";

import Toast from "../../components/toast";
import Modal from "../../components/modal";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";

import * as actions from "../../actions";

export default () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const globalState = {
    loading : useSelector(state => state.ui.loading),
  }

  const localActions = {
    add: (params) => dispatch(actions.user.add(params)),
    checkToken: () => dispatch(actions.login.checkToken()),
    showModal: (params) => dispatch(actions.ui.showModal(params)),
  };
  

  const addUser = async () => {
    
    if(globalState.loading) return;

    // validation
    if(name.length < 6){
      return localActions.showModal({
        modalType:constants.ModalTypeError,
        message:"Name must container more than 5 characters.",
        title:"Validation Error"
      });
    }

    // validation
    if(password.length < 6){
      return localActions.showModal({
        modalType:constants.ModalTypeError,
        message:"Password must container more than 5 characters",
        title:"Validation Error"
      });
    }


    await localActions.add({
      username : name,
      password : password
    });

    setName("");
    setPassword("");

  } 

  return <Base breadcrumb={
    <Breadcrumb>
      <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/user">User</Link></Breadcrumb.Item>
      <Breadcrumb.Item>Add New</Breadcrumb.Item>
    </Breadcrumb>
  }>
            <Title level={2}>Add New User</Title>
            <Text> Please input following fields</Text>
            <Divider />

            <Form {...constants.defailtFormLoayout.form} onSubmit={(e)=>{e.preventDefault()}}>

              <Form.Item label="Username">

                <Input  placeholder="Username" 
                        value={name} 
                        onChange={ e => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Password">
                <Input.Password  
                        placeholder="Username" 
                        value={password} 
                        onChange={ e => setPassword(e.target.value)}
                />
              </Form.Item>
              
              <Form.Item {...constants.defailtFormLoayout.button}>
                <Button 
                  icon={globalState.loading? "loading":"plus"}
                  type="primary" 
                  onClick={ () => {addUser()}}>
                  Add new user
                </Button>
              </Form.Item>

            </Form>

        </Base>
}

