import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './TagSelect.css';
import {Button} from "antd";


class TagSelect extends PureComponent {
  constructor(props) {
    super(props);
    
    this.change = this.change.bind(this);
  }
  
  change(tagKey) {
    return () => {
      const set = new Set(this.props.value);
      set.has(tagKey) ? set.delete(tagKey) : set.add(tagKey);
      const [...newValue] = set;
      this.props.onChange(newValue);
    };
  }
  
  render() {
    const {value, dataSet} = this.props;
    return (
      <div className={styles.root}>
        {dataSet.map((tag) => {
          return (
            <Button
              key={tag.key}
              className={styles.tag}
              onClick={this.change(tag.key)}
              type={value.indexOf(tag.key) >= 0 ? 'primary' : 'default'}
              style={{borderLeft: `5px solid ${tag.color}`}}
            >
              {tag.name}
            </Button>
          );
        })}
      </div>
    );
  }
}

TagSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  dataSet: PropTypes.array
};

TagSelect.defaultProps = {
  value: [],
  onChange: () => {
  
  },
  dataSet: []
};

export default TagSelect;
