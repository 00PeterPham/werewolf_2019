'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map to fields in the DB
//TO DO: Add more specific valdiation ie: name: {type, format, etc...}
const userSchema = new Schema({
    name: String,
    slackHandle: String,
    role: String,
    alive: Boolean,
    voted: Boolean,
    userGroup: Number,
    timeOfDeath: String,
});

module.exports = mongoose.model('User', userSchema);