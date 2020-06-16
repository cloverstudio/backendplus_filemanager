import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import Creatable from 'react-select/lib/Creatable';
import { Breadcrumb, Icon, Typography, Divider,Form, Input, Button } from 'antd';
const { Title,Text } = Typography;

import Base from "../../components/base";

import * as constants from "../../lib/constants";
import * as actions from "../../actions";

export default (props) => {

  const [id, setId] = useState(props.match.params.id);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const globalState = {
    loading : useSelector(state => state.ui.loading),
    user : useSelector(state => state.user.detail),
  }

  const localActions = {
    loadOne: (id) => dispatch(actions.user.loadOne(id)),
    checkToken: () => dispatch(actions.login.checkToken()),
    update: (params) => dispatch(actions.user.update(params)),
    showModal:(params) => dispatch(actions.ui.showModal(params)),
  };

  useEffect(() => {

    (async() => {
      await localActions.checkToken();
      await localActions.loadOne(id);
    })();

  },[]);
  

  useEffect(() => {

    setName(globalState.user.username);
    setPassword("");

  },[globalState.user]);

  const updateUser = async () => {
    
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
    if(password.length != 0 && password.length < 6){
      return localActions.showModal({
        modalType:constants.ModalTypeError,
        message:"Password must container more than 5 characters.",
        title:"Validation Error"
      });
    }

    await localActions.update({
      id: id,
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
      <Breadcrumb.Item>Edit ({id})</Breadcrumb.Item>
    </Breadcrumb>
  }>

            <Title level={2}>Edit User</Title>
            <Text> Please modify fields to be changed</Text>
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
                  icon={globalState.loading? "loading":"check"}
                  type="primary" 
                  onClick={ () => {updateUser()}}>
                  Update
                </Button>
              </Form.Item>
            </Form>
            
  </Base>

}
