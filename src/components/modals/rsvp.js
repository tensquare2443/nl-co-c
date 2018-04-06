import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class RSVP extends React.Component {
  render() {
    var date;
    var dateArr;
    var dateFormatted;
    if (this.props.calendarForm.date.length > 0) {
      date = this.props.calendarForm.date;
      dateArr = date.split("/");
      dateFormatted = new Date(dateArr[2], dateArr[0]-1, dateArr[1]);
    } else {
      date = 'Please select a date';
      dateFormatted = undefined;
    }
    var calInputClass = `d-none form-control ${this.props.calendarForm.validity}`;
    var calFeedback = this.props.calendarForm.feedback;
    var feedback = () => {
      if (this.props.calendarForm.validity === 'is-valid') {
        return (<div className="d-flex justify-content-center valid-feedback">{calFeedback}</div>);
      } else if (this.props.calendarForm.validity === 'is-invalid') {
        return (<div className="d-flex justify-content-center invalid-feedback">{calFeedback}</div>);
      } else return null;
    };
    return(
      <div className="custom-modal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">RSVP</h5>
              <button onClick={this.props.closeModal} type="button" className="close">
                <span>&times;</span>
              </button>
            </div>

            <div className="custom-modal-body d-none d-sm-block">
              <div className="d-flex justify-content-center">
                <DayPicker
                  selectedDays={dateFormatted}
                  onDayClick={this.props.handleDayClick}/>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                  {date}
                </div>
                <div className="d-flex justify-content-center">
                  <input type="text"  className={calInputClass}/>
                  {feedback()}
                </div>

              </div>
            </div>
            <div className="custom-modal-body d-block d-sm-none">
              <div className="d-flex justify-content-center">
                <DayPicker
                containerProps={{style: {fontSize: "70%"}}}
                  selectedDays={dateFormatted}
                  onDayClick={this.props.handleDayClick}/>
              </div>
              <div className="d-flex justify-content-center">
                {date}
              </div>
            </div>

            <div className="custom-modal-footer">
              <button onClick={this.props.rsvp} type="button" className="btn btn-success">RSVP</button>
              <button onClick={this.props.closeModal} type="button" className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RSVP;
