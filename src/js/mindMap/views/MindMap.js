import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styles from './MindMap.css';
import {connect} from "react-redux";
import {load, update} from "../action";
import Mind from "../comps/Mind";
import {Button, message} from "antd";

class MindMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mindMap: this.props.data? this.props.data.mindMap : null,
      fromNew: !this.props.id
    };
  }

  componentDidMount() {
    const {id, data} = this.props;
    if (!id) {
      return;
    }
    if (!data) {
      this.props.load();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.setState({
        mindMap: nextProps.data.mindMap
      });
    }
  }

  @autobind
  treeChange(data) {
    this.setState({
      mindMap: data
    });
  }

  @autobind
  save() {
    this.props.update({
      ...this.props.data,
      mindMap: this.state.mindMap
    }, (key) => {
      message.info('保存成功');
      if (this.state.fromNew) {
        this.props.history.push(`./${key}`);
      }
    });
  }

  render() {
    const {mindMap, fromNew} = this.state;

    return (
      <div className={styles.root}>
        <Mind
          data={this.props.data ? this.props.data.mindMap : null}
          isNew={fromNew}
          style={{flex: 1, overflow: 'auto'}}
          onChange={this.treeChange}
        />
        <div className={styles.actionArea}>
          <div>
            <b><code>Tab</code></b> : Add Sub Item
          </div>
          <div>
            <b><code>Click</code></b> : Select Item
          </div>
          <div>
            <b><code>DbClick</code></b>  : Edit Select Item
          </div>
          <div>
            <b><code>Delete</code></b>  : Remove Select Item
          </div>
          <Button onClick={this.save} size={'large'} type={'primary'}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}


MindMap.propTypes = {
  id: PropTypes.string,
  data: PropTypes.shape({}),
  load: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

MindMap.defaultProps = {
  id: null,
  data: null
};

export default connect((state, props) => {
  const {id} = props.match.params;

  return {
    id,
    data: id ? state.mindMap[id] : null
  };
}, {
  load,
  update
})(MindMap);