import React, {Component} from 'react';
import {Tag, Tooltip} from 'antd';
import {Link} from 'react-router-dom';

class ItemTag extends Component {
  render() {
    const {data} = this.props;

    return (
      <Tooltip title={data.description}>
        <Link to={`/items?tags=${data.id}`}>
          <Tag style={{ cursor: 'pointer' }}>{data.name}</Tag>
        </Link>
      </Tooltip>
    );
  }
}

export default ItemTag;
