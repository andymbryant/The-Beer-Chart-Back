const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');
const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());

require('./models').connect(config.dbUri);

// const mongoDB = 'mongodb://localhost:27017/beer';
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

let Beer = require('./models/beer');

app.get('/beerId/:beerId', function(req,res){
  brewdb.beer.getById(req.params.beerId, {}, function(err, beer) {
    if(err) {
        console.error(err);
        res.status(500).send("An error occurred");
    } else if(beer) {
        res.send(beer);
    } else{
        res.status(404).send('We could not find your beer');
    }
  })
});

app.get('/beer/:token', function(req,res){
  brewdb.search.beers({q: req.params.token}, function(err, beer) {
    if(err) {
        console.error(err);
        res.status(500).send("An error occurred");
    } else if(beer) { // we found the beer
        res.send(beer);
    } else{
        res.status(404).send('We could not find your beer');
    }
  })
});

app.get('/beerNode/:id', function(req,res){
  Beer.findOne({ 'beerId': req.params.id }).then(function(beer) {
    res.send(beer);
    })
});


// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 3000));

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});


// app.use(express.static('./server/static/'));
// app.use(express.static('./client/dist/'));



// pass the authenticaion checker middleware


// routes
