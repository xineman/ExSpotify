import { PROJECT_URL, getExtensionUrl } from '../../utilities.js';
export default class LoginBtn extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<a className="header__nav-item header__login-btn" href={PROJECT_URL+"login?url="+getExtensionUrl()}>Login with Spotify</a>
		);
	}
}
