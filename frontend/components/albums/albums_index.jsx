import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import UserSessionNavContainer from '../user_session_nav/user_session_nav_container';

import AlbumIndexItem from './album_index_item';

class albumsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.hideSwitch = this.hideSwitch.bind(this);
    this.playBubble = this.playBubble.bind(this);
  }

  componentDidMount() {
    this.props.fetchAlbumsByIds(this.props.albums);
  }

  componentWillReceiveProps(newProps){
    if (newProps && newProps.location) {
      if (newProps.location.pathname !== this.props.location.pathname){
        {/*return window.scrollTo(0, 0);*/}
      }
    }
  }

  playBubble(playlistId){
    console.log(`now playing playlist ${playlistId}`);
  }

  hideSwitch(action, id) {
    let playButton = document.getElementById(`hidden-${id}`);
    let img = document.getElementById(id);

    if (action === 'show') {
      playButton.style.opacity = '1.0';
      playButton.style.color = '#282828'; // button color main
      img.style.borderColor = '#1bc156';
      img.style.opacity = '0.5';
      // img.style.filter = 'blur(3px);';
    } else {
      playButton.style.opacity = '0.0';
      playButton.style.color = '#ccc'; // button color transitional
      // img.style.borderColor = '#ddd';
      img.style.borderColor = '#fff';
      img.style.opacity = '1.0';
      // img.style.filter = 'blur(0px);';
    }
  }

  render() {
    if (!this.props.albums) {
      return null;
    }

    // debugger
    return (
      <section className='entity-index-container'>

        <header id='main-header'>
          <div id='header-search-parent'>
            <i className="fas fa-search fa-sm"></i>
            <input type='search' placeholder=" search" className="login-input" id='header-search'/>
          </div>

          <UserSessionNavContainer/>
        </header>

        <h1>Albums</h1>
        <br/>
        <ul className='entity-index'>
          {
            <AlbumIndexItem albums={this.props.albums}/>
          }
        </ul>
      </section>
    );
  }
}


export default albumsIndex;
