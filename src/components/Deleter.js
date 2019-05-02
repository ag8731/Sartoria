import React, {Component} from 'react';
import {Modal} from 'antd';
import axios from 'axios';

class Deleter extends Component {
  handleOk = () => {
    const {actions, url} = this.props;

    axios.delete(url).then(res => {
      actions.hideDeleter();
      actions.afterDelete();
		});
  }

	render() {
    const {title, prompt, visible, actions} = this.props;

		return (
			<Modal
				title={title}
				visible={visible}
				onOk={this.handleOk}
				onCancel={actions.hideDeleter}
				okText='Delete'
        okType='danger'
        content='test'
			>
        {prompt}
      </Modal>
		);
	}
}

export default Deleter;
