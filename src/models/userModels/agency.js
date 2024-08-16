const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para Agency
const agencySchema = new Schema({
  agencyName: { type: String, required: true },
  companyLogo: {
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
  createAt: { type: Date, required: true },
  // Agrega otros campos específicos para agencias
},
{
  timestamps: true
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
