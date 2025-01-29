const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docAttachment = new Schema(
  {
    userAttachId: { type: Schema.Types.ObjectId, ref: 'User', required: true, default: null },
    AttachName: { type: Schema.Types.ObjectId, ref: 'DocumentType', required: true, default: null },
    attachExt: { type: String, required: true, default: null },
    attachType: { type: Schema.Types.ObjectId, ref: 'DocumentType', required: false, default: null },
    fileAttachUrl: { type: String, required: true, default: null },
  },
  {
    timestamps: true,
  }
);

const attachment = mongoose.model("attachment", docAttachment);

module.exports = attachment;
