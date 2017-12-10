import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './MindMap.css';
import {Spin} from "antd";
import {connect} from "react-redux";
import {init} from "../action";
import {Redirect} from "react-router-dom";

class MindMapInit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newId: null
    };
  }

  componentDidMount() {
    this.props.init((id) => {
      this.setState({newId: id});
    });
  }

  render() {
    if (this.state.newId) {
      return (
        <Redirect to={`/mindMap/${this.state.newId}`} />
      );
    }

    return (
      <div className={styles.root}>
        <Spin spinning={!this.state.newId}>
          <div style={{height: '100%'}}>
          </div>
        </Spin>
      </div>
    );
  }
}


MindMapInit.propTypes = {
  init: PropTypes.func.isRequired,
};

export default connect(() => {
  return {};
}, {
  init
})(MindMapInit);