import {refreshToken, hasMore} from '../../utilities.js';
import InfiniteScroll from 'react-infinite-scroller';
import CustomScroll from 'react-custom-scroll';
export default class SongList extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  componentDidUpdate() {
    var songs = document.querySelectorAll('.main-section__songs-row:not(.songs-loader)');
    var selection;
    if (this.props.state.source == "library" && (this.props.state.library.state == "playlist" || this.props.state.library.state == "album")) {
      //getting selection information for playlist or album
      switch (this.props.state.library.state) {
        case "playlist":
          listIndex = this.props.state.library.selectedPlaylist;
          break;
        case "album":
          listIndex = this.props.state.library.selectedAlbum;
          break;
      }
      var listIndex;
      selection = this.getSelection(this.props.state.library.state, listIndex);
    } else {
      //getting selection information for saved songs or for playlist, loaded from url.
      let source;
      if (this.props.state.source == "library") {
        source = "songs";
      } else {
        source = "url";
      }
      selection = this.props.state.selectionSet[source].length
        ? this.props.state.selectionSet[source][0]
        : null;
    }
    // console.log(selection);
    if (selection) {
      if (selection.whole) {
        $('.main-section__song-checkbox').prop("checked", true);
        // console.log("There is whole");
      } else if (selection.items) {
        // console.log("There are items");
        // console.log(selection.items);
        for (var i = 0; i < songs.length; i++) {
          if (~ selection.items.indexOf(i)) {
            songs[i + 1].firstChild.firstChild.checked = true;
            // console.log("Found " + i);
          }
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.state.source == this.props.state.source) {
      if (JSON.stringify(nextProps.state.library) == JSON.stringify(this.props.state.library)) {
        return false;
      }
    }
    return true;
  }
  getSelection(source, index) {
    return this.props.state.selectionSet[source].find(function(playlist) {
      return playlist.index == index;
    });
  }
  //TODO implement changing selectionSet for songs only
  songClickListener(e, index) {
    var listIndex;
    switch (this.props.state.library.state) {
      case "playlist":
        listIndex = this.props.state.library.selectedPlaylist;
        break;
      case "album":
        listIndex = this.props.state.library.selectedAlbum;
        break;
    }
    let checkbox = document.getElementsByClassName('main-section__songs-row')[++index].firstChild.firstChild;
    if (e.target.className != "main-section__song-checkbox") {
      checkbox.checked = !checkbox.checked;
    }
    let isWhole = this.isAllSongsChecked();
    if (this.props.state.source == "library" && (this.props.state.library.state == "playlist" || this.props.state.library.state == "album")) {
      document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = isWhole;
      if (isWhole) {
        this.props.setSelection(this.props.state.library.state, {
          index: listIndex,
          whole: true
        });
      } else {
        var selectedSongs = this.getSelectedSongsArray();
        this.props.setSelection(this.props.state.library.state, {
          index: listIndex,
          whole: false,
          items: selectedSongs.length
            ? selectedSongs
            : null
        });
      }
    } else {
      var selectedSongs = this.getSelectedSongsArray();
      var source;
      if (this.props.state.source == "library") {
        source = "songs";
      } else {
        source = "url";
      }
      this.props.setSelection(source, {
        items: selectedSongs.length
          ? selectedSongs
          : null
      });
    }
  }

  isAllSongsChecked() {
    var songs = document.getElementsByClassName('main-section__song-checkbox');
    for (let song of songs) {
      if (!song.checked)
        return false;
      }
    return true;
  }

  getSelectedSongsArray() {
    var songs = document.querySelectorAll('.main-section__songs-row:not(.songs-loader)');
    var indexes = [];
    for (var i = 1; i < songs.length; i++) {
      let checkbox = songs[i].firstChild.firstChild;
      if (checkbox.checked)
        indexes.push(i - 1);
      }
    return indexes;
  }

  getPlaylist(playlist, isAppend) {
    $.ajax({
      url: isAppend
        ? this.props.state.library.playlistSonglist.next
        : `https://api.spotify.com/v1/users/${playlist.owner.id}/playlists/${playlist.id}/tracks`,
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    }).done((songs) => {
      this.props.setPlaylistSonglist(songs, isAppend);
    }).fail((xhr, status, errorThrown) => {
      refreshToken(() => this.getPlaylist(playlist, isAppend));
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    });
  }

  getAlbum(albumId, isAppend) {
    $.ajax({
      url: isAppend
        ? this.props.state.library.albumSonglist.next
        : `https://api.spotify.com/v1/albums/${albumId}/tracks`
    }).done((songs) => {
      this.props.setAlbumSonglist(songs, isAppend);
    }).fail((xhr, status, errorThrown) => {
      refreshToken(() => this.getAlbum(albumId, isAppend));
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    });
  }

  getSavedSongs(isAppend) {
    $.ajax({
      url: isAppend
        ? this.props.state.library.songlist.next
        : `https://api.spotify.com/v1/me/tracks`,
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    }).done((songs) => {
      console.log(songs);
      this.props.setSavedSonglist(songs, isAppend);
    }).fail((xhr, status, errorThrown) => {
      refreshToken(() => this.getSavedSongs(isAppend));
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
  parseSong(item) {
    let song;
    var index;
    switch (this.props.state.source) {
      case "library":
        switch (this.props.state.library.state) {
          case "playlist":
            index = this.props.state.library.playlistSonglist.items.indexOf(item);
            song = item.track;
            break;
          case "album":
            index = this.props.state.library.albumSonglist.items.indexOf(item);
            song = item;
            break;
          case "songs":
            index = this.props.state.library.songlist.items.indexOf(item);
            song = item.track;
            break;
          default:
            song = item;
        }
        break;
      case "url":
        index = this.props.state.url.songlist.tracks.items.indexOf(item);
        song = item.track;
        break;
    }
    return (
      <li key={song.id} className="main-section__songs-row" onClick={(e) => this.songClickListener(e, index)}>
        <div className="main-section__songs-col main-section__check-col"><input id="input" className="main-section__song-checkbox" type="checkbox"/></div>
        <div className={"main-section__songs-col " + (this.props.state.library.state != "album"
          ? "main-section__song-col"
          : "main-section__song-wide-col")}>{song.name}</div>
        <div className="main-section__songs-col main-section__artist-col">{this.parseArtists(song)}</div>
        {this.props.state.library.state != "album" && <div className="main-section__songs-col main-section__album-col">{song.album.name}</div>}
        <div className="main-section__songs-col main-section__duration-col">{this.convertDuration(song.duration_ms)}</div>
      </li>
    );
  }
  loadMore() {
    switch (this.props.state.library.state) {
      case "playlist":
        this.getPlaylist(this.props.state.library.playlistList.items[this.props.state.library.selectedPlaylist], true);
        break;
      case "album":
        this.getAlbum(this.props.state.library.albumList.items[this.props.state.library.selectedAlbum].album.id, true);
        break;
      case "songs":
        this.getSavedSongs(true);
        break;
    }
  }
  hasMore() {
    switch (this.props.state.library.state) {
      case "playlist":
        return hasMore(this.props.state.library.playlistSonglist);
        break;
      case "album":
        return hasMore(this.props.state.library.albumSonglist);
        break;
      case "songs":
        return hasMore(this.props.state.library.songlist);
        break;
    }
  }
  renderPlaylist(playlist) {
    var songs = [];
    var list = playlist.items;
    if (this.props.state.source == "url")
      list = playlist.tracks.items;
    for (let song of list)
      songs.push(this.parseSong(song));
    return (
      <section className="main-section__songs">
        <div className="main-section__songs-header main-section__songs-row">
          <div className="main-section__songs-col main-section__check-col">C</div>
          <div className={"main-section__songs-col " + (this.props.state.library.state != "album"
            ? "main-section__song-col"
            : "main-section__song-wide-col")}>Song</div>
          <div className="main-section__songs-col main-section__artist-col">Artist</div>
          {this.props.state.library.state != "album" && <div className="main-section__songs-col main-section__album-col">Album</div>}
          <div className="main-section__songs-col main-section__duration-col">Duration</div>
        </div>
        <ul className="main-section__songs-list">
          <InfiniteScroll pageStart={0} loadMore={() => this.loadMore()} hasMore={this.hasMore()} loader={< div className = "songs-loader main-section__songs-row" > Loading ...</div>} useWindow={false}>
            {songs}
          </InfiniteScroll>
        </ul>
      </section>
    )
  }

  render() {
    console.log("SongList render!!!!!!!");
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
