import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class artistIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.hideSwitch = this.hideSwitch.bind(this);
    this.playBubble = this.playBubble.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  //////////////////////////////////////////////////
  // Life Cycle
  //////////////////////////////////////////////////

  componentDidMount(){
    if (this.props && this.props.fetchAlbumsByIds) {
      this.props.fetchAlbumsByIds(this.props.artists);
    }
  }

  //////////////////////////////////////////////////
  // playBubble
  //////////////////////////////////////////////////

  playBubble(entityId){
    console.log(`now playing artist ${entityId}`);
    let songs = Object.values(this.props.allSongs).filter(song => song.artist_id === entityId);
    this.props.queueSongsReplace(songs);
    setTimeout( () => this.playAudio(), 100 );


    // console.log(`now playing artist ${entityId}`);
    // this.props.fetchArtistSongs(entityId);
    // this.playAudio();
  }

  hideSwitch(action, id) {
    let playButton = document.getElementById(`hidden-${id}`);
    let img = document.getElementById(id);


    if (action === 'show') {
      // if (this.props.audio.currentSong && this.props.audio.currentSong.id === id) {
      //   playButton.classList.add("fa-pause-circle");
      //   playButton.classList.remove("fa-play-circle");
      // }



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



  // playbackButton(){
  //   if (true) {
  //     return <i
  //       className="far fa-play-circle fa-5x hidden"
  //       id={`hidden-${artist.id}`}
  //       style={{color: '#ccc'}}
  //       ></i>;
  //   } else {
  //     return <i
  //       className="far fa-pause-circle fa-5x hidden"
  //       id={`hidden-${artist.id}`}
  //       style={{color: '#ccc'}}
  //       ></i>;
  //   }
  //
  // }

  //////////////////////////////////////////////////
  // Playback
  //////////////////////////////////////////////////

  playAudio() {
    // if(this.props.audio.currentSong) {
    // }

    if(!this.props.audio.playing) { // just toggle once if nothing playing
      this.props.togglePlay();
    } else {                        //
      this.props.togglePlay();
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

    return (
      this.props.artists.map(artist => {

        let abbreviatedTitle = artist.name;
        if (abbreviatedTitle && abbreviatedTitle.length > 14) {
          abbreviatedTitle = `${abbreviatedTitle.slice(0, 10)}...`;
        }

        let randomAnimateSpeed = Math.floor(Math.random() * 5) + 1;

        return (

            <div className={`entity-index-item animated fadeIn`} id='speed-3' key={artist.id}>

              <div className='entity-index-item-hide'
                onMouseOver={() => this.hideSwitch('show', artist.id)}
                onMouseOut={() => this.hideSwitch('hide', artist.id)}>

                <button className='playlist-ball-play-button-big big-scale' onClick={() => this.playBubble(artist.id)}>
                  <i
                    className="far fa-play-circle fa-5x hidden"
                    id={`hidden-${artist.id}`}
                    style={{color: '#ccc'}}
                    ></i>
                </button>

                <Link to={`/library/artists/${artist.id}`}>
                  <img className='entity-index-item-img index-img-big'
                       src={artist.img_path} id={artist.id}
                  />
                </Link>

              </div>

              <Link to={`/library/artists/${artist.id}`} className='entity-index-item-title'>
                <h3 className='bubble-title'>{abbreviatedTitle}</h3>
              </Link>

              {/*<h3 className='entity-index-item-followcount'>
                {Math.floor(Math.random()*10000)} Followers
              </h3>*/}

            </div>

        );
      })
    );
  }
}

export default artistIndexItem;
