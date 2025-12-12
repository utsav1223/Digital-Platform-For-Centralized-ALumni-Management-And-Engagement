import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  organizer: String,

  creator_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  created_by_role: {
    type: String,
    enum: ["alumni", "admin"],
    default: "alumni",
  },

  location: String,

  date: String,   // "2025-02-01"
  time: String,   // "10:00 AM - 2:00 PM"

  is_online: { type: Boolean, default: false },
  link: String,

  status: {
    type: String,
    enum: ["pending", "published"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
