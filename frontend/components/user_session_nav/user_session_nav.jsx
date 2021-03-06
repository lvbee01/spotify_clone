import React from 'react';

class userSessionNav extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }


  render() {
    return (
      <div>
        <div className='user-session-nav'>
          <img className='current-user-avatar' src={this.currentUser.img_path}/>
          <h3>{this.currentUser.username}</h3>
          <button onClick={this.logout} className='button-mono sign-out-button'>
            <i className="fas fa-sign-out-alt fa-lg" id='sign-out-icon'></i>
          </button>
        </div>
      </div>
    );
  }

}

export default userSessionNav;
