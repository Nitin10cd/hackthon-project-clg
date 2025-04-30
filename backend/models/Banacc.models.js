import mongoose from "mongoose";

const bannedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  message: { type: String, required: true },
  bannedAt: { type: Date, default: Date.now },
});

const BannedModel = mongoose.model('Banned', bannedSchema);

export default BannedModel;
