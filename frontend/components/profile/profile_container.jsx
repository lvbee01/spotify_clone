import { connect } from 'react-redux';
import profile from './profile';

import { fetchPlaylist } from '../../actions/playlists_actions';
import { logout } from '../../actions/session_actions';

let path = "/library/playlists/:playlistId";

const mapStateToProps = (state, ownProps) => ({
  songs: [1, 2, 3, 4, 5, 6, 7],
  playlists: state.entities.playlists,
  currentUser: state.session.currentUser
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPlaylist: (id) => dispatch(fetchPlaylist(id)),
  logout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(profile);
