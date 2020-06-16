import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

export default () => {
    
    const globalState = {
        user : useSelector(state => state.loginuser.user)
    }

    const toggleSidemenu = () => {

        if (document.body.classList.contains('sidebar-show')) {
            document.body.classList.remove('sidebar-show');
        }else{
            document.body.classList.add('sidebar-show');
        }

    }

    return <header className="app-header navbar">
        <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show" onClick={e => toggleSidemenu()}>
            <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="javascript:void(0)">
            The admin console
        </a>
        <span className="navbar-user">Logined as <strong>{globalState.user.username}</strong></span>
    </header>

}
