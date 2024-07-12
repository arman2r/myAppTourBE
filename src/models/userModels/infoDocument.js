const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoDocumentSchema = new Schema({
    documentNumber: { type: String, required: false, default: null },
    documentIssueDate: { type: Date, required: false, default: null }
});

const DocumentInfo = mongoose.model('DocumentInfo', infoDocumentSchema);

module.exports = DocumentInfo;