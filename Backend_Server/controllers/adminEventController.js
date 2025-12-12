import Event from "../models/Event.js";
import EventVisibility from "../models/eventvisibility.js";
import EventAudit from "../models/eventAudit.js";

export const publishEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { audience, assigned_group, user_ids } = req.body;

    const allowed = ["students", "alumni", "both", "specific"];
    if (!allowed.includes(audience)) {
      return res.status(400).json({ ok: false, error: "Invalid audience" });
    }

    // Update status
    await Event.findByIdAndUpdate(eventId, { status: "published" });

    // Remove previous visibility rules
    await EventVisibility.deleteMany({ event_id: eventId });

    // If specific users
    if (audience === "specific" && user_ids?.length > 0) {
      const inserts = user_ids.map(uid => ({
        event_id: eventId,
        audience: "specific",
        assigned_user_id: uid,
        assigned_by: req.user.id,
      }));
      await EventVisibility.insertMany(inserts);

    } else {
      // Normal publish
      await EventVisibility.create({
        event_id: eventId,
        audience,
        assigned_group,
        assigned_by: req.user.id
      });
    }

    // Log Audit
    await EventAudit.create({
      event_id: eventId,
      action: "published",
      performed_by: req.user.id,
      payload: { audience, assigned_group, user_ids }
    });

    const updated = await Event.findById(eventId);

    res.json({ ok: true, event: updated });

  } catch (err) {
    console.error("publishEvent error:", err);
    res.status(500).json({ ok: false, error: "Publish failed" });
  }
};
