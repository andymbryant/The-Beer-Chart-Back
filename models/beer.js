const mongoose = require('mongoose');

let beerSchema = mongoose.Schema({
    beerId: String,
    name: String,
    shortName: String,
    desc: String,
    pair: String,
    glass: String,
    abvMin: String,
    abvMax: String,
    ibuMin: String,
    ibuMax: String
});

let Beer = module.exports = mongoose.model('Beer', beerSchema);
