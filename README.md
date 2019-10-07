# Project 


## Install Dependencies
To begin using this repository please run the following command.
> `npm install`

## Requirements
1. Main Slack Channel - this slack channel is where all of the slack USER IDs will be pulled from. (You will need the slack channel ID for this channel)

2. Death Slack Channel - this slack channel is where all of the deaths should be posted following the below format (You will need the slack channel ID for this channel):

Death: jane.doe was a villager
Resurrection: jane.doe

3. MongoDB

## Required Files
1. .env - you will need to create a .env file on your root and add the following code (they do NOT need to be strings or in quotes " "): ie. REACT_APP_API_KEY=xxx-1234 --> GOOD

REACT_APP_API_KEY=<ADD YOUR SLACK API KEY HERE>
REACT_APP_DEATH_CHANNEL_KEY=<ADD YOUR DEATH SLACK CHANNEL ID HERE>

2. db_settings.js - you will need to create this file in config/ (in the same folder as init_database.js) and add the following code (these values DO need to be in quotes " "):

module.exports = {
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
