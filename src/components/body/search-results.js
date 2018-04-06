import React from 'react';

class SearchResults extends React.Component {
  render() {
    var results = this.props.searchResults.map((result, index) => {
      var categories = result.categories.map((category, index) => {
        var last = result.categories.length - 1;

        if (last === 1) {
          if (index === 0) {
            return(
              <span key={index.toString()}>{category.title} &bull; </span>
            );
          } else {
            return(
              <span key={index.toString()}>{category.title}</span>
            );
          }
        } else if (index === last || index === 0) {
          return(
            <span key={index.toString()}>{category.title}</span>
          );
        } else {
          return(
            <span key={index.toString()}> &bull; {category.title} &bull; </span>
          );
        }
      });
      /*var starRating = () => {
        var rating = [];
        for (var i = 0; i < result.rating; i++) {
          if (result.rating - i > 1) {
            rating.push('full');
          } else {
            rating.push('half');
          }
        }
        rating = rating.map((star) => {
          if (star === 'full') {
            return(
              <svg style={{backgroundColor: "blue"}} fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            );
          } else if (star === 'half') {
            return(
              <svg style={{backgroundColor: "blue"}} fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs><path d="M0 0h24v24H0V0z" id="a"/></defs>
                <clipPath id="b"><use overflow="visible" xlinkHref="#a"/></clipPath>
                <path clipPath="url(#b)" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
              </svg>
            );
          } else return null;
        });
        return(<div>{rating}</div>);
      };*/
      var lgPriceAndRating = () => {
        return (
          <div className="d-none d-sm-block">Price: {result.price}, Rating: {result.rating}</div>
        );
      };
      var smPriceAndRating = () => {
        return (
          <div className="d-block d-sm-none justify-content-center">
            <div className="d-flex justify-content-center">Price: {result.price}</div>
            <div className="d-flex justify-content-center">Rating: {result.rating}</div>
          </div>
        );
      };
      var rsvpLgClass = `index_${index} btn btn-sm btn-success mx-1`;
      var rsvpSmClass = `index_${index} btn btn-sm btn-success btn-block`;
      var mapLgClass = `index_${index} btn btn-sm btn-info`;
      var mapSmClass = `index_${index} btn btn-sm btn-info btn-block`;
      if (this.props.user) {
        var rsvpDataId = 'rsvp';
      } else rsvpDataId = 'createAccount';

      var attendingLg = () => {
        if (result.attenders > 0) {
          return(
            <div className="d-none d-sm-block mb-1">
              <i>{result.attenders} attending soon</i>
            </div>
          );
        } else return null;
      };
      var attendingSm = () => {
        if (result.attenders > 0) {
          return(
            <div className="d-block d-sm-none justify-content-center">
              <div className="d-flex justify-content-center"><i>{result.attenders} attending soon</i></div>
            </div>
          );
        } else return null;
      };

      return(
        <div className="card my-2" key={index.toString()}>
          <div className="card-body">
            <div className="d-sm-flex">

              <div className="d-flex justify-content-center justify-content-sm-start mr-sm-3">
                <a href={result.url} target="_blank">
                  <div style={{width: 90, height: 90}}>
                    <img
                      src={result.image_url}
                      style={{borderRadius: "4px"}}
                      width="90"
                      height="90"
                      alt=""/>
                    </div>
                  </a>
              </div>

              <div className="d-flex flex-column">
                <div className="d-flex justify-content-center justify-content-sm-start">
                  <h5 className="m-0 p-0">{result.name}</h5>
                </div>

                {/*<div style={{backgroundColor: "green"}} className="d-flex justify-content-center justify-content-sm-start align-items-center">
                  {starRating()}
                </div>*/}

                <div className="d-flex justify-content-center justify-content-sm-start">
                  {lgPriceAndRating()}
                  {smPriceAndRating()}
                </div>
                <div className="d-none d-sm-block">
                  <p className="card-text">{categories}</p>
                </div>
                {attendingLg()}
                {attendingSm()}
                <div className="d-none d-sm-flex mt-auto">
                  <a href={result.url} target="_blank" className="btn btn-sm btn-success">View Site</a>
                  <button onClick={this.props.openModal.bind(this)} data-id={rsvpDataId} className={rsvpLgClass}>RSVP</button>
                </div>
              </div>

              <div className="d-flex flex-column ml-sm-auto">
                <div className="justify-content-center justify-content-sm-end">
                  <div className="d-none d-sm-flex justify-content-end">{result.location.display_address[0]}</div>
                  <div className="d-none d-sm-flex justify-content-end">{result.location.display_address[1]}</div>
                  <div className="d-flex justify-content-center d-sm-none">{result.location.city}</div>
                </div>
                <div className="d-flex justify-content-center justify-content-sm-end mb-1">{result.display_phone}</div>
                <div className="d-none d-sm-block mt-auto ml-auto">
                  <button onClick={this.props.openModal.bind(this)} data-id="maps" className={mapLgClass}>View Map</button>
                </div>
                <div className="d-block d-sm-none">
                  <a href={result.url} target="_blank" className="btn btn-sm btn-success btn-block">View Site</a>
                  <button onClick={this.props.openModal.bind(this)} data-id={rsvpDataId} className={rsvpSmClass}>RSVP</button>
                  <button onClick={this.props.openModal.bind(this)} data-id="maps" className={mapSmClass}>View Map</button>
                  <a href={`tel:${result.phone}`} className="btn btn-sm btn-info btn-block">Call</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    });
    var pageButtons = () => {
      if (this.props.searchPage.page === 1) {
        return(
          <div>
            <div className="d-flex flex-wrap justify-content-end">
              <button onClick={this.props.changeSearchPage.bind(this)} className="btn btn-sm btn-primary m-1">Next Page</button>
            </div>
          </div>
        );
      } else if (this.props.searchPage.page > 1) {
        return(
          <div>
            <div className="d-flex flex-wrap justify-content-end">
              <button onClick={this.props.changeSearchPage.bind(this)} className="btn btn-sm btn-primary m-1">Previous Page</button>
              <button onClick={this.props.changeSearchPage.bind(this)} className="btn btn-sm btn-primary m-1">Next Page</button>
            </div>
          </div>
        );
      }
    };
    return(
      <div>
        {results}
        {pageButtons()}
      </div>
    );
  }
}

export default SearchResults;
