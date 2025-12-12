import mongoose from "mongoose";

const EventVisibilitySchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

  audience: {
    type: String,
    enum: ["students", "alumni", "both", "specific"],
    default: "both",
  },

  assigned_group: { type: String, default: null },

  assigned_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  assigned_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

export default mongoose.model("EventVisibility", EventVisibilitySchema);
