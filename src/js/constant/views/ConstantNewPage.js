import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import autobind from 'autobind-decorator';
import {Button, Input, message} from 'antd';

import styles from './ConstantNewPage.css';
import {loadTags, saveConstant} from "../redux";
import ConstantCard from "../comps/ConstantCard";

const {TextArea} = Input;


class ConstantNewPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      source: '',
      data: {
        title: '',
        data: []
      },
      selectTags: [],
    };
  }
  
  componentDidMount() {
    const {tags} = this.props;
    if (tags.length <= 0) {
      this.props.loadTags();
    }
  }
  
  @autobind
  save() {
    const data = this.state.data;
    this.props.saveConstant({...data, tags: this.state.selectTags}, (success) => {
      if (success) {
        message.info('保存成功');
        this.props.history.push('/constants');
      } else {
        message.error('保存失败, 请联系管理员');
      }
    })
  }
  
  @autobind
  convert() {
    const {source} = this.state;
    const _str = source;
    
    try {
      const fieldAndValues = _str.match(/([\S]+)[\s]+=[\s]+([^\s;]+)/g);
      
      const values = {};
      fieldAndValues.forEach((str) => {
        const fieldAndValue = str.split('=');
        const value = fieldAndValue[1].trim();
        if (!Number.isNaN(parseFloat(value))) {
          values[fieldAndValue[0].trim()] = value;
        }
      });
      
      const names = {};
      const nameAndFields = _str.match(/([^\(\s]+),[\s]*"([\S]+)"/g);
      nameAndFields.forEach((str) => {
        const match = str.match(/([\S]+),[\s]+"([\S]+)"/);
        names[match[1].trim()] = match[2].trim();
      });
      
      const data = [];
      
      Object.keys(values).map((field) => {
        data.push({
          name: names[field],
          field: field.toLowerCase(),
          value: values[field]
        });
      });
      
      console.log(data);
      this.setState({
        data: {
          ...this.state.data,
          data
        }
      });
    } catch (e) {
      message.error('输入格式有问题');
    }
  }
  
  @autobind
  selectTag(tagId) {
    return () => {
      const [...selected] = this.state.selectTags;
      const index = selected.indexOf(tagId);
      if (index === -1) {
        this.setState({
          selectTags: selected.concat([tagId])
        });
      } else {
        selected.splice(index, 1);
        this.setState({
          selectTags: selected
        });
      }
    }
  }
  
  render() {
    const {tags} = this.props;
    const {selectTags} = this.state;
    
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Input
            size={'large'}
            value={this.state.data.title}
            onChange={(e) => {
              this.setState({
                data: {
                  ...this.state.data,
                  title: e.target.value,
                }
              });
            }}
          />
          <Button
            onClick={this.save}
            type={'primary'}
            size={'large'}
          >
            保存
          </Button>
        </div>
        <div className={styles.buttons}>
          <span style={{fontSize: '20px'}}>选择适用项目:  </span>
          {tags.map((tag) => {
            const selected = selectTags.indexOf(tag.id) !== -1;
            return (
              <Button
                key={tag.id}
                type={selected ? 'primary' : ''}
                onClick={this.selectTag(tag.id)}
                size={'large'}
                style={{marginRight: '4px'}}
              >
                {tag.name}
              </Button>
            );
          })}
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
          <TextArea
            autosize={{minRows: 30, maxRows: 40}}
            value={this.state.source}
            onChange={(e) => {
              this.setState({source: e.target.value});
            }}
          />
          </div>
          <div className={styles.changeContainer}>
            <Button
              onClick={this.convert}
              type={'primary'}
            >
              转换
            </Button>
          </div>
          <div className={styles.right}>
            <ConstantCard
              data={this.state.data}
              style={{width: '100%', height: '500px'}}
              preview={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

ConstantNewPage.propTypes = {
  saveConstant: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  tags: PropTypes.array,
};

ConstantNewPage.defaultProps = {
  tags: []
};

export default connect((state) => {
  const {tags} = state.constant;
  return {
    tags
  };
}, {
  saveConstant,
  loadTags
})(ConstantNewPage);


