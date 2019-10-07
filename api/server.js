'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

// 1. Create main express intance
const router = express();

// 2. Require routes
const { router: userRoutes } = require('./routes/users/userRoutes');

// 3. Require conatants
const { URL, PORT } = require('./utils/constants');

// 4. Ensure that the router is using body parser to appropriately format incoming requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// !!! Temporary to bypass CORS until "proxy: localhost:3001" works in package.json
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

// 5. Utilise routes
router.use('/api/users', userRoutes);

// 6. Create a server from express instance
const server = http.createServer(router);

// Set mongoose to use findOneAndUpdate()
mongoose.set('useFindAndModify', false);

// 7. Start server
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(async () => {
    console.log(`Connected to database at ${URL}`);
    server.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  })
