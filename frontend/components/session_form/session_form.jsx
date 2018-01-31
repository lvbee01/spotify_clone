import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = this.state;
    this.props.processForm(user);
  }

  handleDemoLogin(e) {
    e.preventDefault();
    const demoUser = {username: "guest_user25", password:"password123"};
    this.props.login(demoUser).then(this.props.history.push('/library/playlists'));
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup" className='green-link'>Sign Up</Link>;
    } else {
      return <Link to="/login" className='green-link'>Log In</Link>;
    }
  }

  renderErrors() {
    if (this.props.errors){
      return(
        <ul>
          {
            this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
            ))
          }
        </ul>
      );
    }

    return null;
  }

  render() {
    let formAlternative = this.props.formType !== 'login' ? 'Already have an account' : "Don't have an account";

    let emailInput = (
      <input type="text"
        placeholder="Email"
        value={this.state.email}
        onChange={this.update('email')}
        className="login-input"
      />
    );

    if(this.props.formType === 'login') {
      emailInput = null;
    }


    return (

      <div className="login-form-container">

        <div class="modal-header">
          <Link to="/" >
            <img src="./assets/Spotify_Logo_CMYK_Black.png"/>
          </Link>
        </div>



        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="login-form-inner-box">

            <div className='form-type-title'>
              <h3 >
                {this.props.formType}
              </h3>
            </div>

            {emailInput}

            <br/>


            <input type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.update('username')}
              className="login-input"
            />


            <br/>


            <input type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.update('password')}
              className="login-input"
            />


            <br/>

            <div className='button-container'>

              <button className="button-green" type="submit">{this.props.formType.toUpperCase()}</button>

              <button className="demo-user button-mono"
                      onClick={this.handleDemoLogin}>
                DEMO USER
              </button>
            </div>

            <div clasName='form-type-option'>
              <h3>{formAlternative}? {this.navLink()}</h3>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
