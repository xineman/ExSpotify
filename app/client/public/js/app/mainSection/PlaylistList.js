import {refreshToken, hasMore} from '../../utilities.js';
import CustomScroll from 'react-custom-scroll';
import InfiniteScroll from 'react-infinite-scroller';
export default class PlaylistList extends React.Component {
	constructor() {
		super();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.state.source == this.props.state.source && nextProps.state.library.state == this.props.state.library.state) {
			switch (this.props.state.library.state) {
				case "playlist":
					if (JSON.stringify(nextProps.state.library.playlistList)==JSON.stringify(this.props.state.library.playlistList))
						return false;
					break;
				case "album":
					if (JSON.stringify(nextProps.state.library.albumList)==JSON.stringify(this.props.state.library.albumList))
						return false;
					break;
			}
		}
		return true;
	}
	componentDidMount() {
		this.loadSelection();
	}

	componentDidUpdate() {
		this.loadSelection();
	}

	loadSelection() {
		var lists = document.querySelectorAll('.main-section__playlist-summary:not(.loader)');
		var selection = this.props.state.selectionSet[this.props.state.library.state];
		for (let s of selection) {
			if (s.whole) lists[s.index].childNodes[2].checked = true;
		}
	}
	getUserPlaylists(isAppend) {
		$.ajax({
			url: isAppend?this.props.state.library.playlistList.next:`https://api.spotify.com/v1/me/playlists`,
			headers: {
				'Authorization': 'Bearer ' + this.props.token
			}
		}).done((list) => {
			this.props.setPlaylistList(list, isAppend);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getUserPlaylists(isAppend));
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}

	getUserAlbums(isAppend) {
		$.ajax({
			url: isAppend?this.props.state.library.albumList.next:`https://api.spotify.com/v1/me/albums`,
			headers: {
				'Authorization': 'Bearer ' + this.props.token
			}
		}).done((list) => {
			this.props.setAlbumList(list, isAppend);
		}).fail((xhr, status, errorThrown) => {
			refreshToken(() => this.getUserAlbums(isAppend));
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	}
	playlistClick(event, index) {
		if (!event.target.classList.contains("main-section__playlists-checkbox")&& !event.target.classList.contains("main-section__playlists-checkbox-label")) {
			$('.main-section__playlist-summary').removeClass("main-section__playlist-summary_active");
			$(event.target).closest(".main-section__playlist-summary").addClass('main-section__playlist-summary_active');
			if (this.props.state.library.state == "playlist") {
				this.props.selectPlaylist(index);
			} else
				this.props.selectAlbum(index)
		} else {
			this.setSelection(event, index);
		}
	}
	setSelection(e,index) {
		if ($(e.target).parent().hasClass('main-section__playlist-summary_active'))
			$('.main-section__song-checkbox').prop("checked", e.target.checked);
		this.props.setSelection(this.props.state.library.state, {
			index: index,
			whole: e.target.checked
		});
	}


	parsePlaylist(playlist, isActive) {
		const index = this.props.state.library.playlistList.items.indexOf(playlist);
		return (
			<div key={playlist.id} className={"main-section__playlist-summary" + (isActive
				? " main-section__playlist-summary_active"
				: "")} onClick={(e) => this.playlistClick(e, index)}>
				<img className="main-section__playlist-cover" src={playlist.images.length
					? playlist.images[0].url
					: "img/album art.jpg"} alt="Album cover"/>
				<div className="main-section__playlist-text">
					<h3 className="main-section__playlist-name">{playlist.name}</h3>
					<h4 className="main-section__playlist-author">by {playlist.owner.id}</h4>
				</div>
				<input id={playlist.id} className="main-section__playlists-checkbox css-checkbox" type="checkbox"/>
				{/* value={this.getSelection(index)}  onChange={(e) => this.setSelection(e,index)}*/}
				<label className="main-section__playlists-checkbox-label css-label" htmlFor={playlist.id}></label>
			</div>
		);
	}

	renderList(playlistList) {
		var playlists = [];
		for (let playlist of playlistList.items) {
			if (playlistList.items.indexOf(playlist) == this.props.state.library.selectedPlaylist) {
				playlists.push(this.parsePlaylist(playlist, true));
			} else
				playlists.push(this.parsePlaylist(playlist));
			}
		return (
			// <CustomScroll heightRelativeToParent="100%" onScroll={() => console.log(document.getElementsByClassName('main-section__playlists-list')[0].scrollHeight)}>

				<aside ref="test" className="main-section__playlists-list">
					<InfiniteScroll
		        pageStart={0}
		        loadMore={()=>this.getUserPlaylists(true)}
		        hasMore={hasMore(this.props.state.library.playlistList)}
		        loader={<div className="loader">Loading ...</div>}
		        useWindow={false}
		    		>
						{playlists}
			    </InfiniteScroll>
				</aside>
			// </CustomScroll>
		)
	}
	parseAlbum(a, isActive) {
		const index = this.props.state.library.albumList.items.indexOf(a);
		let album = a.album;
		return (
			<div key={album.id} className={"main-section__playlist-summary" + (isActive
				? " main-section__playlist-summary_active"
				: "")} onClick={(e) => this.playlistClick(e, index)}>
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
			if (albumList.items.indexOf(album) == this.props.state.library.selectedAlbum) {
				albums.push(this.parseAlbum(album, true));
			} else
				albums.push(this.parseAlbum(album));
			}
		return (
			// <CustomScroll heightRelativeToParent="100%">
				<aside className="main-section__playlists-list">
					<InfiniteScroll
		        pageStart={0}
		        loadMore={()=>this.getUserAlbums(true)}
		        hasMore={hasMore(this.props.state.library.albumList)}
		        loader={<div className="loader">Loading ...</div>}
		        useWindow={false}
		    		>
						{albums}
			    </InfiniteScroll>
				</aside>
			// </CustomScroll>
		)
	}

	render() {
		console.log("PlaylistList render");
		// console.log(this.props.state.library);
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
				break;
		}

	}
}
