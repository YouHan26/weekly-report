import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import autobind from 'autobind-decorator';
import {connect} from "react-redux";
import {Card} from 'antd';
import styles from './MindMapList.css';
import {Link} from "react-router-dom";
import {load} from "../action";


class MindMapList extends PureComponent {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.props.load();
  }

  @autobind
  handleClick() {

  }

  render() {
    const {maps} = this.props;
    console.log(maps);


    return (
      <div className={styles.root}>
        <ContextMenuTrigger
          id="contextMenu"
          style={{flex: 1, display: 'flex', flexDirection: 'column'}}
        >
          <div className={styles.content}>
            {maps.map((map) => {
              return (
                <Link to={'/mindMap/' + map.key} key={map.key}>
                  <Card>
                    {map.name}
                  </Card>
                </Link>
              );
            })}
          </div>
        </ContextMenuTrigger>

        <ContextMenu id="contextMenu">
          <MenuItem data={null} onClick={this.handleClick}>
            <Link to='/mindMap/new' style={{fontSize: '18px'}}>
              New MindMap
            </Link>
          </MenuItem>
        </ContextMenu>

      </div>
    );
  }
}


MindMapList.propTypes = {
  maps: PropTypes.array,
  load: PropTypes.func.isRequired,
};

MindMapList.defaultProps = {
  maps: []
};

export default connect((state, props) => {
  return {
    maps: Object.values(state.mindMap).map((map) => {
      const {mindMap, ...others} = map;
      return {
        ...others,
        mindMap,
        name: mindMap.source.name
      };
    })
  };
}, {
  load
})(MindMapList);