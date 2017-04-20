import Nickname from './header/Nickname.js';
import LoginBtn from './header/LoginBtn.js';
import { getCookie, refreshToken, loginVk, PROJECT_URL, getExtensionUrl } from '../utilities.js';

export default class Header extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<header className="header">
				<div className="header__nav container">
					<ul className="header__navigation_left">
						<li>
							<a className="header__nav-item header__title" href="#">ExSpotify</a>
						</li>
						<li>
							<a className="header__nav-item" href="#">Help</a>
						</li>
						<li>
							<div className="header__services-dropdown dropdown_no-arrow">
								<div className="header__dropdown-title dropdown-title">
									<p className="header__nav-item"><i className="fa fa-spotify fa-lg" aria-hidden="true"></i></p>
									{this.props.state.spotifyLogin && <i className="fa fa-check-circle header__login-status" aria-hidden="true"></i>}
								</div>
								{this.props.state.spotifyLogin && (
									<div className="header__dropdown-content dropdown-content">
										<ul className="header__dropdown-options">
											<li>
												<a className="header__dropdown-item" href="#">Logout</a>
											</li>
										</ul>
									</div>
								)}
							</div>
						</li>
						<li>
							<div className="header__services-dropdown dropdown_no-arrow">
								<div className="header__dropdown-title dropdown-title">
									<p className="header__nav-item" onClick={() => !this.props.state.vkLogin && loginVk((token)=>this.props.setLoginStatus({vkLogin:token}))}><i className="fa fa-vk fa-lg" aria-hidden="true"></i></p>
									{this.props.state.vkLogin && <i className="fa fa-check-circle header__login-status" aria-hidden="true"></i>}
								</div>
								{this.props.state.vkLogin && (
									<div className="header__dropdown-content dropdown-content">
										<ul className="header__dropdown-options">
											<li>
												<a className="header__dropdown-item" href="#" onClick={() => window.location.replace(PROJECT_URL+"auth/vk/logout?url="+getExtensionUrl())}>Logout</a>
											</li>
										</ul>
									</div>
								)}
							</div>
						</li>
					</ul>
					{this.props.state.spotifyLogin
						? <Nickname spotifyLogin={this.props.state.spotifyLogin}/>
						: <LoginBtn/>}
				</div>
			</header>
		);
	}
}
