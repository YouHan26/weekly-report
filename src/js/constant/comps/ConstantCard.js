import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Table} from "antd";
import styles from './ConstantCard.css';
import UTILS from 'mi-js-utils';

/**
 * empty card
 * @param props
 * @returns {*}
 * @constructor
 */
const EmptyCard = (props) => {
  const {onClick} = props;
  return (
    <Card
      className={styles.item}
      onClick={onClick}
      style={{textAlign: 'center'}}
    >
      <p style={{fontSize: '48px'}}> + </p>
    </Card>
  );
};


const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Value',
  dataIndex: 'value',
}, {
  title: 'Field',
  dataIndex: 'field',
}];


const StaticTags = ({tags, selected}) => {
  return (
    <div>
      {selected.map((id) => {
        return (
          <Button type={'primary'} key={id} size={'small'} style={{marginLeft: '2px'}}>
            {tags[id]}
          </Button>
        );
      })}
    </div>
  );
};

/**
 * constant card
 * @param props
 * @returns {*}
 * @constructor
 */
const ConstantCard = (props) => {
  const {data, tags, onClick, onRemove, preview, ...others} = props;
  if (!data) {
    return <EmptyCard onClick={onClick} />;
  }
  
  const tagsObject = {};
  tags.forEach((tag) => {
    tagsObject[tag.id] = tag.name;
  });
  
  return (
    <Card
      className={styles.item}
      {...others}
      title={preview ? null : data.title}
      extra={preview ? null : <StaticTags tags={tagsObject} selected={data.tags} />}
    >
      <Table
        showHeader={false}
        columns={columns}
        dataSource={data.data}
        size="small"
        rowKey={(record) => {
          return record.value + record.name;
        }}
        pagination={false}
      />
    </Card>
  );
};


ConstantCard.propTypes = {
  data: PropTypes.object,
  tags: PropTypes.array,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
};

ConstantCard.defaultProps = {
  data: null,
  tags: [],
  onClick: UTILS.common.emptyfunc,
  onRemove: UTILS.common.emptyfunc,
};

export default ConstantCard;
