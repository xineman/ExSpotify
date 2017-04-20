// import React from 'react';
// import ReactDOM from 'react-dom';
export default class UrlInputBox extends React.Component {
	constructor() {
		super();
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	render() {
		return (
			<form className="content-header__url-source-wrapper transition" onSubmit={(event) => this.props.openUrlClick(event)}>
				<input className="content-header__url-input" type="text" name="playlist-url" value={this.state.value} onChange={this.handleChange} placeholder="Playlist url"/>
				<input type="submit" value="Open" id="open-url-btn" className="content-header__url-button"/>
			</form>
		);
	}
}
