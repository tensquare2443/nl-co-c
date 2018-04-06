import React from 'react';

class CreateAccount extends React.Component {
  keyPressSubmit = (e) => {
    if (e.key === "Enter") {
      this.props.createAccountSubmit();
    }
  };
  render() {
    var usernameInputClass = `form-control username ${this.props.createAccountForm.username.validity}`;
    var passwordInputClass = `form-control password ${this.props.createAccountForm.password.validity}`;
    return(
      <div className="custom-modal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Create Account</h5>
              <button onClick={this.props.closeModal} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>
            <div className="custom-modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="createAccountUsernameInput">Username</label>
                  <input
                    onChange={this.props.createAccountChange.bind(this)}
                    value={this.props.createAccountForm.username.value}
                    onKeyPress={this.keyPressSubmit.bind(this)}
                    type="text"
                    className={usernameInputClass}
                    id="createAccountUsernameInput"
                    placeholder="Enter username"/>
                  <div className="invalid-feedback">{this.props.createAccountForm.username.feedback}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="createAccountPasswordInput">Password</label>
                  <input
                    onChange={this.props.createAccountChange.bind(this)}
                    value={this.props.createAccountForm.password.value}
                    onKeyPress={this.keyPressSubmit.bind(this)}
                    type="password" className={passwordInputClass}
                    id="createAccountPasswordInput"
                    placeholder="Enter password"/>
                  <div className="invalid-feedback">{this.props.createAccountForm.password.feedback}</div>
                  <div className="valid-feedback">{this.props.createAccountForm.password.feedback}</div>
                </div>
              </form>
            </div>
            <div className="custom-modal-footer">
              <button onClick={this.props.createAccountSubmit.bind(this)} type="button" className="btn btn-success">Create</button>
              <button onClick={this.props.closeModal} type="button" className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
