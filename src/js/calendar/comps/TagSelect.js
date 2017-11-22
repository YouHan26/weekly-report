import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {tags} from '../../helpers/varibles';
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
    const {value} = this.props;
    return (
      <div className={styles.root}>
        {tags.map((tag) => {
          return (
            <Button
              key={tag.key}
              className={styles.tag}
              onClick={this.change(tag.key)}
              type={value.indexOf(tag.key) >= 0 ? 'primary' : 'default'}
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
  onChange: PropTypes.func
};

TagSelect.defaultProps = {
  value: [],
  onChange: () => {
  
  }
};

export default TagSelect;
