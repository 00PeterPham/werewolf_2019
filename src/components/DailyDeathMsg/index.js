import React, { Component } from 'react';
import './dailydeathmsg.css';
import { dailyDeathMsgCookieExpiry } from '../../constants/settings';

class DailyDeathMsg extends Component {
  state = {
    showDailyDeath: true, //default false
  }

  checkCookie = () => {
    // console.log("checkCookie Fired");
    const value = "; " + document.cookie;
    const parts = value.split("; seenDailyDeath=");

    if (parts.length === 2) {
      const seenDailyDeath = parts.pop().split(";").shift();

      // console.log("seenDailyDeath::");
      // console.log(seenDailyDeath);
    }else {
      // console.log("seenDailyDeath is false");

      this.setState(
        {
          showDailyDeath: true
        }
      )
    };
  }
  setCookie = () => {
    let expiryDate = new Date();
    const { hours, minutes, seconds } = dailyDeathMsgCookieExpiry
    expiryDate.setHours(hours, minutes, seconds); //Set time to 23,59 --> move to a global vars file
    document.cookie = `seenDailyDeath=true; expires=${expiryDate.toGMTString()}`; //expires=Thu, 27 Sept 2019 04:00:00 UTC

    // console.log("expiryDate::");
    // console.log(expiryDate);

    // console.log("document.cookie::");
    // console.log(document.cookie);
  }
  handleClick = () => {
    //Close Daily Death Msg
    this.setState(
      {
        showDailyDeath: false
      }
    )
  }

  componentDidMount = async () =>{
    //await this.checkCookie(); //Don't need these if msg automatically disappears after a while
    //await this.setCookie();
  }

  render () {
    const { elapsedDays, graveyardMembersInfo } = this.props;
    const { showDailyDeath } = this.state;
    let dailyDeadList = [];

    if(graveyardMembersInfo.length > 0){
      //Gets data of people that died today
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDate();
      //const currentYear = new Date().getUTCYear();
      const currentDate  = `${currentMonth}, ${currentDay}`;

      dailyDeadList = graveyardMembersInfo.map((deadPerson) => {
        const timeOfDeath = parseFloat(deadPerson.timeOfDeath);
        const timeOfDeathConversion = new Date(timeOfDeath*1000);
        const timeOfDeathMonth = timeOfDeathConversion.getMonth();
        const timeOfDeathDay = timeOfDeathConversion.getDate();
        const deathDate = `${timeOfDeathMonth}, ${timeOfDeathDay}`;

        // console.log("deadPerson::")
        // console.log(deadPerson.name);

        // console.log("currentDate::");
        // console.log(currentDate);

        // console.log("deathDate::");
        // console.log(deathDate);

        if(
            currentDay === timeOfDeathDay &&
            currentMonth === timeOfDeathMonth
          ){ //TODO: check month and year as well
          return (
            <div key={ timeOfDeath } className="daily-death-msg__container">
              <span className="daily-death-msg__deadPerson">{ deadPerson.name }</span> 
              &nbsp;has died. 
              <br/> 
              They were a&nbsp; 
              <span className="daily-death-msg__deadRole">{ deadPerson.role }</span>
            </div>
          )
        }
      })

      // Get current UTC date
      // Get timeOfDeath
      // Compare the 2 to see if they're in the same day
      // If they are populate a dailyDeadList array which contains a component to show a deadPerson <DeadPerson />
      // **UTC currentDate was ahead of deathDate, had to remove UTC

    }

    return (
      <>
      { 
        showDailyDeath ? //Set to showDailyDeath no !
        <div className="daily-death-msg" onClick={ this.handleClick }>
          <span className="daily-death-msg__close-x">x</span>
          <div className="daily-death-msg__text">
            <div className="daily-death-msg__day">Day: { elapsedDays }</div>
            { dailyDeadList }
          </div>
        </div>
        :
        null
      }
      </>
    )
  }
}

export default DailyDeathMsg;

