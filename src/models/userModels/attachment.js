const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docAttachment = new Schema(
  {
    userAttach: { type: Schema.Types.ObjectId, ref: 'User', required: true, default: null },
    typeAttach: { type: Schema.Types.ObjectId, ref: 'DocumentType', required: true, default: null },
    fileAttachUrl: { type: String, required: true, default: null },
  },
  {
    timestamps: true,
  }
);

const attachment = mongoose.model("attachment", docAttachment);

module.exports = attachment;
