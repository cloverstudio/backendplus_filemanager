import React, { Component } from "react";
import {
  Tooltip
} from "antd";

import * as utils from "../lib/utils";

export default (props) => {

  return <React.Fragment>
    {props.text && props.text.length > 20 ?  
      <React.Fragment>
        <Tooltip placement="topLeft" title={props.text} arrowPointAtCenter>
          {utils.truncate(props.text,20)} 
        </Tooltip>
      </React.Fragment> :
      <React.Fragment> {props.text} </React.Fragment>}
  </React.Fragment>

}

