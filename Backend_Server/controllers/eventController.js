import Event from "../models/events.js";
import EventVisibility from "../models/eventvisibility.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title, description, organizer, location,
      date, time, is_online, link
    } = req.body;

    if (!title || !date) {
      return res.status(400).json({ ok: false, error: "title & date required" });
    }

    const event = await Event.create({
      title,
      description,
      organizer,
      creator_user_id: req.user.id,
      created_by_role: req.user.role,
      location,
      date,
      time,
      is_online,
      link,
      status: req.user.role === "admin" ? "published" : "pending"
    });

    return res.status(201).json({ ok: true, event });

  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ creator_user_id: req.user.id })
                              .sort({ date: 1, createdAt: -1 });

    res.json({ ok: true, events });
  } catch (err) {
    res.status(500).json({ ok: false, error: "server error" });
  }
};

export const getVisibleEvents = async (req, res) => {
  try {
    const user = req.user || null;

    // Get all published events with visibility rules
    const published = await Event.find({ status: "published" })
                                .lean();

    const visibility = await EventVisibility.find({})
                                            .lean();

    const final = [];

    for (const event of published) {
      const v = visibility.find(v => v.event_id.toString() === event._id.toString());

      // If no visibility → default = both
      if (!v || v.audience === "both") {
        final.push(event);
        continue;
      }

      if (v.audience === "students" && user?.role === "student") final.push(event);
      else if (v.audience === "alumni" && user?.role === "alumni") final.push(event);
      else if (v.audience === "specific" && v.assigned_user_id?.toString() === user?._id?.toString()) {
        final.push(event);
      }
    }

    // Add user’s own unpublished events
    if (user) {
      const mine = await Event.find({
        creator_user_id: user.id,
        status: { $ne: "published" }
      });

      final.push(...mine);
    }

    return res.json({ ok: true, events: final });

  } catch (err) {
    console.error("getVisibleEvents error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};
