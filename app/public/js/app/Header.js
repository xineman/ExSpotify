import Nickname from './header/Nickname.js';
import LoginBtn from './header/LoginBtn.js';
import { getCookie, refreshToken } from '../utilities.js';

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
							<a href="#">
								<h1 className="header__title">ExSpotify</h1>
							</a>
						</li>
						<li>
							<a className="header__nav-item" href="#">Help</a>
						</li>
						<li>
							<div className="header__services-dropdown dropdown">
								<div className="header__dropdown-title dropdown-title">
									<p className="header__nav-item">Services</p>
									<div className="header__dropdown-arrow dropdown-arrow"></div>
								</div>
								<div className="header__dropdown-content dropdown-content">
									<ul className="header__dropdown-options">
										<li>
											<a className="header__dropdown-item" href="#">Google Play Music</a>
										</li>
										<li>
											<a className="header__dropdown-item" href="#">VK</a>
										</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
					{getCookie("access_token")
						? <Nickname setUserId={(id) => this.props.setUserId(id)}/>
						: <LoginBtn/>}
				</div>
			</header>
		);
	}
}
