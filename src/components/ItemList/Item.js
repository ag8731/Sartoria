import React, {Component} from 'react';
import {Card, Icon, Tag} from 'antd';

const {Meta} = Card;

class Item extends Component {
  renderTags = () => this.props.data.tags.map(tag => (
    <Tag key={tag.id} className='sub'>{tag.name}</Tag>
  ));

  renderActions = () => {
    const {showBin} = this.props;

    if (showBin) {
      return [<Icon type='skin' />, <Icon type='dropbox' />];
    } else {
      return [<Icon type='skin' className='label' />]
    }
  }

  render() {
    const {data, showBin} = this.props;

    return (
      <Card
        className='item'
        hoverable={true}
        cover={<img alt='' src={data.image} />}
        actions={this.renderActions()}
      >
        <Meta
          title={<span><Icon type='skin' className='label' />{data.name}</span>}
          description={
            <div>
              {showBin && <div><Icon type='dropbox' className='label' />{data.bin.name}</div>}
              {data.tags.length !== 0 && <div><Icon type='tags' className='label' />{this.renderTags()}</div>}
            </div>
          }
        />
      </Card>
    );
  }
}

export default Item;
