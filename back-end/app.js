const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const helmet = require('helmet')
const app = express();



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Express session
app.set('trust proxy', 1);

app.use(session({
cookie:{
    secure: true,
    maxAge:60000
       },
secret: 'secret',
saveUninitialized: true,
resave: false
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no')) //handle error
}
next() //otherwise continue
});

const limiter = rateLimit({
  windowMs: 100 * 100 * 30, // 5 minutes
  max: 10,
  message: "You have tried too subscribe many times, try again in a few minutes.",

});

// Express Limiter for API route
app.use("/api/", limiter);

// HELMET 
app.use(helmet())

// Routes
app.use('/api', require('./routes/users.js'));
app.use('/food-api', require('./routes/food-inspection.js'));
//const PORT = process.env.PORT || 80;

app.listen(PORT=8080);
