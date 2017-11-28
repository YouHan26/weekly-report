import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './TomatoPage.css';
import {Button, Card, Input} from "antd";
import docHelper from '../../helpers/docHelper';
import pushHelper from '../../helpers/pushHelper';

const MAX_TIME = 25 * 60;


class TomatoPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      tomato: false,
      count: MAX_TIME,
      todo: '',
      todoList: [],
      doneList: [],
    };
    
    this.interval = null;
    
    this.startTomato = this.startTomato.bind(this);
    this.complete = this.complete.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.change = this.change.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }
  
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
  
  startTomato() {
    this.setState({
      tomato: true,
    });
    
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    this.interval = setInterval(() => {
      if (this.state.count <= 0) {
        this.setState({
          tomato: false,
          count: MAX_TIME
        });
        pushHelper.notify({
          title: 'TOMATO TIME OUT',
          desc: 'Check your work!'
        });
        clearInterval(this.interval);
        return;
      }
  
      this.setState({
        count: this.state.count - 1
      }, () => {
        docHelper.setTitle(this.renderTitle());
      });
    }, 1000);
  }
  
  complete(todo) {
    return () => {
      const {todoList, doneList} = this.state;
      this.setState({
        doneList: doneList.concat([todo]),
        todoList: todoList.filter((item) => {
          return item.key !== todo.key;
        })
      });
    };
  }
  
  change(e) {
    this.setState({
      todo: e.target.value
    });
  }
  
  addTodo(e) {
    if (!e || e.keyCode !== 13) {
      return;
    }
    this.setState({
      todoList: this.state.todoList.concat([{
        key: uuid.v4(),
        title: this.state.todo
      }]),
      todo: ''
    });
  }
  
  renderTitle() {
    const {count} = this.state;
    return `${Math.floor(count / 60)} : ${count % 60 < 10 ? '0' + count % 60 : count % 60}`
  }
  
  render() {
    const {count} = this.state;
    
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.time}>
            <span className={styles.time}>
              {this.renderTitle()}
              </span>
          </div>
          
          <div className={styles.startButton}>
            {!this.state.tomato ?
              <Button
                type={'primary'}
                onClick={this.startTomato}
              >
                Start A Tomato
              </Button> : null
            }
          </div>
          
          <div className={styles.doneList}>
            {this.state.doneList.map((todo) => {
              return (
                <Card key={todo.key}>
                  <span style={{fontSize: 18}}>{todo.title}</span>
                </Card>
              );
            })}
          </div>
        
        </div>
        
        <div className={styles.right}>
          <div className={styles.input}>
            <Input
              size={'large'}
              value={this.state.todo}
              onKeyDown={this.addTodo}
              onChange={this.change}
            />
          </div>
          
          <div className={styles.todoList}>
            <div>
              {this.state.todoList.map((todo) => {
                return (
                  <Card
                    key={todo.key}
                    onClick={this.complete(todo)}
                  >
                    <span style={{fontSize: 18}}>{todo.title}</span>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


TomatoPage.propTypes = {
  projects: PropTypes.array.isRequired,
  updateProject: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
};


export default TomatoPage;
