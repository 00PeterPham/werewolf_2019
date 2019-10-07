'use strict';

exports.URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/werewolf_game'
exports.PORT = process.env.PORT || 3001;
exports.SECRET = process.env.SECRET || 'super-secret-passphrase';
