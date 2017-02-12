import { getCookie, refreshToken } from '../../utilities.js';

export default class SongList extends React.Component {
	constructor() {
		super();
	}
	componentDidUpdate() {
		$('.main-section__song-row').click(function(event) {
			console.log(this);
			$(this).find('.main-section__song-checkbox').trigger('change');
		});
		$('.main-section__song-checkbox').change((event) => {
			if ($(event.target).is(':checked')) {
				$(event.target).prop('checked', false);
				if (this.props.state.source == "playlist")
					$('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', false);
				}
			else {
				$(event.target).prop("checked", true);
				if (this.props.state.source == "playlist" && this.isAllSongsChecked())
					$('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', true);
				}
			});
	}

	isAllSongsChecked() {
		var isTrue = true;
		var $songs = $('.main-section__song-checkbox');
		$songs.each(function() {
			if (!$(this).prop("checked")) {
				return isTrue = false;
			}
		})
		return isTrue;
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

	convertDuration(ms) {
		let mins = Math.floor(ms / 1000 / 60);
		let secs = ms % (1000 * 60);
		return `${mins}:${secs.toString().substring(0, 2)}`;
	}
	parseArtists(song) {
		var artists = "";
		for (let artist of song.track.artists) {
			artists += artist.name;
			if (song.track.artists.indexOf(artist) != song.track.artists.length - 1)
				artists += ", ";
			}
		return artists;
	}
	parseSong(song) {
		return (
			<tr key={song.track.id} className="main-section__song-row">
				<td><input id="input" className="main-section__song-checkbox" type="checkbox"/></td>
				<td>{song.track.name}</td>
				<td>{this.parseArtists(song)}</td>
				<td>{song.track.album.name}</td>
				<td>{this.convertDuration(song.track.duration_ms)}</td>
			</tr>
		);
	}
	renderPlaylist(playlist) {
		var songs = [];
		for (let song of playlist.tracks.items) {
			songs.push(this.parseSong(song));
		}
		return (
			<section className="main-section__songs data-simplebar">

				<table className="main-section__songs-list">
					<tr>
						<th className="main-section__check-col">Check</th>
						<th className="main-section__song-col">Song</th>
						<th className="main-section__artist-col">Artist</th>
						<th className="main-section__album-col">Album</th>
						<th className="main-section__duration-col">Duration</th>
					</tr>
					{songs}
				</table>
			</section>
		)
	}
	render() {
		switch (this.props.state.source) {

			case "url":
				return (this.renderPlaylist(this.props.state.url.songlist));
			case "library":
				switch (this.props.state.library.state) {
					case "playlist":
						if (!this.props.state.library.playlistSonglist){
							if (this.props.state.library.playlistList)
								this.getPlaylist(this.props.state.library.playlistList.items[this.props.state.library.selectedPlaylist]);
							return (
								<h3 className="main-section__status-message">
									Loading songs...
								</h3>
							);
						}
						else {
							return this.renderPlaylist(this.props.state.library.playlistSonglist);
						}
						break;
					case "album":
						return (
							<h3>Undefined album</h3>
						);
					case "songs":
						return (
							<h3>Undefined songs</h3>
						);
				}
			default:
				return (
					<h3>Undefined</h3>
				);
		}
	}
}
