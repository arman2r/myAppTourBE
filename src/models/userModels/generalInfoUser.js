const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the User collection
const userSchema = new mongoose.Schema({
    names: { type: String, required: "The names field is required" },
    lastNames: { type: String, required: "The Last Names field is required" },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    userIsActive: { type: Boolean, default: false },
    email: { type: String, required: "The email field is required" },
    phone: { type: String, required: "The phone field is required" },
    confirmationCode: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    isTourist: { type: Boolean, required: true, default: false },
    isAgency: { type: Boolean, required: true, default: false },
    location: {type: String, required: true, default: null},
    documentType: { type: Schema.Types.ObjectId, ref: 'DocumentType', required: false, default: null },
    //documentInfo: { type: Schema.Types.ObjectId, ref: 'DocumentInfo', required: false, default: null },
    documentNumber: { type: String, required: true, default: null },
    documentIssueDate: { type: Date, required: true, default: null },
    birthDate: { type: Date, required: true },
    isPoliticsTrue: { type: Boolean, required: "The politics field is required" },
    isTtoDtosTrue: { type: Boolean, required: "The processing of personal data field is required" },
    password: { type: String, required: true, default: null },
},
{
    timestamps: true,
    collection: "user"
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;