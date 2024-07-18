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
    isTourist: { type: Schema.ObjectId, ref: "Tourist", required: false, default: null },
    isAgency: { type: Schema.ObjectId, ref: "Agency", required: false, default: null },
    nationality: { type: String, required: false, default: null },
    city: { type: String, required: false, default: null },
    adress: { type: String, required: false, default: null },
    coordinates: { type: String, required: false, default: null },
    documentType: { type: Schema.Types.ObjectId, ref: 'DocumentType', required: false, default: null },
    documentInfo: { type: Schema.Types.ObjectId, ref: 'DocumentInfo', required: false, default: null },
    birthDate: { type: Date, required: true },
    isPoliticsTrue: { type: Boolean, required: "The politics field is required" },
    isTtoDtosTrue: { type: Boolean, required: "The processing of personal data field is required" }
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;