import React from 'react';

class LogIn extends React.Component {
  keyPressSubmit = (e) => {
    if (e.key === "Enter") {
      this.props.logInSubmit();
    }
  };
  render() {
    var usernameInputClass = `form-control username ${this.props.logInForm.username.validity}`;
    var passwordInputClass = `form-control password ${this.props.logInForm.password.validity}`;
    return(
      <div className="custom-modal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Log In</h5>
              <button onClick={this.props.closeModal} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>
            <div className="custom-modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="logInUsernameInput">Username</label>
                  <input
                    onChange={this.props.logInChange.bind(this)}
                    value={this.props.logInForm.username.value}
                    onKeyPress={this.keyPressSubmit.bind(this)}
                    type="text"
                    className={usernameInputClass}
                  id="logInUsernameInput"
                  placeholder="Enter username"/>
                  <div className="invalid-feedback">{this.props.logInForm.username.feedback}</div>
                  <div className="valid-feedback">{this.props.logInForm.username.feedback}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="logInPasswordInput">Password</label>
                  <input
                    onChange={this.props.logInChange.bind(this)}
                    value={this.props.logInForm.password.value}
                    onKeyPress={this.keyPressSubmit.bind(this)}
                    type="password"
                    className={passwordInputClass}
                    id="logInPasswordInput"
                    placeholder="Enter password"/>
                  <div className="invalid-feedback">{this.props.logInForm.password.feedback}</div>
                  <div className="valid-feedback">Login Successful</div>
                </div>
              </form>
            </div>
            <div className="custom-modal-footer">
              <button onClick={this.props.logInSubmit.bind(this)} type="button" className="btn btn-success">Log In</button>
              <button onClick={this.props.closeModal} type="button" className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
