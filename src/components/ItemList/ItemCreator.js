import React, {Component} from 'react';
import axios from 'axios';
import {Modal, Input, Select, Button, message} from 'antd';
import TagCreator from './TagCreator';

const {TextArea} = Input;
const {Option} = Select;

class ItemCreator extends Component {
	state = {
		name: '',
    description: '',
    image: null,
    bin: undefined,
    tags: [],
    allBins: [],
    allTags: [],
    showTagCreator: false
	}

  getAllBins = () => axios.get('/api/bins').then(res => {
		this.setState({ allBins: res.data });
	});

  getAllTags = () => axios.get('/api/tags').then(res => {
		this.setState({ allTags: res.data });
	});

  componentDidMount() {
    this.getAllBins()
    this.getAllTags()
  }

  renderBinOptions = () => this.state.allBins.map(bin => (
    <Option key={bin.id} value={bin.id}>{bin.name}</Option>
  ));

  renderTagOptions = () => this.state.allTags.map(tag => (
    <Option key={tag.id} value={tag.id}>{tag.name}</Option>
  ));

	handleOk = () => {
    const {name, description, image, bin, tags} = this.state;
    const {actions} = this.props;

		if (name.length === 0 || image == null || bin == null) {
			message.error('All fields required.');
			return;
		}

		axios.post('/api/items/', {
      owner: 2,
			name,
			description,
      image,
      bin,
      tags
		}).then(res => {
			this.setState({
        name: '',
        description: '',
        image: null,
        bin: null,
        tags: []
			});

			actions.getAllItems();
			actions.hideItemCreator();
		});
	}

	render() {
    const {name, description, image, bin, tags, showTagCreator} = this.state;
    const {visible, actions} = this.props;

		return (
			<Modal
				title='Add Item'
				visible={visible}
				onOk={this.handleOk}
				onCancel={actions.hideItemCreator}
				okText='Confirm'
			>
				<Input
					value={name}
					onChange={e => this.setState({ name: e.target.value })}
					placeholder='Name'
				/>
				<TextArea
					value={description}
          className='creator-field'
					onChange={e => this.setState({ description: e.target.value })}
					placeholder='Description'
				/>
        <Select
          className='creator-field creator-select'
          showSearch={true}
          placeholder='Bin'
          optionFilterProp='children'
          onChange={bin => this.setState({ bin })}
          value={bin}
        >
          {this.renderBinOptions()}
        </Select>
        <div className='creator-field'>
          <Select
            mode='multiple'
            className='creator-tag-select'
            placeholder='Tags'
            optionFilterProp='children'
            onChange={tags => this.setState({ tags })}
            value={tags}
          >
            {this.renderTagOptions()}
          </Select>
          <TagCreator
            placement='bottom'
            actions={{
              getAllTags: this.getAllTags,
              hideTagCreator: () => this.setState({ showTagCreator: false })
            }}
            visible={showTagCreator}
            handleVisibleChange={showTagCreator => this.setState({ showTagCreator })}
          >
            <Button icon='plus' className='creator-tag-add'>Tag</Button>
          </TagCreator>
        </div>
			</Modal>
		);
	}
}

export default ItemCreator;
