import mongoose from "mongoose";
import Event from "../models/events.js";
import EventVisibility from "../models/eventvisibility.js";
import EventAudit from "../models/eventAudit.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    console.log('📋 Admin: Fetching all events...');
    const events = await Event.find({})
                              .populate('creator_user_id', 'name email')
                              .populate('reviewed_by', 'name email')
                              .sort({ createdAt: -1 });

    console.log('✅ Admin: Found', events.length, 'events');
    console.log('📊 Admin: Events:', events.map(e => ({ id: e._id, title: e.title, status: e.status })));
    
    res.json({ ok: true, events });
  } catch (err) {
    console.error("❌ getAllEvents error:", err.message, err.stack);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

// Get pending events
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "pending" })
                              .populate('creator_user_id', 'name email')
                              .sort({ createdAt: -1 });

    res.json({ ok: true, events });
  } catch (err) {
    console.error("❌ getPendingEvents error:", err.message, err.stack);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

// Approve event
export const approveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { audience } = req.body; // "both", "students", "alumni", "specific"

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    // Validate and set reviewer ID
    const reviewerId = (req.user?.id && mongoose.isValidObjectId(req.user.id)) 
      ? req.user.id 
      : undefined;

    // Update event status
    event.status = "accepted";
    if (reviewerId) {
      event.reviewed_by = reviewerId;
    }
    await event.save();

    // Create/update visibility
    const visibility = await EventVisibility.findOneAndUpdate(
      { event_id: eventId },
      {
        event_id: eventId,
        audience: audience || "both",
        ...(reviewerId ? { assigned_by: reviewerId } : {}),
      },
      { upsert: true, new: true }
    );

    // Audit log
    await EventAudit.create({
      event_id: eventId,
      action: "approved",
      ...(reviewerId ? { performed_by: reviewerId } : {}),
      changes: { status: "accepted", audience: audience || "both" },
    });

    const updatedEvent = await Event.findById(eventId)
                                    .populate('creator_user_id', 'name email')
                                    .populate('reviewed_by', 'name email');

    res.json({ ok: true, event: updatedEvent });
  } catch (err) {
    console.error("❌ approveEvent error:", err.message, err.stack);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

// Reject event
export const rejectEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { reason } = req.body;

    if (!reason || !reason.trim()) {
      return res.status(400).json({ ok: false, error: "Rejection reason required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    // Validate and set reviewer ID
    const reviewerId = (req.user?.id && mongoose.isValidObjectId(req.user.id)) 
      ? req.user.id 
      : undefined;

    event.status = "rejected";
    event.rejection_reason = reason;
    if (reviewerId) {
      event.reviewed_by = reviewerId;
    }
    await event.save();

    // Audit log
    await EventAudit.create({
      event_id: eventId,
      action: "rejected",
      ...(reviewerId ? { performed_by: reviewerId } : {}),
      changes: { status: "rejected", rejection_reason: reason },
    });

    const updatedEvent = await Event.findById(eventId)
                                    .populate('creator_user_id', 'name email')
                                    .populate('reviewed_by', 'name email');

    res.json({ ok: true, event: updatedEvent });
  } catch (err) {
    console.error("❌ rejectEvent error:", err.message, err.stack);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    // Validate and set performer ID
    const performerId = (req.user?.id && mongoose.isValidObjectId(req.user.id)) 
      ? req.user.id 
      : undefined;

    // Delete visibility rules
    await EventVisibility.deleteMany({ event_id: eventId });

    // Audit log before deletion
    await EventAudit.create({
      event_id: eventId,
      action: "deleted",
      ...(performerId ? { performed_by: performerId } : {}),
      changes: { deleted: true },
    });

    // Delete event
    await Event.findByIdAndDelete(eventId);

    res.json({ ok: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ deleteEvent error:", err.message, err.stack);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

// Legacy publish function (kept for backward compatibility)
export const publishEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    event.status = "accepted";
    await event.save();

    res.json({ ok: true, event });
  } catch (err) {
    console.error("❌ publishEvent error:", err.message, err.stack);
    res.status(500).json({ ok: false, error: "server error" });
  }
};
