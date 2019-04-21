import React, {Component} from 'react';
import './App.css';
import {hot} from 'react-hot-loader/root';
import axios from 'axios';

class App extends Component {
  state = {
    test: 'No Response'
  }

  getSomething = () => {
    axios.get('/api/users').then(res => {
      this.setState({ test: JSON.stringify(res.data) })
    })
  }

	render() {
    const {test} = this.state;

		return (<div className="App">
			<header className="App-header">
				<h1 className="App-title">Sartoria</h1>
			</header>
			<p className="App-intro" onClick={this.getSomething}>
        {test}
			</p>
		</div>);
	}
}

export default process.env.NODE_ENV === "development"
	? hot(App)
	: App;
