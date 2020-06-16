import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames';

import * as constants from "../lib/constants";

const Toast = (props) => {

    const [show, setShow] = useState("");

    useEffect(() => {

        setTimeout( () => {
            setShow(true);
        },50);

        setTimeout( () => {
            setShow(false);
        },constants.ToastShowInterval * 1000 - 500);

    });

    return <div className={classNames(
                    "toast",
                    "fade",
                    show ? "show" : null,
                    props.type == constants.ToastTypeInfo ? "info" : null,
                    props.type == constants.ToastTypeError ? "error" : null
            )}>


            {props.type == constants.ToastTypeInfo ? 
                <div  className="toast-header">
                    <FontAwesomeIcon icon="info-circle" />
                    <strong className="mr-auto"> Info</strong>
                </div> : null
            }

            {props.type == constants.ToastTypeError ? 
                <div  className="toast-header">
                    <FontAwesomeIcon icon="exclamation-circle" />
                    <strong className="mr-auto"> Error</strong>
                </div> : null
            }

            <div className="toast-body">
                {props.message}
            </div>
        </div>

}

export default () => {

    const alerts = useSelector(state => state.ui.alerts)

    return <div className="toast-container">

    {alerts.map( (alert) => {
        return <Toast type={alert.type} message={alert.message} identifier={alert.identifier}/>
    })}

    </div>

}
