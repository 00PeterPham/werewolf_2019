'use strict';

const mongodb = require('mongodb');
const User = require('./userModel');

// Helper function to list each of the Users in the database
exports.listUsers = async () => {
  try {
    const users = User.find({});
    return users;
  } catch (e) {
    throw e;
  }
};

//Match Email parameter
exports.matchEmail = async (query) => {
  try {
    const user = User.findOne({ email: query });
    return user;
  } catch (e) {
    throw e;
  }
}

//Get all dead people 
exports.getGraveyard = async () => {
  try {
    const deadPpl= User.find({ alive: false });
    return deadPpl;
  } catch (e) {
    throw e;
  }
}

// Create a new user that will be added to the database
exports.createUser = async (userData) => {
  // 1. Create a user instance
  const user = new User(userData);
  try {
    // 2. Save user to database
    const doc = await user.save();
    // 3. return with created user
    return doc;
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e;
  }
};

//Edit one user
exports.editUser = async (userInfo, action) => {
  console.log("userInfo::");
  console.log(userInfo);
  console.log(`editUser email`);
  console.log(userInfo.email);
  console.log(`editUser role`);
  console.log(userInfo.role);
  console.log(`editUser query: ${action}`);
  
  console.log("timeOfDeath::");
  console.log(userInfo.timeOfDeath);

  const filter = { email: userInfo.email };
  const role = userInfo.role;
  const timeOfDeath = userInfo.timeOfDeath;

  let update = null;

  if(action === 'kill'){
    update = { "alive": false, role, timeOfDeath };
  }else if (action === 'unkill'){
    update = { "alive": true, role };
  }else if (action === 'voted'){
    update = { "voted": true };
  }

  try {
    const doc = await User.findOneAndUpdate(filter, update, {
      new: true
    })
    return doc;
  } catch (e) {
    throw e;
  }
}

//Edit all users
exports.editAllUsers = async (param) => {
  const filter = { userGroup: 1 }; //points user group
  let update = null;

  if(param === 'setAllVotesFalse'){
    update = {
      voted: false
    }
  }

  try {
    const doc = await User.updateMany(filter, update);
    return doc;
  } catch (e) {
    throw e;
  }
}