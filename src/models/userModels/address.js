const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentLocationSchema = new Schema(
  {
    userAdress: { type: Schema.Types.ObjectId, ref: 'User', required: true, default: null },
    nationality: { type: String, required: false, default: null },
    city: { type: String, required: false, default: null },
    adress: { type: String, required: false, default: null },
    coordinates: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const CurrentLocation = mongoose.model(
  "CurrentLocation",
  currentLocationSchema
);

module.exports = CurrentLocation;
