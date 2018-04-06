import React from 'react';

class Search extends React.Component {
  render() {
    var inputLocationClass = `form-control d-inline ${this.props.searchForm.location.validity}`;
    var inputLocationFeedback = this.props.searchForm.location.feedback;
    return(
      <div className="m-1">
        <form onSubmit={this.props.searchFormSubmit} className="m-1">
          <div className="form-group m-1">
            <label className="m-1" htmlFor="inputLocation1">Enter your location to view nightlife in your area:</label>
            <input
              onChange={this.props.searchFormLocationChange.bind(this)}
              value={this.props.searchForm.location.value}
              type="text"
              className={inputLocationClass}
              id="inputLocation1"
              placeholder="Enter location"
            />
            <div className="invalid-feedback m-1">{inputLocationFeedback}</div>
          </div>
          <button type="submit" className="btn btn-info m-1">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
