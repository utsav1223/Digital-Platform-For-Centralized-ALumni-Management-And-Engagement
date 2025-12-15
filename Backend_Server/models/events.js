import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  creator_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni",
    required: true,
  },

  created_by_role: {
    type: String,
    enum: ["alumni", "admin"],
    default: "alumni",
  },

  category: {
    type: String,
    enum: ["Workshop", "Webinar", "Conference", "Meetup", "Networking", "Social", "Other"],
  },

  type: {
    type: String,
    enum: ["In-person", "Virtual", "Hybrid"],
    default: "In-person",
  },

  location: String,

  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,

  is_online: { type: Boolean, default: false },
  link: String,

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni",
  },

  rejection_reason: String,

  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni",
  }],
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
