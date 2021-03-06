import React from 'react';
import Modal from 'react-modal';
import { Link, withRouter, Redirect } from 'react-router-dom';

import PlaylistModalContainer from './playlist/playlist_modal_container';


class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.playlists = this.props.playlists;
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {clickedNewPlaylist: false};
  }

  componentDidMount() {
    // debugger
    this.props.fetchPlaylists(this.currentUser.id);
    // this.props.fetchUserArtists(this.currentUser.id); // all artists!
    this.props.fetchArtistsByIds(this.currentUser.artists_ids);

    // this.props.fetchArtistAlbums(this.currentUser.id);
    this.props.fetchAlbumsByIds(this.currentUser.albums_ids);
    this.props.fetchUserAlbums(this.currentUser.id);

    this.props.fetchAllSongs();
  }

  // componentWillReceiveProps(newProps) {
  // }

  modalToggle() {
    this.setState({clickedNewPlaylist: !this.state.clickedNewPlaylist});
  }

  render() {
    return (
      <div className="sidenav">
        <div className="sidenav-content">

          <a className='sidebar-title' >YOUR LIBRARY</a>
          <ul>
            {/*
              */}
              <a href="/#/search"><h3 className='sidebar-library-items'>Search</h3></a>
            <a href="/#/library/artists"><h3 className='sidebar-library-items'>Artists</h3></a>
            <a href="/#/library/albums"><h3 className='sidebar-library-items'>Albums</h3></a>
          </ul>

          <br/>
          <a className='sidebar-title'>PLAYLISTS</a>
          <div className='sidebar-playlists'>
            <ul>
              {
                this.props.playlists.map(playlist => {

                  let abbreviatedTitle = playlist.title;
                  if (abbreviatedTitle && abbreviatedTitle.length > 19) {
                    abbreviatedTitle = `${abbreviatedTitle.slice(0, 19)}...`;
                  }
                  return (
                  <div className='sidebar-playlist-index-item' key={playlist.id}>
                    <Link to={`/library/playlists/${playlist.id}`} className='entity-index-item-title'>
                      <h3>{abbreviatedTitle}</h3>
                    </Link>
                  </div>
                  );
                })
              }
            </ul>
          </div>
        </div>

        <div className='new-playlist'>
          <button onClick={() => this.modalToggle()} className='button-mono new-playlist'>
            + New Playlist
          </button>

          <PlaylistModalContainer formType='create' open={this.state.clickedNewPlaylist} modalToggle={this.modalToggle}/>
        </div>
      </div>

    );
  }
}

export default Sidebar;
