import React, {Component} from 'react';
import axios from 'axios';
import Store from '../store';
import ItemCreator from './ItemCreator';
import {Link} from 'react-router-dom';
import ItemTag from './ItemTag';
import {Card, Button, Row, Col, Icon, Dropdown, Menu, Tooltip, message} from 'antd';
import Deleter from './Deleter';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import queryString from 'query-string';

class ItemView extends Component {
  state = {
    item: null,
    showItemCreator: false,
    showDeleter: false
  }

  getItem = () => {
    const {store, match, location} = this.props;

    const ownerId = queryString.parse(location.search).owner;

    axios.get(`/api/items/${match.params.itemId}`, {
      params: {
        owner: ownerId || store.get('user').id
      }
    }).then(res => {
      this.setState({ item: res.data });
    });
  }

  componentDidMount() {
    this.getItem()
  }

  renderTags = () => this.state.item.tags.map(tag => (
    <Card.Grid key={tag.id} className='tag-grid'><ItemTag data={tag} /></Card.Grid>
  ));

  render() {
    const {item, showItemCreator, showDeleter} = this.state;
    const {history, location} = this.props;

    if (item == null) return null;

    const shareableLink = `${window.location.origin}/items/${item.id}?owner=${item.owner.id}`;
    const ownerId = queryString.parse(location.search).owner;

    return (
      <div>
        <Card className='section-header'>
          <span className='title'>{item.name}</span>
          <Button.Group style={{ float: 'right' }}>
            <CopyToClipboard
              text={shareableLink}
              onCopy={() => message.info('Copied to clipboard!')}
            >
              <Tooltip placement='bottomRight' title={shareableLink}>
                <Button icon='share-alt' />
              </Tooltip>
            </CopyToClipboard>
            {ownerId == null && <Dropdown trigger={['click']} overlay={
              <Menu>
                <Menu.Item
                  onClick={() => this.setState({ showItemCreator: true })}
                >
                  <Icon type='edit' />
                  <span>Edit Item</span>
                </Menu.Item>
                <Menu.Item
                  onClick={() => this.setState({ showDeleter: true })}
                >
                  <Icon type='delete' />
                  <span>Delete Item</span>
                </Menu.Item>
              </Menu>
            }>
              <Button icon='setting' />
            </Dropdown>}
          </Button.Group>
        </Card>
        <Row gutter={16}>
          <Col span={12}>
            <Card className='hidden-body' cover={<img alt='' src={item.image} />} />
          </Col>
          <Col span={12}>
            <Card
              title={<span><Icon type='dropbox' className='label'/>Bin</span>}
            >
              <Link
                to={{
                  pathname:`/bins/${item.bin.id}`,
                  search: queryString.stringify({ owner: ownerId })
                }}
              >
                <Button icon='arrow-right'>{item.bin.name}</Button>
              </Link>
            </Card>
            {item.tags.length > 0 && <Card
              className='sub'
              bodyStyle={{padding: '0'}}
              title={<span><Icon type='tags' className='label'/>Tags</span>}
            >
              {this.renderTags()}
            </Card>}
            {item.description.length > 0 && <Card
              className='sub'
              title={<span><Icon type='info-circle' className='label'/>Description</span>}
            >
              {item.description}
            </Card>}
          </Col>
        </Row>
        <ItemCreator
					actions={{
						refreshParent: this.getItem,
						hideItemCreator: () => this.setState({ showItemCreator: false })
					}}
					visible={showItemCreator}
          currentItem={item}
				/>
        <Deleter
          actions={{
            afterDelete: () => history.push('/items'),
						hideDeleter: () => this.setState({ showDeleter: false })
					}}
					visible={showDeleter}
          title='Delete Item'
          url={`/api/items/${item.id}`}
          prompt={<span>Are you sure you want to delete <strong>{item.name}</strong> forever? This cannot be undone.</span>}
        />
      </div>
    );

  }
}

export default Store.withStore(ItemView);
