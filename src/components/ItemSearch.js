import React, {Component} from 'react';
import {Popover, Input, Select, Button} from 'antd';
import {withRouter} from 'react-router-dom';
import Store from '../store';
import axios from 'axios';

const {Option} = Select;

class ItemSearch extends Component {
  state = {
    name: '',
    tags: []
  }

  componentDidMount() {
    this.getAllTags();
  }

  getAllTags = () => {
    const {store} = this.props;

    axios.get('/api/tags', {
      params: {
        owner: store.get('user').id
      }
    }).then(res => {
      store.set('tags')(res.data);
    });
  }

  renderTagOptions = () => this.props.store.get('tags').map(tag => (
    <Option key={tag.id} value={tag.id}>{tag.name}</Option>
  ));

  handleSearch = () => {
    const {name, tags} = this.state;
    const {history, location} = this.props;

    const params = new URLSearchParams();
    if (name.length > 0) {
      params.append('search', name);
    }
    tags.forEach(tag => params.append('tags', tag));

    history.push({
      pathname: location.pathname,
      search: `?${params.toString()}`
    });
  }

  render() {
    const {name, tags} = this.state;
    const {placement, visible, handleVisibleChange, children, actions} = this.props;

    const content = (
      <div style={{ width: 300 }}>
        <Input
					value={name}
					onChange={e => this.setState({ name: e.target.value })}
					placeholder='Name'
				/>
        <Select
          className='search-tag-select search-field'
          mode='multiple'
          placeholder='Tags'
          optionFilterProp='children'
          onChange={tags => this.setState({ tags })}
          value={tags}
        >
          {this.renderTagOptions()}
        </Select>
        <div className='search-actions'>
          <Button className='cancel' onClick={actions.hideItemSearch}>Cancel</Button>
          <Button className='confirm' onClick={this.handleSearch} type='primary'>Search</Button>
        </div>
      </div>
    );

    return (
      <Popover
        placement={placement}
        title='Search Items'
        content={content}
        trigger='click'
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        {children}
      </Popover>

    );
  }
}

export default Store.withStore(withRouter(ItemSearch));
