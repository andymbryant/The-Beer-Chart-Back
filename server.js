const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb('070ad738f20d01c4c7ab2dc36970aef3');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoDB = 'mongodb://localhost:27017/beer';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

app.get('/beerNode', function(req,res){
  Beer.findOne({ 'beerId': 'cQMfwv' }).then(function(beer) {
    res.send(beer);
});
});

app.put('/beerUpdate', function(req, res) {
    Beer.findOne({ 'beerId': 'cQMfwv' }).then(function(beer) {
        beer.rating = req.body.rating;
        beer.save(function(err, updatedBeer) {
            if (err) return handleError(err);
            res.send(updatedBeer);
        })
    })

})

app.put('/noteUpdate', function(req, res) {
    Beer.findOne({ 'beerId': 'cQMfwv' }).then(function(beer) {
        console.log(req.body.note); 
        beer.save(function(err, updatedBeer) {
            if (err) return handleError(err);
            res.send(updatedBeer);
        })
    })

})

app.listen(3000, function() {
    console.log("connected to port 3000");
});
