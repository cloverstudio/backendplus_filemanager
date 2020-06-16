import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Button } from 'antd';


import * as actions from "../actions";

export default () => {

  const dispatch = useDispatch();

  const globalState = {
    modal : useSelector(state => state.ui.modal),
  }

  const localActions = {
    hide: () =>  dispatch(actions.ui.hideModal()),
  };

  const close = () => {
    localActions.hide();
  }


  return <Modal
    title={globalState.modal.title}
    visible={globalState.modal.show}
    onOk={close}
    onCancel={close}
  >
    <p>{globalState.modal.message}</p>
  </Modal>

}

/*
import classNames from 'classnames';

import * as constants from "../lib/constants";
import * as actions from "../actions";
import * as utils from "../lib/utils";

class Modal extends Component {

  constructor(props) {
      super(props);
      this.state = {
          show:false
      }
  }

  componentDidUpdate(prevProp,prevState){

    if(prevProp.modal.show !== this.props.modal.show){
      
      (async()=>{

        await utils.wait(0.1);

        this.setState({
          show:this.props.modal.show
        });

      })();

    }

  }

  close(){

    (async()=>{

      this.setState({
        show:false
      });

      await utils.wait(0.5);

      this.props.hide();

    })();

  }

  componentDidMount(){

  }

  render() {
      return <div>
        {this.props.modal.show? <div className={classNames(
            "modal",
            "fade",
            this.state.show ? "show" : null,
            this.props.modal.type == constants.ModalTypeError ? "error" : "info")} >

          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">

                <h5 className="modal-title" id="exampleModalLiveLabel">
                  {this.props.modal.type == constants.ModalTypeInfo ? 
                    <FontAwesomeIcon icon="info-circle" /> : null
                  }

                  {this.props.modal.type == constants.ModalTypeError ? 
                    <FontAwesomeIcon icon="exclamation-circle" /> : null
                  }
                  &nbsp;{this.props.modal.title}

                </h5>

                <button type="button" className="close" onClick={() => this.close()}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{this.props.modal.message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => this.close()}>Close</button>
              </div>
            </div>
          </div>
        </div> : null }
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hide:() => dispatch(actions.ui.hideModal()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
*/