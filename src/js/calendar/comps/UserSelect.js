import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import {connect} from "react-redux";
const CheckboxGroup = Checkbox.Group;


const UserSelect = (props) => {
  const {dataSet, ...others} = props;
  
  return (
    <div style={{
      backgroundColor: '#f7f7f7',
      padding: 6,
      margin: '12px 0'
    }}>
      <CheckboxGroup
        options={Object.values(dataSet).map((data) => {
          return {label: data.name, value: data.uid};
        })}
        {...others}
      />
    </div>
  );
};

UserSelect.propTypes = {
  dataSet: PropTypes.shape({}),
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default connect((state) => {
  return {
    dataSet: state.user.userList
  };
}, {})(UserSelect);
