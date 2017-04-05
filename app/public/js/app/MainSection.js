import {getCookie, refreshToken} from '../utilities.js';
import MainHeader from './mainSection/MainHeader.js';
import SongList from './mainSection/SongList.js';
import PlaylistList from './mainSection/PlaylistList.js';

export default class MainSection extends React.Component {
    constructor() {
        super();

        this.ajaxRequest = null;
        this.state = {
            source: "library",
            library: {
                state: "playlist",
                songlist: null,
                playlistList: null,
                albumList: null,
                playlistSonglist: null,
                albumSonglist: null,
                selectedPlaylist: null,
                selectedAlbum: null
            },
            popular: {
                state: "intro",
                songlist: null
            },
            url: {
                state: "intro", //states: intro, loading, playlist
                songlist: null
            }
        }
    }

    componentWillMount() {
        if (this.props.signedIn) {
            this.changeSource(null, "choose-library");
        } else {
            this.changeSource(null, "choose-url");
        }
    }
    //Source can be provided either by event object or string
    changeSource(event, source) {
        let src = source;
        if (!src) {
            src = event.target.id;
        }
        if (event)
            $(event.target).parents('.dropdown-content').removeClass('dropdown-content_active');
        switch (src) {
            case "choose-library":
                {
                    this.setState({source: "library"});
                    break;
                }
            case "choose-popular":
                {
                    this.setState({source: "popular"});
                    break;
                }
            case "choose-url":
                this.setState({source: "url"});
                break;
            default:
        }

    }

    changeUrl() {
        this.setState({
            url: {
                state: "intro"
            }
        });
    }

    selectLibrarySource(source) {
        this.setState({library: Object.assign({}, this.state.library, {state: source})});
    }

    setPlaylistList(list, isAppend) {
        if (isAppend)
            this.setState({library: Object.assign({}, this.state.library, {
                    playlistList: Object.assign({}, this.state.library.playlistList, {items: [...this.state.library.playlistList.items, ...list.items], next: list.next})
                })});
        else
            this.setState({library: Object.assign({}, this.state.library, {
                    playlistList: list,
                    selectedPlaylist: 0
                })});
        }

    setAlbumList(list) {
        this.setState({library: Object.assign({}, this.state.library, {
                albumList: list,
                selectedAlbum: 0
            })});
    }

    setPlaylistSonglist(list, isAppend) {
			if (isAppend) {
				this.setState({library: Object.assign({}, this.state.library, {
					playlistSonglist: Object.assign({}, this.state.library.playlistSonglist, {items: [...this.state.library.playlistSonglist.items, ...list.items], next: list.next})
				})});
			} else {
				this.setState({library: Object.assign({}, this.state.library, {playlistSonglist: list})});
			}
    }

		setAlbumSonglist(list, isAppend) {
			if (isAppend) {
				this.setState({library: Object.assign({}, this.state.library, {
					albumSonglist: Object.assign({}, this.state.library.albumSonglist, {items: [...this.state.library.albumSonglist.items, ...list.items], next: list.next})
				})});
			} else {
				this.setState({library: Object.assign({}, this.state.library, {albumSonglist: list})});
			}
    }

		setSavedSonglist(list, isAppend) {
			if (isAppend) {
				this.setState({library: Object.assign({}, this.state.library, {
					songlist: Object.assign({}, this.state.library.songlist, {items: [...this.state.library.songlist.items, ...list.items], next: list.next})
				})});
			} else {
				this.setState({library: Object.assign({}, this.state.library, {songlist: list})});
			}
    }

    selectPlaylist(index) {
        this.setState({library: Object.assign({}, this.state.library, {
                playlistSonglist: null,
                selectedPlaylist: index
            })});
    }

    selectAlbum(index) {
        this.setState({library: Object.assign({}, this.state.library, {
                albumSonglist: null,
                selectedAlbum: index
            })});
    }

    parseUrl(event) {
        event.preventDefault();
        var url = $('input[name="playlist-url"]').val();
        this.setState({
            url: {
                state: "loading"
            }
        });
        if (url) {
            var userId = url.match(/user\/(.*)\/playlist/)[1];
            var playlistId = url.match(/playlist\/(.*)$/)[1];
            var apiUrl = "https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId;
            this.getPublicPlaylist(apiUrl);
        }
    }
    getPublicPlaylist(playlistUrl) {
        this.ajaxRequest = $.ajax({
            url: "/get-playlist",
            data: {
                playlistUrl: playlistUrl
            }
        }).done((playlist) => {
            console.log(playlist.name);
            this.setState({
                url: {
                    state: "playlist",
                    songlist: playlist
                }
            });
            // $(".content-header__url-playlist-name").text(playlist.name);
        }).fail((xhr, status, errorThrown) => {
            this.setState({
                url: {
                    state: "intro",
                    songlist: null
                }
            });
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });
    }

    showPlaylists() {
        if (this.props.signedIn)
            switch (this.state.source) {
                case "library":
                    switch (this.state.library.state) {
                        case "playlist":
                            return (<PlaylistList userId={this.props.userId} state={this.state} setPlaylistList={(list, isAppend) => this.setPlaylistList(list, isAppend)} selectPlaylist={(indexx) => this.selectPlaylist(indexx)}/>);
                        case "album":
                            return (<PlaylistList state={this.state} setAlbumList={(list) => this.setAlbumList(list)} selectAlbum={(indexx) => this.selectAlbum(indexx)}/>);
                    }
                default:
            }
        return null;
    }

    showSongList() {
        if (!this.props.signedIn && this.state.source != "url")
            return (
                <h3 className="main-section__status-message">
                    You have to sign in
                </h3>
            );
        switch (this.state.source) {
            case "url":
                switch (this.state.url.state) {
                    case "intro":
                        return (
                            <h3 className="main-section__status-message">Insert playlist link into field above and click "Open"</h3>
                        );
                    case "loading":
                        return (
                            <h3 className="main-section__status-message">Loading from URL...</h3>
                        );
                    default:
                        return (<SongList state={this.state}/>);
                }
            case "library":
                switch (this.state.library.state) {
                    case "playlist":
                        return (<SongList userId={this.props.userId} setPlaylistSonglist={(list, isAppend) => this.setPlaylistSonglist(list, isAppend)} state={this.state}/>);
                    case "album":
                        return (<SongList userId={this.props.userId} setAlbumSonglist={(list, isAppend) => this.setAlbumSonglist(list, isAppend)} state={this.state}/>);
                    case "songs":
                        return (<SongList userId={this.props.userId} setSavedSonglist={(list, isAppend) => this.setSavedSonglist(list, isAppend)} state={this.state}/>);
                }
        }
    }

    render() {
        return (
            <main className="main">
                <MainHeader state={this.state} openUrlClick={(event) => this.parseUrl(event)} changeSource={(source) => this.changeSource(source)} changeUrl={() => this.changeUrl()} cancelRequest={() => this.ajaxRequest.abort()} selectLibrarySource={(s) => this.selectLibrarySource(s)}/>
                <section className="main-section container">
                    {this.showPlaylists()}
                    {this.showSongList()}
                </section>
            </main>
        );
    }
}
