import {getCookie, refreshToken} from '../../utilities.js';
import CustomScroll from 'react-custom-scroll';
import InfiniteScroll from 'react-infinite-scroller';
export default class PlaylistList extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
	}

	componentDidUpdate() {
		$('.main-section__playlist-summary').click(function(event) {
			$('.main-section__playlist-summary').removeClass("main-section__playlist-summary_active");
			$(this).addClass('main-section__playlist-summary_active');
		});
		$('.main-section__playlists-checkbox, .main-section__playlists-checkbox-label').click(function(event) {
			event.stopPropagation();
		});
		$('.main-section__playlists-checkbox').change(function(event) {
			if ($(this).parent().hasClass('main-section__playlist-summary_active'))
				if ($(this).prop("checked"))
					$('.main-section__song-checkbox').prop("checked", true);
				else
					$('.main-section__song-checkbox').prop("checked", false);
				}
			);
	}

	getUserPlaylists() {
		$.ajax({
			url: `https://api.spotify.com/v1/me/playlists`,
			headers: {
				'Authorization': 'Bearer ' + getCookie("access_token")
			}
		}).done((list) => {
			this.props.setPlaylistList(list);
			// this.getPlaylist()
			console.log("Loaded playlists");
			console.log(this.props.state);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getUserPlaylists());
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}

	getUserAlbums() {
		$.ajax({
			url: `https://api.spotify.com/v1/me/albums`,
			headers: {
				'Authorization': 'Bearer ' + getCookie("access_token")
			}
		}).done((list) => {
			this.props.setAlbumList(list);
			// this.getPlaylist()
			console.log("Loaded albums");
			console.log(this.props.state);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getUserAlbums());
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}

	parsePlaylist(playlist, isActive) {
		const index = this.props.state.library.playlistList.items.indexOf(playlist);
		return (
			<div key={playlist.id} className={"main-section__playlist-summary" + (isActive
				? " main-section__playlist-summary_active"
				: "")} onClick={() => this.props.selectPlaylist(index)}>
				<img className="main-section__playlist-cover" src={playlist.images.length
					? playlist.images[0].url
					: "img/album art.jpg"} alt="Album cover"/>
				<div className="main-section__playlist-text">
					<h3 className="main-section__playlist-name">{playlist.name}</h3>
					<h4 className="main-section__playlist-author">by {playlist.owner.id}</h4>
				</div>
				<input id={playlist.id} className="main-section__playlists-checkbox css-checkbox" type="checkbox"/>
				<label className="main-section__playlists-checkbox-label css-label" htmlFor={playlist.id}></label>
			</div>
		);
	}

	renderList(playlistList) {
		var playlists = [];
		for (let playlist of playlistList.items) {
			if (playlistList.items.indexOf(playlist) == 0) {
				playlists.push(this.parsePlaylist(playlist, true));
			} else
				playlists.push(this.parsePlaylist(playlist));
			}
		return (
			<CustomScroll heightRelativeToParent="100%">
				<aside ref="test" className="main-section__playlists-list">
					{playlists}
				</aside>
			</CustomScroll>
		)
	}

	parseAlbum(a, isActive) {
		const index = this.props.state.library.albumList.items.indexOf(a);
		let album = a.album;
		return (
			<div key={album.id} className={"main-section__playlist-summary" + (isActive
				? " main-section__playlist-summary_active"
				: "")} onClick={() => this.props.selectAlbum(index)}>
				<img className="main-section__playlist-cover" src={album.images.length>2
					? album.images[2].url
					: album.images[0].url} alt="Album cover"/>
				<div className="main-section__playlist-text">
					<h3 className="main-section__playlist-name">{album.name}</h3>
					<h4 className="main-section__playlist-author">{album.artists[0].name}</h4>
				</div>
				<input id={album.id} className="main-section__playlists-checkbox css-checkbox" type="checkbox"/>
				<label className="main-section__playlists-checkbox-label css-label" htmlFor={album.id}></label>
			</div>
		);
	}

	renderAlbumList(albumList) {
		var albums = [];
		for (let album of albumList.items) {
			if (albumList.items.indexOf(album) == 0) {
				albums.push(this.parseAlbum(album, true));
			} else
				albums.push(this.parseAlbum(album));
			}
		return (
			<CustomScroll heightRelativeToParent="100%">
				<aside className="main-section__playlists-list">
					{albums}
				</aside>
			</CustomScroll>
		)
	}

	render() {
		switch (this.props.state.library.state) {
			case "playlist":
				if (this.props.state.library.playlistList == null) {
					this.getUserPlaylists();
					return (
						<h3 className="main-section__playlists-status">
							Loading playlists...
						</h3>
					);
				}
				return this.renderList(this.props.state.library.playlistList);
				break;
			case "album":
				if (this.props.state.library.albumList == null) {
					this.getUserAlbums();
					return (
						<h3 className="main-section__playlists-status">
							Loading albums...
						</h3>
					);
				}
				return this.renderAlbumList(this.props.state.library.albumList);
				// (
				// 	<h3 className="main-section__playlists-status">
				// 		Loaded albums
				// 	</h3>
				// );
				//
				break;

		}

	}
}
