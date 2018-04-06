import React from 'react';
import Search from './search';
import SearchResults from './search-results';
import Profile from './profile';

class Body extends React.Component {
  render() {
    return(
      <div>
        {this.props.search ?
          <Search
            searchForm={this.props.searchForm}
            searchFormSubmit={this.props.searchFormSubmit}
            searchFormLocationChange={this.props.searchFormLocationChange}/>
        : null}
        {this.props.searchResults ?
          <SearchResults
            openModal={this.props.openModal}
            rsvp={this.props.rsvp}
            searchResults={this.props.searchResults}
            user={this.props.user}
            searchPage={this.props.searchPage}
            changeSearchPage={this.props.changeSearchPage}/>
        : null}
        {this.props.profile ?
          <Profile
            user={this.props.user}
            profile={this.props.profile}
            openModal={this.props.openModal}
            notGoing={this.props.notGoing}/>
        : null}
      </div>
    );
  }
}

export default Body;
