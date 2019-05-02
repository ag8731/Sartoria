import React, {Component} from 'react';
import axios from 'axios';
import Store from '../store';
import {Input, Popover, Button, message} from 'antd';

const {TextArea} = Input;

class TagCreator extends Component {
	state = {
		name: '',
		description: '',
	}

	handleConfirm = () => {
    const {name, description} = this.state;
    const {actions, store} = this.props;

		if (name.length === 0) {
			message.error('Tags must have names.');
			return;
		}

		axios.post('/api/tags/', {
      owner: store.get('user').id,
			name,
			description,
		}).then(res => {
			this.setState({
				name: '',
				description: '',
			});

			actions.refreshParent();
			actions.hideTagCreator();
		})
	}

	render() {
    const {name, description} = this.state;
    const {placement, children, visible, actions, handleVisibleChange} = this.props;

    const content = (
      <div style={{width: 300}}>
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
        <div className='creator-actions'>
          <Button className='cancel' onClick={actions.hideTagCreator}>Cancel</Button>
          <Button className='confirm' onClick={this.handleConfirm} type='primary'>Confirm</Button>
        </div>
      </div>
    );

		return (
      <Popover
        placement={placement}
        title='Add Tag'
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

export default Store.withStore(TagCreator);
