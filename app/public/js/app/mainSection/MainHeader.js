import UrlInputBox from './mainHeader/UrlInputBox';
import UrlPlaylistName from './mainHeader/UrlPlaylistName.js';
import LibrarySources from './mainHeader/LibrarySources.js';

export default class MainHeader extends React.Component {
	constructor() {
		super();
	}

	selectSourceOption() {
		switch (this.props.state.source) {
			case "library":
				return (<LibrarySources libraryState={this.props.state.library} selectLibrarySource={(s) => this.props.selectLibrarySource(s)}/>);
				break;
			case "popular":
				return null;
				break;
			case "url":
				switch (this.props.state.url.state) {
					case "intro":
						return (<UrlInputBox openUrlClick={(event) => this.props.openUrlClick(event)}/>);
						break;
					case "loading":
						return (<UrlPlaylistName onClick={() => this.props.cancelRequest()}/>);
						break;
					case "playlist":
						return (<UrlPlaylistName playlistName={this.props.state.url.songlist.name} onClick={() => this.props.changeUrl()}/>);
						break;
					default:

				}
				break;
			default:

		}
	}
	getSourceName() {
		switch (this.props.state.source) {
			case "library":
				return "Library";
				break;
			case "popular":
				return "Popular";
				break;
			case "url":
				return "Playlist URL"
		}
	}
	render() {
		return (
			<section className="content-header">
				<div className="header__nav container">
					<div className="flex-item">
						<div className="content-header__source-wrapper">
							<div className="content-header__source-dropdown dropdown">
								<div className="content-header__dropdown-title dropdown-title">
									<p id="current-source" className="content-header__nav-item">Source: {this.getSourceName()}</p>
									<div className="header__dropdown-arrow dropdown-arrow"></div>
								</div>
								<div className="content-header__dropdown-content dropdown-content">
									<ul className="content-header__dropdown-options">
										<li id="choose-library" className="content-header__dropdown-item" onClick={(event) => this.props.changeSource(event)}>Library</li>
										<li id="choose-popular" className="content-header__dropdown-item" onClick={(event) => this.props.changeSource(event)}>Popular</li>
										<li id="choose-url" className="content-header__dropdown-item" onClick={(event) => this.props.changeSource(event)}>URL</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="content-header__source-options">
						{this.selectSourceOption()}
					</div>
					<div className="flex-item">
						<a className="content-header__nav-item content-header__go-btn" href="#">Go!</a>
					</div>
				</div>
			</section>
		);
	}
}
