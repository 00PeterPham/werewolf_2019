import React, { Component } from 'react';
import VillageScene from '../../components/VillageScene';
import Status from '../../components/Status';
import VillageList from '../../components/VillageList';
import Graveyard from '../../components/Graveyard';
import GraveyardList from '../../components/GraveyardList';
import DailyDeathMsg from '../../components/DailyDeathMsg';
import { refreshPageAt } from '../../constants/utils';
import { gameStartDate, refreshPageTime_morning, refreshPageTime_afternoon } from '../../constants/settings';
import './dashboard.css';

class Dashboard extends Component {
  state = {
    roles: [
      "aura seer",
      "bodyguard",
      "drunk",
      "hunter",
      "mayor",
      "seer",
      "villager",
      "minion",
      "sorceress",
      "werewolf"
    ],
    slackUsers: {},
    channelMembersID: {},
    channelMembersInfo: [], //
    villageMembersInfo: null,
    graveyardMembersInfo: [],
    memberNames: [],
    elapsedDays: 0,
  }
  autoScroll = (element) => {
    const el = document.querySelector(element);
    const elScrollHeight = el.scrollHeight;
    let scrollToValue = 0;

    setInterval(() => { 
      console.log('scrolling')
      console.log(scrollToValue);

      console.log(elScrollHeight);

      if(scrollToValue < elScrollHeight){
        scrollToValue += 200;
      }else {
        scrollToValue = 0
      }
      el.scrollTo({
        top: scrollToValue,
        behavior: 'smooth',
      });
    }, 10000);
      
  }
  getElapsedDays = async () => {
    const today = new Date(); 
    const startDate = new Date(gameStartDate); //"09/02/2019"  , gameStartDate
      
    // To calculate the time difference of two dates 
    const Difference_In_Time = today.getTime() - startDate.getTime(); 
    const elapsedDays = parseInt(Difference_In_Time / (1000 * 3600 * 24)); 

    this.setState({
      elapsedDays
    })
  }
  ///// Calls to werewolf DB
  //Get users from werewolf DB
  setVillageMembers = async () => {
    const werewolfDbEndpoint = `http://localhost:3001/api/users/`;
    const response = await fetch(werewolfDbEndpoint);
    const data = await response.json();
    const allUsers = data.data;

    console.log('allUsers from DB::');
    console.log(allUsers);

    //check for "alive": true
    const aliveList = allUsers.filter((user) => {
      return user.alive;
    })

    console.log('aliveList::');
    console.log(aliveList);

    //set state villageMembersInfo
    this.setState({
      villageMembersInfo: aliveList,
    })

  }
  setTheDead = async () => { ///TO DO: Move this to a file on the root similar to database.js and get chron job to run it everyday??
    const deathChannelID = "CNAQEQF35" //deathChannelSlackID; // Change to CNAQEQF35 (werewolf-2019-tldr) before deplpy
    const werewolf_tldr_endpoint = `https://slack.com/api/channels.history?token=${process.env.REACT_APP_API_KEY}&channel=${deathChannelID}&pretty=1`;
    const response = await fetch(werewolf_tldr_endpoint);
    const history = await response.json();
    let deathList, resurrectionList = [];

    console.log("HISTORY::");
    console.log(history);

    const deathMsgs = history.messages.filter((msg) => {
      const msgTextLowercase = msg.text.toLowerCase();
      return msgTextLowercase.includes("death:");
    })

    const resurrectionMsgs = history.messages.filter((msg) => {
      const msgTextLowercase = msg.text.toLowerCase();
      return msgTextLowercase.includes("resurrection:");
    })

    console.log('DEATH MSGS::');
    console.log(deathMsgs);

    console.log('resurrection MSGS::');
    console.log(resurrectionMsgs);

    if(deathMsgs.length > 0){
      deathList = deathMsgs.reverse().map((msg) => {
        const msgTextLowercase = msg.text.toLowerCase();
        const name = msgTextLowercase.match(/(?<=:\s+).*?(?=\s+was)/g);
        const email = `${name}@points.com`;
        console.log(`DEATH NAME: ${name}`);
        console.log(`DEATH Email: ${email}`);

        const getDeathRoleAfter_was_a = msgTextLowercase.match(/(?<=was a ).*/g);
        const getDeathRoleAfter_was_an = msgTextLowercase.match(/(?<=was an ).*/g);
        let role = null;

        if(getDeathRoleAfter_was_a){
          role = getDeathRoleAfter_was_a[0]; //gets role afer "was a"
        }else {
          role = getDeathRoleAfter_was_an[0]; //gets role afer "was an". ie: peter was an aura seer
        }

        //const msgTextArray = msgTextLowercase.split(" ");
        //const role = msgTextArray[msgTextArray.length - 1]; //Aura Seer not working, getting seer

        const timeOfDeath = msg.ts;
        console.log(`ROLE: ${role}`);

        return (
          {
            email,
            role,
            timeOfDeath,
          }
        )
      })
    
      console.log("DEATH LIST::");
      console.log(deathList);

      console.log("deathList[0]::");
      console.log(deathList[0]);

      if(Object.entries(deathList[0]).length !== 0 && deathList[0].constructor === Object){ //checks if obj is empty object. Cannot send empty object, mayn kill everyone
        const killEndpoint = `http://localhost:3001/api/users/edit/?action=kill`; //TO DO: create api for multi kill?
        const killResponse = await fetch(killEndpoint, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deathList),
        });
        const data = await killResponse.json();

        console.log("Death DATA::");
        console.log(data);
      }
    }else {
      deathList = [];
    }

    if(resurrectionMsgs.length > 0){
      resurrectionList = resurrectionMsgs.map((msg) => {
        const msgTextLowercase = msg.text.toLowerCase();
        const name = msgTextLowercase.match(/(?<=:\s+).*/g)[0];
        const email = `${name}@points.com`;
        console.log(`resurrection NAME: ${name}`);
        console.log(`resurrection Email: ${email}`);

        return (
          {
            email,
            timeOfDeath: "0",
          }
        )
      })

      console.log("resurrectionList::");
      console.log(resurrectionList);

      if(Object.entries(resurrectionList[0]).length !== 0 && resurrectionList[0].constructor === Object){ //checks if obj is empty object. Cannot send empty object, mayn kill everyone
        const unkillEndpoint = `http://localhost:3001/api/users/edit/?action=unkill`; //TO DO: create api for multi kill?
        const unkillResponse = await fetch(unkillEndpoint, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resurrectionList),
        });
        const data = await unkillResponse.json();

        console.log("resurrection DATA::");
        console.log(data);
      }
    }else {
      resurrectionList = [];
    }
  }
  getGraveyard = async () => {
    //Get all dead people
    const graveyardEndpoint = `http://localhost:3001/api/users/graveyard`;
    const response = await fetch(graveyardEndpoint);
    const deadPplInfo = await response.json()
    const graveyardMembersInfo = [];

    console.log("getGraveYard::")
    console.log(deadPplInfo);

    deadPplInfo.data.map((deadPerson) => {
      const id = deadPerson._id;
      const { name, role, timeOfDeath } = deadPerson;
      graveyardMembersInfo.push(
        {
          id,
          name,
          role,
          timeOfDeath,
        }
      )
      return true; //Not required, added to solve console warning
    })

    this.setState({
      graveyardMembersInfo
    })
  }

  componentDidMount = async () => {
    this.getElapsedDays();
    refreshPageAt(refreshPageTime_morning);
    refreshPageAt(refreshPageTime_afternoon);
    await this.setTheDead();
    await this.getGraveyard();
    await this.setVillageMembers();

    if(process.env.REACT_APP_TV){ //only builds for "tv" -> "build:tv" for /werewolf_2019_tv
      this.autoScroll('.villageList'); 
      this.autoScroll('.graveyardList'); 
    }
  }

  render () {
    const { roles, channelMembersInfo, villageMembersInfo, graveyardMembersInfo, elapsedDays } = this.state;

    return (
      <>
        {
          villageMembersInfo ?
            <div className="dashboard">
              {console.log('STATE::')}
              {console.log(this.state)}

              {console.log('villageMembersInfo::')}
              {console.log(villageMembersInfo)}

              {console.log('graveyardMembersInfo::')}
              {console.log(graveyardMembersInfo)}

              <DailyDeathMsg elapsedDays={ elapsedDays } graveyardMembersInfo={ graveyardMembersInfo } />
              <VillageScene villageMembersInfo={ villageMembersInfo } />
              <Status elapsedDays={ elapsedDays } alive={ villageMembersInfo.length } deceased={ graveyardMembersInfo.length } />
              <VillageList villageMembersInfo={ villageMembersInfo } />
              <Graveyard channelMembersInfo= { channelMembersInfo } graveyardMembersInfo={ graveyardMembersInfo } />
              <GraveyardList roles={ roles } graveyardMembersInfo={ graveyardMembersInfo } />
            </div>
          : null
        }
      </>
    )
  }
}

export default Dashboard;