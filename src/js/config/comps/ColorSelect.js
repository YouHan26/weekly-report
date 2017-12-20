import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Radio} from 'antd';
import {colors} from '../../helpers/varibles';

const RadioGroup = Radio.Group;

const ColorSelect = (props) => {
  return (
    <RadioGroup {...props}>
      {colors.map((color) => {
        return <Radio value={color} key={color}>
          <Icon type="meh-o" style={{color, fontSize: 20}} />
        </Radio>
      })}
    </RadioGroup>
  );
};

ColorSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default ColorSelect;
