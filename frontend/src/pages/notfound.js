import React, { Component, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";

import * as actions from "../actions";

export default () => {
  return (
    <div className="app flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You're lost.</h4>
              <p className="text-muted">The page you are looking for was not found.</p>
              <Link to="/">
                Back to top
              </Link>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}
