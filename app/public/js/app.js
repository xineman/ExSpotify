// import React from 'react';
// import ReactDOM from 'react-dom';
import Header from './app/Header.js';
import MainSection from './app/MainSection.js';
import { getCookie, refreshToken } from './utilities.js';

$(document).ready(function() {
	$('.dropdown-title').hover(function() {
		$(this).siblings('.dropdown-content').addClass('dropdown-content_active');
		$(this).find('.dropdown-arrow').addClass('dropdown-arrow_active');
	}, function() {
		$(this).siblings('.dropdown-content').removeClass('dropdown-content_active');
		$(this).find('.dropdown-arrow').removeClass('dropdown-arrow_active');
	});
	$('.dropdown-content').hover(function() {
		$(this).siblings('.dropdown-title').find('.dropdown-arrow').addClass('dropdown-arrow_active');
		$(this).addClass('dropdown-content_active');
	}, function() {
		$(this).siblings('.dropdown-title').find('.dropdown-arrow').removeClass('dropdown-arrow_active');
		$(this).removeClass('dropdown-content_active');
	});
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			// signedIn: this.isSignedIn(),
			// spotifyLogin: null,
			// vkLogin: null
		}
	}
	// isSignedIn() {
	// 	// return true;
	// 	return getCookie("signedIn") == "true"
	// 		? true
	// 		: false;
	// }
	setUserId(id) {
		// this.setState({spotifyLogin: id});
	}
	render() {
		return (
			<div id="react-container">
				<Header setUserId={(id) => this.setUserId(id)} state={this.state}/>
				<MainSection state={this.state}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>, document.getElementById("react-app"));
