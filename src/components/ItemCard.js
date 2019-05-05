import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Card, Icon, Tooltip, message} from 'antd';
import ItemTag from './ItemTag';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import queryString from 'query-string';

const {Meta} = Card;

class ItemCard extends Component {
  renderTags = () => this.props.data.tags.map(tag => (
    <ItemTag key={tag.id} tagClassName='sub' data={tag} />
  ));

  renderActions = () => {
    const {data, showBin, location} = this.props;

    const ownerId = queryString.parse(location.search).owner;

    const GoToBin = ({id}) => {
      const searchString = queryString.stringify({ owner: ownerId });
      return (
        <Link
          to={{
            pathname:`/bins/${id}`,
            search: searchString
          }}
        >
          <Icon type='dropbox' />
        </Link>
      );
    }

    const GoToItem = ({id}) => {
      const searchString = queryString.stringify({ owner: ownerId });
      return (
        <Link
          to={{
            pathname: `/items/${id}`,
            search: searchString
          }}
        >
          <Icon type='skin' />
        </Link>
      );
    }

    const ShareItem = ({id, owner}) => {
      const shareableLink = `${window.location.origin}/items/${id}?owner=${owner}`;
      return (
        <CopyToClipboard
          text={shareableLink}
          onCopy={() => message.info('Copied to clipboard!')}
        >
          <Tooltip placement='bottom' title={shareableLink}><Icon type='share-alt' /></Tooltip>
        </CopyToClipboard>
      );
    }

    if (showBin) {
      return [<GoToItem id={data.id} />, <GoToBin id={data.bin.id}/>, <ShareItem id={data.id} owner={data.owner.id} />];
    } else {
      return [<GoToItem id={data.id} />, <ShareItem id={data.id} owner={data.owner.id} />];
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

export default withRouter(ItemCard);
