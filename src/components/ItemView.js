import React, {Component} from 'react';
import axios from 'axios';
import Store from '../store';
import ItemCreator from './ItemCreator';
import {Link} from 'react-router-dom';
import {Card, Button, Row, Col, Tag, Icon, Dropdown, Menu} from 'antd';

class ItemView extends Component {
  state = {
    item: null,
    showItemCreator: false
  }

  getItem = () => {
    const {store, match} = this.props;

    axios.get(`/api/items/${match.params.itemId}`, {
      params: {
        owner: store.get('user').id
      }
    }).then(res => {
      this.setState({ item: res.data });
    });
  }

  componentDidMount() {
    this.getItem()
  }

  renderTags = () => this.state.item.tags.map(tag => (
    <Card.Grid key={tag.id} className='tag-grid'><Tag>{tag.name}</Tag></Card.Grid>
  ));

  render() {
    const {item, showItemCreator} = this.state;

    if (item == null) return null;

    return (
      <div>
        <Card className='section-header'>
          <span className='title'>{item.name}</span>
          <Button.Group style={{ float: 'right' }}>
            <Dropdown overlay={
              <Menu>
                <Menu.Item
                  onClick={() => this.setState({ showItemCreator: true })}
                >
                  <Icon type='edit' />
                  <span>Edit Item</span>
                </Menu.Item>
                <Menu.Item
                >
                  <Icon type='delete' />
                  <span>Delete Item</span>
                </Menu.Item>
              </Menu>
            }>
              <Button icon='setting' />
            </Dropdown>
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
              <Link to={`/bins/${item.bin.id}`}><Button icon='arrow-right'>{item.bin.name}</Button></Link>
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
      </div>
    );

  }
}

export default Store.withStore(ItemView);
