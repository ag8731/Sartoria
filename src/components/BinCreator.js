import React, {Component} from 'react';
import axios from 'axios';
import Store from '../store';
import {Modal, Input, message} from 'antd';

const {TextArea} = Input;

class BinCreator extends Component {
	state = {
		name: '',
    description: ''
	}

	handleOk = () => {
    const {name, description} = this.state;
    const {actions, store} = this.props;

		if (name.length === 0) {
			message.error('A name is required.');
			return;
		}

		axios.post('/api/bins/', {
      owner: store.get('user').id,
      name,
      description
    }).then(res => {
			this.setState({
        name: '',
        description: '',
			});

      actions.getAllBins();
			actions.hideBinCreator();
		});
	}

	render() {
    const {name, description} = this.state;
    const {visible, actions} = this.props;

		return (
			<Modal
				title='Add Bin'
				visible={visible}
				onOk={this.handleOk}
				onCancel={actions.hideBinCreator}
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
			</Modal>
		);
	}
}

export default Store.withStore(BinCreator);
