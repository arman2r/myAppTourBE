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
  documentType: {
    type: Schema.Types.ObjectId,
    ref: "DocumentType",
    required: true,
    default: null,
  },
  documentInfo: {
    type: Schema.Types.ObjectId,
    ref: "DocumentInfo",
    required: true,
    default: null,
  }
  // Agrega otros campos específicos para agencias
},
{
  timestamps: true
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
