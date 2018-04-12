import React from 'react';

class Maps extends React.Component {
  render() {
    var name = this.props.chosenEvent.name;
    var location = this.props.chosenEvent.location;
    alert(`name: ${name}`);
    alert(`location: ${JSON.stringify(location)}`);

    // var mapsKey = process.env.MAPS_KEY;
    var mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDsacJUcDmoFdw5wke0xllZPs-ZpAUwSz0&q=${name},${location}`;
    return(
      <div className="custom-modal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog custom-modal-lg" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">{this.props.chosenEvent.name}</h5>
              <button onClick={this.props.closeModal} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>

            <div className="mx-auto" style={{position: "relative", width: "90%", height: "0", paddingBottom: "53%"}}>
              <iframe
                title="map"
                frameBorder="0"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: "0",
                  top: "0"
                }}
                src={mapsUrl}
              ></iframe>
            </div>

            <div className="custom-modal-footer">
              <button onClick={this.props.closeModal} type="button" className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Maps;
