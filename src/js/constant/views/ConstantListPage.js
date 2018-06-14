import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import autobind from 'autobind-decorator';
import {loadConstants, loadTags} from '../redux';
import styles from './ConstantListPage.css';
import ConstantCard from "../comps/ConstantCard";

class ConstantListPage extends PureComponent {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.loadTags();
    this.props.loadConstants();
  }
  
  @autobind
  addNewConstant() {
    this.props.history.push('/constants/new');
  }
  
  @autobind
  handleRemove(id) {
    return () => {
      console.log('remove id');
    };
  }
  
  render() {
    const {constants, tags} = this.props;
    return (
      <div className={styles.root}>
        {constants.map((item) => {
          return (
            <ConstantCard
              data={item}
              tags={tags}
              key={item.id}
              onRemove={this.handleRemove(item.id)}
            />
          );
        })}
        <ConstantCard
          onClick={this.addNewConstant}
        />
      </div>
    );
  }
}

ConstantListPage.propTypes = {
  loadTags: PropTypes.func.isRequired,
  loadConstants: PropTypes.func.isRequired,
  tags: PropTypes.array,
  constants: PropTypes.array,
};

ConstantListPage.defaultProps = {
  tags: [],
  constants: [],
};


export default connect((state, props) => {
  const {tags, constants} = state.constant;
  return {
    tags,
    constants
  };
}, {
  loadTags,
  loadConstants,
})(ConstantListPage);

