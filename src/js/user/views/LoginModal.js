/**
 * Created by YouHan on 2017/11/20.
 */
import React, {PureComponent} from "react";
import {Input, Modal} from 'antd';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import types from "../../helpers/types";
import {hideModal, login} from "../action";

class LoginModal extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {};
    
    this.change = this.change.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleOk(){
    this.props.login(this.state.email, this.state.password);
  }
  
  render() {
    const {user} = this.props;
    const {showModal} = user;
    
    return (
      <Modal
        title="Basic Modal"
        visible={showModal}
        onOk={this.handleOk}
        onCancel={this.props.hideModal}
      >
        <Input
          placeholder="Email"
          name={'email'}
          value={this.state.email}
          onChange={this.change}
        />
        <Input
          placeholder="Password"
          name={'password'}
          type={'password'}
          value={this.state.password}
          onChange={this.change}
        />
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  user: types.user,
  login: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};


export default connect((state) => {
  return {
    user: state.user
  };
}, {
  login,
  hideModal
})(LoginModal);