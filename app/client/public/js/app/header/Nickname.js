import { getCookie, refreshToken, PROJECT_URL, getExtensionUrl } from '../../utilities.js';

export default class Nickname extends React.Component {
	constructor() {
		super();
		this.state = {
			loaded: false
		}
	}
	getUserData() {
		$.ajax({
			url: 'https://api.spotify.com/v1/me',
			headers: {
				'Authorization': 'Bearer ' + this.props.spotifyLogin
			}
		}).done((data) => {
			this.setState({
				loaded: true,
				name: data.display_name
					? data.display_name
					: data.id,
				imgUrl: data.images[0].url
			});
			// this.props.setUserId(data.id);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getUserData());
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}
	componentWillMount() {
		this.getUserData();
	}
	componentDidUpdate() {
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
	}
	render() {
		if (this.state.loaded)
			return (
				<div className="header__navigation_right header__nickname-dropdown dropdown">
					<div className="header__dropdown-title dropdown-title">
						<div className="header__profile-picture-wrapper" style={{
							backgroundImage: "url(" + this.state.imgUrl + ")"
						}}>
							{/* <img className="header__profile-picture" src="../img/test.jpg" alt="Your photo"/> */}
						</div>
						<p className="header__nav-item">{this.state.name}</p>
						<div className="header__dropdown-arrow dropdown-arrow"></div>
					</div>
					<div className="header__dropdown-content dropdown-content">
						<ul className="header__dropdown-options">
							<li className="header__dropdown-item">Settings</li>
							<li className="header__dropdown-item" onClick={() => window.location.replace(PROJECT_URL+"logout?url="+getExtensionUrl())}>Logout</li>
						</ul>
					</div>
				</div>
			)
		else
			return null;
		}
}
