import React from 'react';

import CreateAccount from './create-account';
import LogIn from './log-in';
import RSVP from './rsvp';
import Maps from './maps';

class Modals extends React.Component {
  render() {
    return(
      <div>
        {this.props.modals.createAccount ?
          <CreateAccount
            closeModal={this.props.closeModal}
            createAccountSubmit={this.props.createAccountSubmit}
            createAccountForm={this.props.createAccountForm}
            createAccountChange={this.props.createAccountChange}/>
        : null}
        {this.props.modals.logIn ?
          <LogIn
            closeModal={this.props.closeModal}
            logInSubmit={this.props.logInSubmit}
            logInForm={this.props.logInForm}
            logInChange={this.props.logInChange}/>
        : null}
        {this.props.modals.rsvp ?
          <RSVP
            handleDayClick={this.props.handleDayClick}
            closeModal={this.props.closeModal}
            calendarForm={this.props.calendarForm}
            rsvp={this.props.rsvp}/>
        : null}
        {this.props.modals.maps ?
          <Maps
            closeModal={this.props.closeModal}
            chosenEvent={this.props.chosenEvent}/>
        : null}
      </div>
    );
  }
};

export default Modals;
