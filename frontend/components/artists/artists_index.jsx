import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import UserSessionNavContainer from '../user_session_nav/user_session_nav_container';

import ArtistIndexItem from './artist_index_item';

class artistsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.hideSwitch = this.hideSwitch.bind(this);
    // this.playBubble = this.playBubble.bind(this);
  }

  //////////////////////////////////////////////////
  // Life Cycle
  //////////////////////////////////////////////////

  componentDidMount() {
    this.props.fetchUserArtists(this.currentUser.id);
  }

  componentWillReceiveProps(newProps){
    if (newProps && newProps.location) {
      if (newProps.location.pathname !== this.props.location.pathname){
        {/*return window.scrollTo(0, 0);*/}
      }
    }
  }

  //////////////////////////////////////////////////
  // playBubble
  //////////////////////////////////////////////////

  // playBubble(entityId){
  //   console.log(`now playing artist ${entityId}`);
  //   // this.props.fetchArtistAlbums(entityId);
  //   this.props.fetchArtistSongs(entityId);
  //   this.playAudio();
  // }

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

  //////////////////////////////////////////////////
  // Playback
  //////////////////////////////////////////////////

  playAudio() {
    if(this.props.audio.currentSong) {
      this.props.togglePlay();
    }
  }

  // pauseAudio() {
  //   if(this.props.audio.currentSong) {
  //     this.props.togglePlay();
  //   }
  // }

  //////////////////////////////////////////////////
  // Render
  //////////////////////////////////////////////////

  render() {
    if (!this.props.artists) {
      return null;
    }

    return (
      <section className='entity-index-container'>
        <h1>Artists</h1>
        <br/>
        <ul className='entity-index'>
          {
            <ArtistIndexItem
              artists={this.props.artists}
              allSongs={this.props.allSongs}
              audio={this.props.audio}
              fetchArtistSongs={this.props.fetchArtistSongs}
              fetchArtistSongsInterrupt={this.props.fetchArtistSongsInterrupt}
              fetchArtistAlbums={this.props.fetchArtistAlbums}
              queueSongsReplace={this.props.queueSongsReplace}
              togglePlay={this.props.togglePlay}/>
          }
        </ul>
      </section>
    );
  }
}


export default artistsIndex;
