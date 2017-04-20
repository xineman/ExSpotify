export default class UrlPlaylistName extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className="content-header__url-playlist-wrapper">
				<h3 className="content-header__nav-item content-header__url-playlist-name">
					{this.props.playlistName
						? this.props.playlistName
						: "Loading..."}
				</h3>
				<a id="change-url-btn" className="content-header__url-button" onClick={() => this.props.onClick()}>
					{this.props.playlistName
						? "Close"
						: "Cancel"}
				</a>
			</div>
		);
	}
}
