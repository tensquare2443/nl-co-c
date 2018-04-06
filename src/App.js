//must do browser/other local storage.

import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

import Body from './components/body/index';
import TopNav from './components/top-nav';
import Modals from './components/modals/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchForm: {
        location: {
          value: '',
          validity: '',
          feedback: ''
        }
      },
      search: true,
      searchResults: false,
      searchPage: {
        page: 1,
        results: "1-20"
      },
      viewProfile: false,
      profile: false,
      modal: false,
      modals: {
        logIn: false,
        createAccount: false,
        rsvp: false,
        maps: false
      },
      logInForm: {
        username: {
          value: '',
          validity: '',
          feedback: ''
        },
        password: {
          value: '',
          validity: '',
          feedback: ''
        }
      },
      createAccountForm: {
        username: {
          value: '',
          validity: '',
          feedback: ''
        },
        password: {
          value: '',
          validity: '',
          feedback: ''
        }
      },
      user: false,
      calendarForm: {
        date: '',
        validity: '',
        feedback: ''
      },
      chosenEvent: false
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('nlcoUser')) {
      alert(sessionStorage.getItem('nlcoUser'));
      alert(JSON.stringify(sessionStorage.getItem('nlcoUser')));
      // this.setState()
    }
  }

  notGoing = (e) => {
    var index = e.currentTarget.dataset.id;
    var profile = JSON.parse(JSON.stringify(this.state.profile));
    var user = JSON.parse(JSON.stringify(this.state.user));

    if (e.currentTarget.innerText === "I'm Going Again") {
      delete profile[index].notGoing;
      this.setState({profile});
      return this.rsvp(profile[index].id, profile[index].date);
    }

    profile[index].notGoing = true;
    user.attending = user.attending.filter((occasion) => {
      if (occasion.date !== profile[index].date || occasion.name !== profile[index].id) {
        return occasion;
      };
    });
    var data = {
      user: {
        _id: user._id,
        attending: user.attending
      },
      occasion: {
        name: profile[index].id,
        date: profile[index].date
      }
    };
    this.setState({profile});
    this.setState({user});
    axios.post(
      `https://nl-co-s-16.herokuapp.com/attend/remove`,
      data,
      {headers: {'x-auth': this.state.user.tokens[0].token}}
    ).then((response) => {

    }).catch((e) => console.log(e));
  };

  viewProfile = () => {
    var params = `_id=${this.state.user._id}`;

    axios.get(`https://nl-co-s-16.herokuapp.com/user/view?${params}`, {
      headers: {
        'x-auth': this.state.user.tokens[0].token
      }
    }).then((response) => {
      if (!response.data || !Array.isArray(response.data)) {
        var profile = response.data.msg;
      } else {
        profile = response.data;
      }

      this.setState({profile});
      this.setState({searchResults: false});
      this.setState({search: false});
      this.setState({
        searchPage: {
          page: 1,
          results: "1-20"
        }
      });
    }).catch((e) => console.log(e));
  };

  handleDayClick = (day, { selected }) => {
    var date = moment(day).format('M/D/YYYY');
    if (date === this.state.calendarForm.date) {
      date = '';
    }
    var calendarForm = {
      date,
      validity: '',
      feedback: ''
    };

    this.setState({calendarForm});
  }

  rsvp = (exName, exDate) => {
    if (this.state.calendarForm.date.length === 0 && !exName && !exDate) {return;}
    var userId = this.state.user._id;
    var attending = JSON.parse(JSON.stringify(this.state.user.attending));

    if (exName && exDate) {
      var businessId = exName;
      var date = exDate;
    } else {
      businessId = this.state.chosenEvent.id;
      date = this.state.calendarForm.date;
    }

    attending.push({name: businessId, date: date});

    var tokens = this.state.user.tokens;

    axios.post('https://nl-co-s-16.herokuapp.com/attend/add', {userId, attending}, {
      headers: {
        'x-auth': tokens[0].token
      }
    }).then((response) => {
      if (response.data.included) {
        //already attending event.
        return this.setState({
          calendarForm: {
            date: '',
            validity: 'is-invalid',
            feedback: 'Already attending event'
          }
        });
      }
      var user = _.pick(response.data.newUser, ['username', '_id', 'attending', 'tokens']);
      this.setState({user});

      if (exName && exDate) {return;}

      var searchResults = JSON.parse(JSON.stringify(this.state.searchResults));
      var occasion = response.data.occasionDoc;
      searchResults.forEach((result) => {
        if (result.id === occasion.name) {
          var push = false;
          if (result.attending) {
            result.attending.forEach((date, index) => {
              if (date.date === occasion.date) {
                date.attending++;
              } else if (index === result.attending.length - 1) {
                push = true;
              }
            });
            if (push === true) {
              result.attending.push({
                date: occasion.date,
                attending: 1
              });
            }
          }
        }
      });
      this.setState({searchResults});
      this.setState({
        calendarForm: {
          date: '',
          validity: 'is-valid',
          feedback: 'RSVP successful'
        }
      });
    }).catch((e) => {
      console.log(e);
    });
  };

  logOut = () => this.setState({user: false});
  createAccountChange = (e) => {
    var input = e.currentTarget.getAttribute("class").split(" ")[1];
    var value = e.currentTarget.value;
    var createAccountForm = JSON.parse(JSON.stringify(this.state.createAccountForm));

    createAccountForm[input].value = value;

    this.setState({createAccountForm});
  };
  logInChange = (e) => {
    var input = e.currentTarget.getAttribute("class").split(" ")[1];
    var value = e.currentTarget.value;
    var logInForm = JSON.parse(JSON.stringify(this.state.logInForm));

    logInForm[input].value = value;

    this.setState({logInForm});
  };
  createAccountSubmit = (e) => {
    // e.preventDefault();
    var createAccountForm = JSON.parse(JSON.stringify(this.state.createAccountForm));
    var username = createAccountForm.username.value;
    var password = createAccountForm.password.value;

    axios.post('https://nl-co-s-16.herokuapp.com/user/submit', {username, password}).then((response) => {
      if (response.data.error) {
        if (response.data.error.username) {
          createAccountForm.username.validity = 'is-invalid';
          createAccountForm.username.feedback = response.data.error.username;
        } else {
          createAccountForm.username.validity = '';
          createAccountForm.username.feedback = '';
        }
        if (response.data.error.password) {
          createAccountForm.password.validity = 'is-invalid';
          createAccountForm.password.feedback = response.data.error.password;
        } else {
          createAccountForm.password.validity = 'is-valid';
          createAccountForm.password.feedback = '';
        }
        return this.setState({createAccountForm});
      }

      var user = response.data;
      createAccountForm.username.validity = 'is-valid';
      createAccountForm.username.feedback = '';
      createAccountForm.password.validity = 'is-valid';
      createAccountForm.password.feedback = 'Account Created';

      this.setState({user});
      this.setState({createAccountForm});

      setTimeout(() => {
        createAccountForm.username.value = '';
        createAccountForm.username.validity = '';
        createAccountForm.username.feedback = '';
        createAccountForm.password.value = '';
        createAccountForm.password.validity = '';
        createAccountForm.password.feedback = '';
        this.setState({createAccountForm});
        this.closeModal();
      }, 750);

    }).catch((e) => {
      console.log('Client Err: ' + e);
    });
  };

  logInSubmit = (e) => {
    // e.preventDefault();
    var logInForm = JSON.parse(JSON.stringify(this.state.logInForm));
    var username = logInForm.username.value;
    var password = logInForm.password.value;

    axios.post('https://nl-co-s-16.herokuapp.com/user/login', {username, password}).then((response) => {
      if (response.data === "") {
        logInForm.username.validity = 'is-invalid';
        logInForm.password.validity = 'is-invalid';
        logInForm.password.feedback = 'Invalid username or password';
        return this.setState({logInForm});
      } else if (response.data.username && response.data.password) {
        var user = _.pick(response.data, ['username', '_id', 'attending', 'tokens']);
        this.setState({user});

        sessionStorage.setItem('nlcoUser', user);

        logInForm.username.validity = 'is-valid';
        logInForm.password.validity = 'is-valid';
        logInForm.password.feedback = 'Login successful';
        this.setState({logInForm});
        setTimeout(() => {
          this.closeModal();
        }, 500);
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  closeModal = () => {
    var modals = {};

    if (this.state.modals.logIn) {
      var logInForm = JSON.parse(JSON.stringify(this.state.logInForm));
      Object.keys(logInForm.username).forEach((val) => {
        logInForm.username[val] = '';
      });
      Object.keys(logInForm.password).forEach((val) => {
        logInForm.password[val] = '';
      });
      this.setState({logInForm});
    } else if (this.state.modals.createAccount) {
      var createAccountForm = JSON.parse(JSON.stringify(this.state.createAccountForm));
      Object.keys(createAccountForm.username).forEach((val) => {
        createAccountForm.username[val] = '';
      });
      Object.keys(createAccountForm.password).forEach((val) => {
        createAccountForm.password[val] = '';
      });
      this.setState({createAccountForm});
    } else if (this.state.modals.rsvp) {
      this.setState({
        calendarForm: {
          date: '',
          validity: '',
          feedback: ''
        }
      });
    }

    Object.keys(this.state.modals).forEach((modal) => {
      modals[modal] = false;
    });

    this.setState({modal: false});
    this.setState({modals});
  };

  openModal = (e) => {
    var modalToOpen = e.target.dataset.id;
    var modals = {};

    Object.keys(this.state.modals).forEach((modal) => {
      if (modal === modalToOpen) {
        modals[modal] = true;
      } else modals[modal] = false;
    });
    this.setState({modal: true});
    this.setState({modals});

    if (modalToOpen === 'rsvp' || modalToOpen === 'maps') {
      var index = e.target.getAttribute("class").split(" ")[0].split("_")[1];
      var chosenEvent = JSON.parse(JSON.stringify(this.state.searchResults[index]));
      this.setState({chosenEvent});
    }
  };

  goHome = () => {
    var searchForm = JSON.parse(JSON.stringify(this.state.searchForm));
    searchForm.location.value = '';
    searchForm.location.validity = '';
    searchForm.location.feedback = '';
    this.setState({searchForm});
    this.setState({searchResults: false});
    this.setState({
      searchPage: {
        page: 1,
        results: "1-20"
      }
    });
    this.setState({profile: false});
    this.setState({search: true});
  };

  searchFormLocationChange = (e) => {
    var searchForm = JSON.parse(JSON.stringify(this.state.searchForm));
    searchForm.location.value = e.currentTarget.value;
    this.setState({searchForm});
  };

  searchFormSubmit = (e, offset) => {
    if (e) {
      e.preventDefault();
    }

    var searchForm = JSON.parse(JSON.stringify(this.state.searchForm));
    var location = searchForm.location.value;

    if (location.length < 1) {
      searchForm.location.validity = 'is-invalid';
      searchForm.location.feedback = 'Must enter a location';
      this.setState({searchResults: false});
      this.setState({searchForm});
      return;
    }

    if (offset) {
      var params = `location=${location}&offset=${(offset.results.split("-")[0]/1) - 1}`;
    } else {
      params = `location=${location}`;
    }

    axios.get(`https://nl-co-s-16.herokuapp.com/search?${params}`).then((response) => {
      if (response.data.error && response.data.error.code  === 'LOCATION_NOT_FOUND') {
        searchForm.location.validity = 'is-invalid';
        searchForm.location.feedback = 'Location not found';
        this.setState({searchResults: false});
        this.setState({searchForm});
        return;
      }

      var searchResults = response.data.map((result) => {
        result = _.pick(result, [
          'id',
          'name',
          'image_url',
          'url',
          'review_count',
          'categories',
          'rating',
          'coordinates',
          'price',
          'location',
          'display_phone',
          'phone',
          'distance',
          'attenders'
        ]);
        //get number of people attending here.
        axios.post('https://nl-co-s-16.herokuapp.com/attend/view', {business: result.id}).then((response) => {
          if (response.data && Array.isArray(response.data) && response.data[0] && response.data[0].date) {
            result.attending = response.data;
          }
        }).catch((e) => {
          console.log(e);
        });
        return result;
      });

      if (searchForm.location.validity === 'is-invalid') {
        searchForm.location.validity = '';
        searchForm.location.feedback = '';
        this.setState({searchForm});
      }

      if (offset) {
        this.setState({searchPage: offset});
      }
      this.setState({searchResults});

    }).catch((e) => {
      console.log(e);
    });
  };

  changeSearchPage = (e) => {

    var action = e.currentTarget.innerText;
    var searchPage = Object.assign({}, this.state.searchPage);
    var results = searchPage.results.split("-");

    if (action === "Next Page") {
      searchPage.page++;
      results[0] = (results[0]/1) + 20;
      results[1] = (results[1]/1) + 20;
      searchPage.results = results.join("-");
    } else {
      searchPage.page--;
      results[0] = (results[0]/1) - 20;
      results[1] = (results[1]/1) - 20;
      searchPage.results = results.join("-");
    };

    this.searchFormSubmit(undefined, searchPage);
  };

  render() {
    return (
      <div className="container">
        <TopNav
          openModal={this.openModal}
          logOut={this.logOut}
          goHome={this.goHome}
          user={this.state.user}
          viewProfile={this.viewProfile}/>
        <Body
          search={this.state.search}
          searchResults={this.state.searchResults}
          searchPage={this.state.searchPage}
          changeSearchPage={this.changeSearchPage}
          profile={this.state.profile}
          searchFormLocationChange={this.searchFormLocationChange}
          searchFormSubmit={this.searchFormSubmit}
          searchForm={this.state.searchForm}
          rsvp={this.rsvp}
          openModal={this.openModal}
          user={this.state.user}
          notGoing={this.notGoing}/>
        {this.state.modal ?
          <Modals
            modals={this.state.modals}
            closeModal={this.closeModal}
            createAccountSubmit={this.createAccountSubmit}
            createAccountForm={this.state.createAccountForm}
            createAccountChange={this.createAccountChange}
            logInSubmit={this.logInSubmit}
            logInForm={this.state.logInForm}
            logInChange={this.logInChange}
            handleDayClick={this.handleDayClick}
            calendarForm={this.state.calendarForm}
            rsvp={this.rsvp}
            chosenEvent={this.state.chosenEvent}/>
        : null}
      </div>
    );
  }
}

export default App;
