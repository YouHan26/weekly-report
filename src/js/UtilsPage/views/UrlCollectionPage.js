import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './UrlCollectionPage.css';
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";
import {projectAction} from '../../project';
import authHelper from "../../helpers/authHelper";

const {updateProject, loadProject} = projectAction;

const blankData = {
  name: '',
  owner: '',
  qa: '',
  pp: '',
  prod: '',
  status: ''
};

class UrlCollectionPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      owner: '',
      qa: '',
      pp: '',
      prod: ''
    };
    
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
  }
  
  componentDidMount() {
    this.props.loadProject();
  }
  
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  save() {
    this.props.updateProject(this.state);
    this.setState({
      ...blankData
    });
  }
  
  render() {
    const {projects} = this.props;
    
    const columns = [{
      title: 'Project Name',
      dataIndex: 'name',
    }, {
      title: 'Project Owner',
      dataIndex: 'owner'
    }, {
      title: 'QA Location',
      dataIndex: 'qa',
      render: text => <a href={text} target="_blank">{text}</a>,
    }, {
      title: 'PP Location',
      dataIndex: 'pp',
      render: text => <a href={text} target="_blank">{text}</a>,
    }, {
      title: 'PROD Location',
      dataIndex: 'prod',
      render: text => <a href={text} target="_blank">{text}</a>,
    }, {
      title: 'STATUS',
      dataIndex: 'status'
    }];
    
    const user = authHelper.syncAuth();
    
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <Table
            bordered={true}
            className={styles.table}
            columns={columns}
            dataSource={projects}
            pagination={false}
          />
          {user && user.email === 'youhan26@gmail.com' ?
            <Row gutter={5}>
              <Col span={4}>
                <Input
                  value={this.state.name}
                  onChange={this.change}
                  name={'name'}
                  placeholder={'PROJECT NAME'}
                />
              </Col>
              <Col span={4}>
                <Input
                  value={this.state.owner}
                  onChange={this.change}
                  name={'owner'}
                  placeholder={'PROJECT OWNER'}
                />
              </Col>
              <Col span={4}>
                <Input
                  value={this.state.qa}
                  onChange={this.change}
                  name={'qa'}
                  placeholder={'PROJECT QA'}
                />
              </Col>
              <Col span={4}>
                <Input
                  value={this.state.pp}
                  onChange={this.change}
                  name={'pp'}
                  placeholder={'PROJECT PP'}
                />
              </Col>
              
              <Col span={4}>
                <Input
                  value={this.state.prod}
                  onChange={this.change}
                  name={'prod'}
                  placeholder={'PROJECT PROD'}
                />
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={this.save}
                >
                  ADD PROJECT
                </Button>
              </Col>
            </Row> : null
          }
        </div>
      </div>
    );
  }
}


UrlCollectionPage.propTypes = {
  projects: PropTypes.array.isRequired,
  updateProject: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
};


export default connect((state) => {
  return {
    projects: state.projects
  };
}, {
  updateProject,
  loadProject
})(UrlCollectionPage)