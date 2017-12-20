import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, Input, Row} from "antd";
import autobind from 'autobind-decorator';
import styles from './ConfigPage.css';
import ColorSelect from "../comps/ColorSelect";
import {loadTag, updateTag} from "../action";

const initState = {
  currentTag: null,
  color: '#7ac9de',
  tagName: ''
};

class ConfigPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      ...initState
    };
  }
  
  componentDidMount() {
    this.props.loadTag();
  }
  
  @autobind
  fieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  @autobind
  updateTag() {
    this.props.updateTag({
      ...this.state.currentTag,
      color: this.state.color,
      name: this.state.tagName
    }, () => {
      this.setState({
        ...initState
      });
    });
  }
  
  @autobind
  selectTag(tag) {
    return () => {
      const {currentTag} = this.state;
      if (currentTag && currentTag.key === tag.key) {
        this.setState({
          ...initState
        });
      } else {
        this.setState({
          currentTag: tag,
          color: tag.color,
          tagName: tag.name
        });
      }
    };
  }
  
  render() {
    const {tags} = this.props;
    const {currentTag} = this.state;
    const currentTagKey = (currentTag || {}).key;
    return (
      <div className={styles.root}>
        <div className={styles.tagContainer}>
          <h3 style={{marginBottom: 12}}>Tag Config</h3>
          <Row>
            <Input
              style={{width: 300}}
              name={'tagName'}
              onChange={this.fieldChange}
              value={this.state.tagName}
            />
            <Button
              type={'primary'}
              onClick={this.updateTag}
            >
              {this.state.currentTag ? 'Update' : 'New'}
            </Button>
          </Row>
          <Row>
            <ColorSelect
              style={{marginTop: 12}}
              value={this.state.color}
              name={'color'}
              onChange={this.fieldChange}
            />
          </Row>
          <Row style={{marginTop: 12}}>
            {Object.values(tags).map((tag) => {
              return (
                <Button
                  key={tag.key}
                  onClick={this.selectTag(tag)}
                  type={tag.key === currentTagKey ? 'primary' : 'default'}
                  style={{borderLeft: `5px solid ${tag.color}`, marginRight: 12, marginBottom: 12}}
                >
                  {tag.name}
                </Button>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}


ConfigPage.propTypes = {
  loadTag: PropTypes.func.isRequired,
  updateTag: PropTypes.func.isRequired,
  tags: PropTypes.shape({}).isRequired,
};

export default connect((state, props) => {
  const {tags} = state.config;
  return {
    tags
  };
}, {
  loadTag,
  updateTag,
})(ConfigPage);
