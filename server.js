const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const bodyParser = require('body-parser');
const passport = require ('passport');

// initialize express
const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))



// passport middleware
app.use(passport.initialize());
//pasport config
require('./config/passport')(passport);



// use routes 
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);



// set environment port or custom 
const port = process.env.PORT || 5000;
// set server 
app.listen(port, () => console.log(`Server Running on port: ${port}`));