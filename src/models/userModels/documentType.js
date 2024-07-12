const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const DocumentType = mongoose.model('DocumentType', documentTypeSchema);

module.exports = DocumentType;