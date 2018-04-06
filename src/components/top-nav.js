import React from 'react';

class TopNav extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
                <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </div>
            <div className="ml-1">
              Nightlife App
            </div>
          </div>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <div className="nav-item">
              <div onClick={this.props.goHome} className="nav-link top-nav-button">Home</div>
            </div>
          </div>
          {this.props.user ?
            <div className="d-block d-md-flex ml-auto">
              <div className="navbar-nav">
                <div className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle top-nav-button" id="navbarDropdown" role="button" data-toggle="dropdown">
                    {this.props.user.username}
                  </div>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div onClick={this.props.viewProfile} className="dropdown-item top-nav-button">Profile</div>
                    <div onClick={this.props.logOut} className="dropdown-item top-nav-button">Log Out</div>
                  </div>
                </div>
              </div>
            </div>
          : null}
          {this.props.user ? null :
            <div className="d-block d-md-flex ml-auto">
              <div className="navbar-nav">
                <div className="nav-item">
                  <div onClick={this.props.openModal.bind(this)} data-id="logIn" className="nav-link top-nav-button">Log In</div>
                </div>
              </div>
              <form className="form-inline">
                <button type="button" onClick={this.props.openModal.bind(this)} data-id="createAccount" className="btn btn-success top-nav-button">Create Account</button>
              </form>
            </div>
          }
        </div>
      </nav>
    );
  }
}

export default TopNav;
