export default class LibrarySources extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$('.content-header__library-source').click((event) => {
			switch (event.target.id) {
				case "choose-playlists":
					this.props.selectLibrarySource("playlist");
					break;
				case "choose-albums":
					this.props.selectLibrarySource("album");
					break;

				case "choose-songs":
					this.props.selectLibrarySource("songs");
					break;

				default:
			}
		});
	}
	isActive(source) {
		var value;
		this.props.libraryState.state == source
			? value = " content-header__library-source_active"
			: value = "";
		return value;
	}
	render() {
		return (
			<div className="content-header__library-source-wrapper">
				<ul>
					<li id="choose-playlists" className={"content-header__nav-item content-header__library-source" + this.isActive("playlist")}>Playlists</li>
					<li id="choose-albums" className={"content-header__nav-item content-header__library-source" + this.isActive("album")}>Albums</li>
					<li id="choose-songs" className={"content-header__nav-item content-header__library-source" + this.isActive("songs")}>Songs</li>
				</ul>
			</div>
		);
	}
}
