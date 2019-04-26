import React, {Component} from 'react';
import {Card, Icon, Tag} from 'antd';

const {Meta} = Card;

class Item extends Component {
  renderTags = () => this.props.data.tags.map(tag => (
    <Tag key={tag.id}>{tag.name}</Tag>
  ));

  render() {
    const {data} = this.props;

    return (
      <Card
        className='item'
        hoverable={true}
        cover={<img alt='' src={data.image} />}
        actions={[<Icon type='skin' />, <Icon type='dropbox' />]}
      >
        <Meta
          title={<span><Icon type='skin' className='label' />{data.name}</span>}
          description={
            <div>
              <div><Icon type='dropbox' className='label' />{data.bin.name}</div>
              {data.tags.length !== 0 && <div className='sub'><Icon type='tags' className='label' />{this.renderTags()}</div>}
            </div>
          }
        />
      </Card>
    );
  }
}

export default Item;
