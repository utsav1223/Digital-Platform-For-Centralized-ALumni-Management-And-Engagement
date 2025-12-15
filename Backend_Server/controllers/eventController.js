import Event from "../models/events.js";
import EventVisibility from "../models/eventvisibility.js";
import Alumni from "../models/Alumni.js";
import Student from "../models/Student.js";
import sendEmail from "../utils/sendEmail.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title, description, organizer, location,
      startDate, endDate, startTime, endTime, category, type, is_online, link
    } = req.body;

    if (!title || !startDate) {
      return res.status(400).json({ ok: false, error: "title & date required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ ok: false, error: "Authentication required" });
    }

    // Map frontend type to model enum
    const eventType = type === 'Online' ? 'Virtual' : type === 'In-person' ? 'In-person' : type;

    const event = await Event.create({
      title,
      description,
      organizer,
      creator_user_id: req.user.id,
      created_by_role: req.user.role || 'alumni',
      category,
      type: eventType,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      is_online: type === 'Online',
      link,
      status: req.user.role === "admin" ? "accepted" : "pending"
    });

    return res.status(201).json({ ok: true, event });

  } catch (err) {
    console.error("createEvent error:", err.message);
    console.error("createEvent stack:", err.stack);
    res.status(500).json({ ok: false, error: err.message || "server error" });
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

    // Get all published and accepted events with visibility rules
    const published = await Event.find({ status: { $in: ["published", "accepted"] } })
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

    // Add user's own non-rejected events
    if (user) {
      const mine = await Event.find({
        creator_user_id: user.id,
        status: { $ne: "rejected" }
      });

      final.push(...mine);
    }

    return res.json({ ok: true, events: final });

  } catch (err) {
    console.error("getVisibleEvents error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate('creator_user_id', 'name email fullName');
    
    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    res.json({ ok: true, event });
  } catch (err) {
    console.error("getEventById error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    // Only creator can update
    if (event.creator_user_id.toString() !== req.user.id) {
      return res.status(403).json({ ok: false, error: "Not authorized" });
    }

    // Update allowed fields
    const updates = {
      title: req.body.title || event.title,
      description: req.body.description || event.description,
      location: req.body.location || event.location,
      date: req.body.date || event.date,
      time: req.body.time || event.time,
      is_online: req.body.is_online !== undefined ? req.body.is_online : event.is_online,
      link: req.body.link || event.link,
    };

    const updated = await Event.findByIdAndUpdate(eventId, updates, { new: true })
                              .populate('creator_user_id', 'name email');

    res.json({ ok: true, event: updated });
  } catch (err) {
    console.error("updateEvent error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    // Only creator can delete
    if (event.creator_user_id.toString() !== req.user.id) {
      return res.status(403).json({ ok: false, error: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({ ok: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("deleteEvent error:", err.message);
    res.status(500).json({ ok: false, error: err.message || "server error" });
  }
};

export const attendEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log(`📝 attendEvent called for eventId: ${eventId}, userId: ${req.user.id}, role: ${req.user.role}`);
    
    const event = await Event.findById(eventId).populate('creator_user_id', 'fullName name email');

    // Safe formatters to avoid email rendering errors on bad date/time values
    const formatEventDate = (evt) => {
      const raw = evt?.startDate || evt?.date;
      if (!raw) return 'TBD';
      const date = raw instanceof Date ? raw : new Date(raw);
      if (Number.isNaN(date.getTime())) return 'TBD';
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const formatEventTime = (evt) => {
      const start = evt?.startTime || evt?.time;
      const end = evt?.endTime;
      if (!start) return 'TBD';
      return end ? `${start} - ${end}` : start;
    };

    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    // Check if already attending
    if (event.attendees && event.attendees.includes(req.user.id)) {
      return res.status(400).json({ ok: false, error: "Already attending" });
    }

    // Initialize attendees array if it doesn't exist
    if (!event.attendees) {
      event.attendees = [];
    }

    event.attendees.push(req.user.id);
    await event.save();
    console.log(`✅ User added to attendees for event ${eventId}`);

    // Get user information based on role
    let attendee = null;
    if (req.user.role === 'student') {
      attendee = await Student.findById(req.user.id).select('name email regNo phone batch branch');
      console.log(`👤 Student found:`, attendee);
    } else if (req.user.role === 'alumni') {
      attendee = await Alumni.findById(req.user.id).select('fullName email phone batchYear department');
      console.log(`👤 Alumni found:`, attendee);
    } else {
      console.warn(`⚠️ Unknown user role: ${req.user.role}`);
    }
    
    // Send email notification to event creator
    if (event.creator_user_id && event.creator_user_id.email && attendee) {
      try {
        const attendeeType = req.user.role === 'student' ? 'Student' : 'Alumni';
        const attendeeName = req.user.role === 'student' ? attendee.name : attendee.fullName;
        const attendeeEmail = attendee.email;
        const attendeeRegNo = attendee.regNo || 'N/A';
        const attendeePhone = attendee.phone || 'N/A';
        const attendeeBatchOrYear = req.user.role === 'student' ? attendee.batch : attendee.batchYear;
        const attendeeBranchOrDept = req.user.role === 'student' ? attendee.branch : attendee.department;
        
        console.log(`📧 Sending notification to creator: ${event.creator_user_id.email}`);
        
        await sendEmail({
          to: event.creator_user_id.email,
          subject: `✅ New ${attendeeType} Registration for ${event.title}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f9fafb;">
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🎉 New Registration</h1>
                  <p style="color: #E0E7FF; margin: 10px 0 0 0; font-size: 16px;">Alumni Management Portal</p>
                </div>
                <div style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #1F2937; font-size: 16px;">A ${attendeeType.toLowerCase()} has registered for <strong>${event.title}</strong>!</p>
                  
                  <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #1F2937;">📋 ${attendeeType} Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Name:</td>
                        <td style="padding: 8px 0; color: #1F2937;">${attendeeName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Email:</td>
                        <td style="padding: 8px 0; color: #1F2937;"><a href="mailto:${attendeeEmail}" style="color: #4F46E5; text-decoration: none;">${attendeeEmail}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Reg No:</td>
                        <td style="padding: 8px 0; color: #1F2937;">${attendeeRegNo}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">Phone:</td>
                        <td style="padding: 8px 0; color: #1F2937;"><a href="tel:${attendeePhone}" style="color: #4F46E5; text-decoration: none;">${attendeePhone}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">${req.user.role === 'student' ? 'Batch' : 'Year'}:</td>
                        <td style="padding: 8px 0; color: #1F2937;">${attendeeBatchOrYear || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">${req.user.role === 'student' ? 'Branch' : 'Department'}:</td>
                        <td style="padding: 8px 0; color: #1F2937;">${attendeeBranchOrDept || 'N/A'}</td>
                      </tr>
                    </table>
                  </div>

                  <p style="margin: 20px 0 0 0; color: #6B7280; font-size: 14px;">Total Attendees: <strong>${event.attendees.length}</strong></p>
                </div>
                  <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #1F2937;">📋 Event Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600; border-bottom: 1px solid #E5E7EB;">📅 Date:</td>
                        <td style="padding: 8px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB;">
                          ${formatEventDate(event)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600; border-bottom: 1px solid #E5E7EB;">🕐 Time:</td>
                        <td style="padding: 8px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB;">
                          ${formatEventTime(event)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600; border-bottom: 1px solid #E5E7EB;">📍 Location:</td>
                        <td style="padding: 8px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB;">
                          ${event.location || (event.is_online ? '🌐 Online Event' : 'Location TBD')}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-weight: 600;">🎯 Category:</td>
                        <td style="padding: 8px 0; color: #1F2937;">
                          ${event.category || 'General'}
                        </td>
                      </tr>
                    </table>
                  </div>
                <div style="background-color: #F9FAFB; padding: 20px 30px; border-top: 1px solid #E5E7EB;">
                  <p style="margin: 0; color: #6B7280; font-size: 13px; text-align: center;">
                    © ${new Date().getFullYear()} Alumni Management Portal. All rights reserved.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `
        });
        console.log(`✅ Registration notification sent to ${event.creator_user_id.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send registration email to creator:", emailError);
      }
    } else {
      console.warn(`⚠️ Could not send creator email - creator: ${event.creator_user_id?.email}, attendee: ${attendee?.email}`);
    }

    // Send confirmation email to the attendee
    if (attendee && attendee.email) {
      try {
        const attendeeName = req.user.role === 'student' ? attendee.name : attendee.fullName;
        
        console.log(`📧 Sending confirmation to attendee: ${attendee.email}`);
        
        await sendEmail({
          to: attendee.email,
          subject: `✅ Registration Confirmed - ${event.title}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f9fafb;">
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🎉 Thank You for Registering!</h1>
                  <p style="color: #D1FAE5; margin: 10px 0 0 0; font-size: 16px;">Your registration has been confirmed</p>
                </div>
                <div style="padding: 30px;">
                  <p style="color: #1F2937; font-size: 16px; margin-bottom: 20px;">Dear <strong>${attendeeName}</strong>,</p>
                  <p style="color: #4B5563; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                    Thank you for registering for <strong>${event.title}</strong>. We're excited to have you join us! This email confirms your registration.
                  </p>
                  
                  <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #1F2937;">📋 Event Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr>
                        <td style="padding: 10px 0; color: #6B7280; font-weight: 600; border-bottom: 1px solid #E5E7EB;">📅 Date:</td>
                        <td style="padding: 10px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB;">
                          ${formatEventDate(event)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6B7280; font-weight: 600; border-bottom: 1px solid #E5E7EB;">🕐 Time:</td>
                        <td style="padding: 10px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB;">
                          ${formatEventTime(event)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6B7280; font-weight: 600; border-bottom: 1px solid #E5E7EB;">📍 Location:</td>
                        <td style="padding: 10px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB;">
                          ${event.location || (event.is_online ? '🌐 Online Event' : 'Location TBD')}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6B7280; font-weight: 600;">🎯 Category:</td>
                        <td style="padding: 10px 0; color: #1F2937;">
                          ${event.category || 'General'}
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div style="background-color: #FEF3C7; border: 1px solid #FCD34D; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                    <p style="margin: 0; color: #92400E; font-size: 14px; line-height: 1.6;">
                      <strong>📌 Important:</strong> Please mark your calendar and join us at the scheduled time. You'll receive reminders closer to the event date.
                    </p>
                  </div>

                  <p style="color: #4B5563; font-size: 15px; line-height: 1.6; margin-bottom: 10px;">
                    <strong>Need Help?</strong> If you have any questions or need to reschedule, please don't hesitate to reach out to the event organizer.
                  </p>
                </div>
                <div style="background-color: #F9FAFB; padding: 20px 30px; border-top: 1px solid #E5E7EB;">
                  <p style="margin: 0; color: #6B7280; font-size: 13px; text-align: center;">
                    © ${new Date().getFullYear()} Alumni Management Portal. All rights reserved.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `
        });
        console.log(`✅ Registration confirmation sent to ${attendee.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send confirmation email:", emailError);
      }
    } else {
      console.warn(`⚠️ Could not send attendee email - attendee: ${attendee}, email: ${attendee?.email}`);
    }

    // Populate attendees for response
    const updatedEvent = await Event.findById(eventId)
      .populate('creator_user_id', 'name email fullName');

    return res.json({ ok: true, event: updatedEvent });
  } catch (err) {
    console.error("❌ attendEvent error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};

export const cancelAttendance = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, error: "Event not found" });
    }

    event.attendees = event.attendees.filter(id => id.toString() !== req.user.id);
    await event.save();

    const updated = await Event.findById(eventId).populate('creator_user_id', 'name email');
    res.json({ ok: true, event: updated });
  } catch (err) {
    console.error("cancelAttendance error:", err);
    res.status(500).json({ ok: false, error: "server error" });
  }
};
