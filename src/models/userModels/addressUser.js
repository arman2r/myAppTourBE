const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentLocationSchema = new Schema({
    nationality: { type: String, required: false, default: null },
    city: { type: String, required: false, default: null },
    adress: { type: String, required: false, default: null },
    coordinates: { type: String, required: false, default: null },
});

const CurrentLocation = mongoose.model('CurrentLocation', currentLocationSchema);

module.exports = CurrentLocation;