const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para Tourist
const touristSchema = new Schema(
  {
    imageProfile: {
      type: String, 
      required: false,
      default: null,
    },
    currentLocation: {
      type: Schema.Types.ObjectId,
      ref: "CurrentLocation",
      required: false,
      default: null,
    },
    documentType: {
      type: Schema.Types.ObjectId,
      ref: "DocumentType",
      required: false,
      default: null,
    },
    documentInfo: {
      type: Schema.Types.ObjectId,
      ref: "DocumentInfo",
      required: false,
      default: null,
    },
    birthDate: { type: Date, required: true },
    // Agrega otros campos específicos para turistas
  },
  {
    timestamps: true,
  }
);

const Tourist = mongoose.model("Tourist", touristSchema);

module.exports = Tourist;
