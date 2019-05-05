import React, {Component} from 'react';
import {Tag, Tooltip} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import queryString from 'query-string';

class ItemTag extends Component {
  render() {
    const {data, location, tagClassName} = this.props;

    const ownerId = queryString.parse(location.search).owner;

    return (
      <Tooltip title={data.description}>
        <Link to={{
          pathname: '/items',
          search: queryString.stringify({ owner: ownerId, tags: data.id })
        }}>
          <Tag className={tagClassName} style={{ cursor: 'pointer' }}>{data.name}</Tag>
        </Link>
      </Tooltip>
    );
  }
}

export default withRouter(ItemTag);
