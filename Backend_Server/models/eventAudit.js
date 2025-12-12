import mongoose from "mongoose";

const EventAuditSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  action: String,
  performed_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payload: Object,
}, { timestamps: true });

export default mongoose.model("EventAudit", EventAuditSchema);
