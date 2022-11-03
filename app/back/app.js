const express = require('express');
const app = express();
const cors  = require('cors');
const userRoute = require('./routes/userRoute.js');
const postRoute = require('./routes/postRoute.js');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('./dataBase/db.js');

app.use (morgan('dev'));

// app.use(express.json())
// const path = require('path');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// app.use('/image', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoute);
app.use('/api/post', postRoute);


module.exports = app 