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

  componentDidMount() {
    const {currentBin} = this.props;
    if (currentBin != null) {
      this.setState({
        name: currentBin.name,
        description: currentBin.description
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {currentBin} = this.props;
    const prevBin = prevProps.currentBin;

    if (currentBin == null || prevBin == null) return;

    if (currentBin.id !== prevBin.id) {
      this.setState({
        name: currentBin.name,
        description: currentBin.description
      });
    }
  }

	createBin = () => {
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

      actions.refreshParent();
			actions.hideBinCreator();
		});
	}

  patchBin = () => {
    const {name, description} = this.state;
    const {actions, currentBin} = this.props;

		if (name.length === 0) {
			message.error('A name is required.');
			return;
		}

		axios.patch(`/api/bins/${currentBin.id}/`, {
      name,
      description
    }).then(res => {
      actions.refreshParent();
			actions.hideBinCreator();
		});
  }

  handleOk = () => {
    if (this.props.currentBin == null) {
      this.createBin();
    } else {
      this.patchBin();
    }
  }

	render() {
    const {name, description} = this.state;
    const {visible, actions, currentBin} = this.props;

		return (
			<Modal
				title={currentBin == null ? 'Add Bin' : 'Edit Bin'}
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
