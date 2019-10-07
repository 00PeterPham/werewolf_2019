# Project 


## Install Dependencies
To begin using this repository please run the following command.
> `npm install`

## Requirements
1. Main Slack Channel - this slack channel is where all of the slack USER IDs will be pulled from. (You will need the slack channel ID for this channel)

2. Death Slack Channel - this slack channel is where all of the deaths should be posted following the below format (You will need the slack channel ID for this channel):

Death: jane.doe was a villager
Resurrection: jane.doe

3. MongoDB - create a database and remember the name. You will need the database name in the db_settings.js file.

## Required Files
1. .env - you will need to create a .env file on your root and add the following code (they do NOT need to be strings or in quotes " "): ie. REACT_APP_API_KEY=xxx-1234 --> GOOD

REACT_APP_API_KEY=<ADD YOUR SLACK API KEY HERE>
REACT_APP_DEATH_CHANNEL_KEY=<ADD YOUR DEATH SLACK CHANNEL ID HERE>

2. db_settings.js - you will need to create this file in config/ (in the same folder as init_database.js) and add the following code (these values DO need to be in quotes " "):

module.exports = {
  "db_name": "<ADD NAME OF DATABASE>",
  "db_collection_name": "<ADD NAME OF DATABASE COLLECTION>",
  "api_key": "<ADD SLACK API KEY HERE>",
  "werewolf_channel_id": "<ADD YOUR MAIN SLACK CHANNEL ID HERE>",
  "exclusionListArray": [
    "joe.schmoe@email.com",
    "jane.doe@email.com", 
  ]
}

3. .env.tv (optional) - this is an optional file. There is some auto list scrolling functions that are only invoked when running build:tv so that when the dashboard is displayed on the tv, the villager and death list auto scroll up and down. This file will also need to be created on the root and need the following code:

NODE_ENV = "tv"
REACT_APP_API_KEY=<ADD YOUR SLACK API KEY HERE>
REACT_APP_DEATH_CHANNEL_KEY=<ADD YOUR DEATH SLACK CHANNEL ID HERE>
REACT_APP_TV=true

## Populate DB - users collection

1. Double Check - make sure that a database has been created and the name was set in the db_setting.js file. Also, make sure that the "db_collection_name" has been set in the db_setting.js file. The DB doesn't need to have this collection in it yet. The collection will be created once we run the below script.

2. Populate collection - From the terminal navigate to the root of your project folder and run the following command: 

node config/init_database.js

## Usage

> Start API server

```
$ npm run start:server
```

> Start Webpack Server

```
$ npm run start:client
```

> Build app

```
$ npm build:client

```
$ npm build:tv
