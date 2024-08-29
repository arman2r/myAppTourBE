const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para Tourist
const touristSchema = new Schema(
  {
    imageProfile: {
      type: String, 
      required: false,
      default: null,
    } 
  },
  {
    timestamps: true,
  }
);

const Tourist = mongoose.model("Tourist", touristSchema);

module.exports = Tourist;
