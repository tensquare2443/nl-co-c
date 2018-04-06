import React from 'react';

class Profile extends React.Component {
  render() {

    if (Array.isArray(this.props.profile)) {
      // var newResults = [];
      // for (var i = 0; i < this.props.profile.length; i++) {
      //   for (var j = 0; j < newResults.length; j++) {
      //     if (moment(this.props.profile[i].date) >= moment(newResults[j].date)) {
      //       //splice and break
      //       newResults.splice(j, 0, this.props.profile[i].date);
      //       break;
      //     }
      //   }
      //   if (i === 0) {
      //     newResults.push(this.props.profile[i].date);
      //   }
      // }
      // alert(JSON.stringify(newResults));
      var results = this.props.profile.map((result, index) => {
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
        var mapLgClass = `index_${index} btn btn-sm btn-info`;
        var mapSmClass = `index_${index} btn btn-sm btn-info btn-block`;
        var headingId = `heading_${index}`;
        var collapseId = `collapse_${index}`;
        var collapseHref = `#collapse_${index}`;
        var title = () => {
          return(
            <div className="card-header profile-event-header" role="tab" id={headingId} data-toggle="collapse" href={collapseHref}>
                <div className="collapsed d-flex justify-content-between align-items-center" role="button">
                  <div style={{fontSize: "140%"}}>{result.name}</div>
                  <div>{result.date}</div>
                </div>
            </div>
          );
        };
        var rsvpButtonLg = () => {
          if (result.notGoing) {
            return(
              <button onClick={this.props.notGoing.bind(this)} data-id={index} className="btn btn-sm btn-success mx-1">{"I'm Going Again"}</button>
            );
          } else {
            return(
              <button onClick={this.props.notGoing.bind(this)} data-id={index} className="btn btn-sm btn-danger mx-1">Not Going Anymore</button>
            );
          }
        };
        var rsvpButtonSm = () => {
          if (result.notGoing) {
            return(
              <button onClick={this.props.notGoing.bind(this)} data-id={index} className="btn btn-sm btn-success btn-block">{"I'm Going Again"}</button>
            );
          } else {
            return(
              <button onClick={this.props.notGoing.bind(this)} data-id={index} className="btn btn-sm btn-danger btn-block">Not Going Anymore</button>
            );
          }
        };
        return(
          <div className="card my-2" key={index.toString()}>
            {title()}
            <div id={collapseId} className="collapse" role="tabpanel" data-parent="#accordion">
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
                    <div className="d-flex justify-content-center justify-content-sm-start">
                      {lgPriceAndRating()}
                      {smPriceAndRating()}
                    </div>
                    <div className="d-none d-sm-block">
                      <p className="card-text">{categories}</p>
                    </div>
                    <div className="d-none d-sm-flex mt-auto">
                      <a href={result.url} target="_blank" className="btn btn-sm btn-success">View Site</a>
                      {rsvpButtonLg()}
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
                      {rsvpButtonSm()}
                      <button onClick={this.props.openModal.bind(this)} data-id="maps" className={mapSmClass}>View Map</button>
                      <a href={`tel:${result.phone}`} className="btn btn-sm btn-info btn-block">Call</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      });
    } else results = null;
    var profile = () => {
      if (Array.isArray(this.props.profile)) {
        return (
          <div>
            <div className="m-2">
              <h4>My Upcoming Events</h4>
            </div>
            <div id="accordion" role="tablist">
              {results}
            </div>
          </div>
        );
      } else {
        return(
          <div>
            <div className="m-2">
              <h4>{this.props.profile}</h4>
            </div>
          </div>
        );
      }
    };
    return(
      <div>
        {profile()}
      </div>
    );
  }
}

export default Profile;
