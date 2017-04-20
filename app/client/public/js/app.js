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
			spotifyLogin: null,
			vkLogin: null
		}
	}
	componentWillMount() {
		chrome.cookies.get({url: "http://localhost", name:"vk_access_token"}, (cookie) => this.setState({vkLogin: cookie?cookie.value:null}));
		chrome.cookies.get({url: "http://localhost", name:"access_token"}, (cookie) => this.setState({spotifyLogin: cookie?cookie.value:null}));
		chrome.cookies.onChanged.addListener((info)=>{
			switch (info.cookie.name) {
				case "access_token":
					this.setState({spotifyLogin: info.removed?null:info.cookie.value});
					break;
				case "vk_access_token":
					this.setState({vkLogin: info.removed?null:info.cookie.value});
					break;
			}
		})
	}
	setLoginStatus(status) {
		this.setState(status);
	}
	render() {
		return (
			<div id="react-container">
				<Header setLoginStatus={(status) => this.setLoginStatus(status)} state={this.state}/>
				<MainSection setLoginStatus={(status) => this.setLoginStatus(status)} state={this.state}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>, document.getElementById("react-app"));
