import {getCookie, refreshToken} from '../../utilities.js';
import CustomScroll from 'react-custom-scroll';
export default class SongList extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {}

	componentDidUpdate() {}

	songClickListener(e, id) {
		let checkbox = document.getElementById(id).firstChild.firstChild;
		if (checkbox.checked) {
			if (e.target.className != "main-section__song-checkbox")
				checkbox.checked = false;
			if (this.props.state.source == "library" && this.props.state.library.state == "playlist")
				document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = false;
			}
		else {
			if (e.target.className != "main-section__song-checkbox")
				checkbox.checked = true;
			if (this.props.state.source == "library" && this.props.state.library.state == "playlist" && this.isAllSongsChecked())
				document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = true;
			}
		}

	// setListeners() {
	// 	$('.main-section__song-row').click(function(event) {
	// 		$(this).find('.main-section__song-checkbox').trigger('change');
	// 	});
	// 	$('.main-section__song-checkbox').change((event) => {
	// 		if ($(event.target).is(':checked')) {
	// 			$(event.target).prop('checked', false);
	// 			if (this.props.state.source == "playlist")
	// 				$('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', false);
	// 			}
	// 		else {
	// 			$(event.target).prop("checked", true);
	// 			if (this.props.state.source == "playlist" && this.isAllSongsChecked())
	// 				$('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', true);
	// 			}
	// 		});
	// }

	isAllSongsChecked() {
		var songs = document.getElementsByClassName('main-section__song-checkbox');
		for (let song of songs) {
			if (!song.checked)
				return false;
			}
		return true;
	}

	getPlaylist(playlist) {
		$.ajax({
			url: `https://api.spotify.com/v1/users/${playlist.owner.id}/playlists/${playlist.id}`,
			headers: {
				'Authorization': 'Bearer ' + getCookie("access_token")
			}
		}).done((songs) => {
			console.log(songs);
			this.props.setPlaylistSonglist(songs);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getPlaylist(playlist));
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}

	getAlbum(albumId) {
		$.ajax({url: `https://api.spotify.com/v1/albums/${albumId}`}).done((songs) => {
			console.log(songs);
			this.props.setAlbumSonglist(songs);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getAlbum(albumId));
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}

	getSavedSongs() {
		$.ajax({
			url: `https://api.spotify.com/v1/me/tracks`,
			headers: {
				'Authorization': 'Bearer ' + getCookie("access_token")
			}
		}).done((songs) => {
			console.log(songs);
			this.props.setSavedSonglist(songs);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getSavedSongs());
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}

	convertDuration(ms) {
		let mins = Math.floor(ms / 1000 / 60);
		let secs = ms % (1000 * 60);
		return `${mins}:${secs.toString().substring(0, 2)}`;
	}
	parseArtists(song) {
		var artists = "";
		for (let artist of song.artists) {
			artists += artist.name;
			if (song.artists.indexOf(artist) != song.artists.length - 1)
				artists += ", ";
			}
		return artists;
	}
	parseSong(song) {
		return (
			<tr key={song.id} id={song.id} className="main-section__song-row" onClick={(e) => this.songClickListener(e, song.id)}>
				<td><input id="input" className="main-section__song-checkbox" type="checkbox"/></td>
				<td>{song.name}</td>
				<td>{this.parseArtists(song)}</td>
				{this.props.state.library.state != "album" && <td>{song.album.name}</td>}
				<td>{this.convertDuration(song.duration_ms)}</td>
			</tr>
		);
	}
	renderPlaylist(playlist) {
		var songs = [];
		var list = this.props.state.library.state == "songs"
			? playlist.items
			: playlist.tracks.items;
		for (let song of list) {
			if (this.props.state.library.state == "album")
				songs.push(this.parseSong(song));
			else
				songs.push(this.parseSong(song.track));
			}
		return (
			<CustomScroll heightRelativeToParent="100%">
				<section className="main-section__songs">

					<table className="main-section__songs-list">
						<thead>
							<tr>
								<th className="main-section__check-col">Check</th>
								<th className="main-section__song-col">Song</th>
								<th className="main-section__artist-col">Artist</th>
								{this.props.state.library.state != "album" && <th className="main-section__album-col">Album</th>}
								<th className="main-section__duration-col">Duration</th>
							</tr>
						</thead>
						<tbody>
							{songs}
						</tbody>
					</table>
				</section>
			</CustomScroll>
		)
	}

	render() {
		console.log("Rendering...");
		switch (this.props.state.source) {

			case "url":
				return (this.renderPlaylist(this.props.state.url.songlist));
			case "library":
				switch (this.props.state.library.state) {
					case "playlist":
						if (!this.props.state.library.playlistSonglist) {
							if (this.props.state.library.playlistList)
								this.getPlaylist(this.props.state.library.playlistList.items[this.props.state.library.selectedPlaylist]);
							return (
								<h3 className="main-section__status-message">
									Loading songs...
								</h3>
							);
						}
						return this.renderPlaylist(this.props.state.library.playlistSonglist);
					case "album":
						if (!this.props.state.library.albumSonglist) {
							if (this.props.state.library.albumList)
								this.getAlbum(this.props.state.library.albumList.items[this.props.state.library.selectedAlbum].album.id);
							return (
								<h3 className="main-section__status-message">
									Loading songs...
								</h3>
							);
						}
						return this.renderPlaylist(this.props.state.library.albumSonglist);
					case "songs":
						if (!this.props.state.library.songlist) {
							this.getSavedSongs();
							return (
								<h3 className="main-section__status-message">
									Loading songs...
								</h3>
							);
						}
						return this.renderPlaylist(this.props.state.library.songlist);
				}
			default:
				return (
					<h3>Undefined</h3>
				);
		}
	}
}
