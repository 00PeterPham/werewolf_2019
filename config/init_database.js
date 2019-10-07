'use strict';

const db_settings = require('./db_settings');

console.log('DB RUNNING');

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbname = db_settings.db_name;
const fetch = require("node-fetch");

//-- INITIALIZE DB with members from werewolf-2019 channel --
//Gets all users from Points
const getAllUsers = async () => {
  //Get all Points users
  const slackUsersEndPoint = `https://slack.com/api/users.list?token=${db_settings.api_key}&pretty=1`;
  const response = await fetch(slackUsersEndPoint);
  const data = await response.json();
  const slackUsers = data.members;

  // console.log("FROM database.js -- ALL USERS:")
  // console.log(slackUsers);

  return slackUsers;
}
//Gets member IDs from werewolf-2019 channel
const getMemberIDsFromChannel = async () => {
  //Get memberIDs from channel
  const channelID = db_settings.werewolf_channel_id; //werewolf-2019
  const slackChannelInfoEndPoint = `https://slack.com/api/channels.info?token=${db_settings.api_key}&channel=${channelID}&pretty=1`;
  const response = await fetch(slackChannelInfoEndPoint);
  const data = await response.json();
  const channelMembersID = data.channel.members;
  
  // console.log("FROM database.js -- Member IDs from channel")
  // console.log(channelMembersID);

  return channelMembersID;
}
//Gets Member info from the werefolf-2019 channel
const getMemberInfoFromChannel = async () => {
  const slackUsers = await getAllUsers();
  const channelMembersID = await getMemberIDsFromChannel();
  const channelMembersInfo = [];

  channelMembersID.map((memberID) => {
    const memberInfo = slackUsers.find(x => x.id === memberID)
    channelMembersInfo.push(memberInfo);
  })

  // console.log("FROM database.js -- channel members info");
  // console.log(channelMembersInfo.length);

  return channelMembersInfo;
}
//Builds an array of objects with the name and slackHandle from all users in the werefolf-2019 channel
const getMemberDetails = async () => {
  const memberNames = [];
  const memberInfoFromChannel = await getMemberInfoFromChannel();
  /** 
   * Grab name, real_name, id, email from object returned from getMemberInfoFromChannel()
   * Push to new array of objects
  */

 memberInfoFromChannel.map((obj) => {
  const name = obj.real_name; 
  const slackHandle = obj.name;
  const slackID = obj.id;
  const email = obj.profile.email;
  const slackAvatar = obj.profile.image_original;

  if(!db_settings.exclusionListArray.includes(email)){
    memberNames.push(
      {
        name,
        slackHandle,
        slackID,
        email,
        slackAvatar
      }
    )
  }
 })

console.log("FROM database.js -- getMemberDetails:")
 console.log(memberNames.length);

 return memberNames;
}
//Add role, alive, voted, userGroup to memberNames array
const createDB = async () => {
  const memberNames = await getMemberDetails();
  const userDbData = [];

  /** 
   * Build new object
   * Get names from members name
   * get userAddProperties to each array object in memberNames
   * creat enew object from them
   * push to new array
  */

 memberNames.map((member) => {
  const name = member.email.split("@")[0];
  const slackHandle = member.slackHandle;
  const slackID = member.slackID;
  const email = member.email;
  const slackAvatar = member.slackAvatar;

  //TODO: Figure out how to limit the assignment of certain roles to a limited number (currently not being used)
  const roles = ["villager", "wolf", "seer"]; //doctor, hunter 
  let randomRolesIndex = Math.floor(Math.random() * (roles.length)) + 0;
  let randomRole = roles[randomRolesIndex];
  //

  const userAddProperties = {
    name,
    slackHandle,
    slackID,
    slackAvatar,
    email,
    "role": "villager",
    "alive": true,
    "voted": false,
    userGroup: 1
  }

  userDbData.push(userAddProperties);
 })

 console.log("FROM database.js -- userDbData");
 console.log(userDbData);
 return userDbData;
}
//Inserts documents into collection
const  populateDB = (collection, data, client) => {
  collection.insert(
    data,
    (err, result) => {
      collection.find({}).toArray((err, items) => {
        if (err) {
          throw err;
        }
        console.log('items', items);
        client.close();
      });
    }
  )
}

MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
  const data = await createDB();

  if (err) {
    console.error(err);
    throw err;
  }

  const db = client.db(dbname);
  const collection = db.collection(db_settings.db_collection_name);

  db.listCollections({name: db_settings.db_collection_name}) //Drops the collection if exists, then inserts new user data
    .next(async (err, collinfo) => {
        if (collinfo) {
            await collection.drop();
            populateDB(collection, data, client);
        }else {
          populateDB(collection, data, client);
        }
    });
});