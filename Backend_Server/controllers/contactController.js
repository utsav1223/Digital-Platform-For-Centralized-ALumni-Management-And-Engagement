import sendEmail from "../utils/sendEmail.js";

export const contactAdmin = async (req, res) => {
    try {
        const { name, email, role, message } = req.body;

        if (!name || !email || !role || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const recipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

        // await sendEmail({
        //   to: recipient,
        //   subject: "New Contact Form Submission",
        //   html: `
        //     <h2>New Contact Request</h2>
        //     <p><strong>Name:</strong> ${name}</p>
        //     <p><strong>Email:</strong> ${email}</p>
        //     <p><strong>Role:</strong> ${role}</p>
        //     <p><strong>Message:</strong><br/>${message}</p>
        //   `,
        // });
        await sendEmail({
            to: recipient,
            subject: "New Contact Form Submission – Action Required",
            html: `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50; margin-bottom: 10px;">
        New Contact Form Submission
      </h2>

      <p>You have received a new message through the website contact form. The details are as follows:</p>

      <table style="border-collapse: collapse; width: 100%; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 150px;">Name</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Role</td>
          <td style="padding: 8px;">${role}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <p style="font-weight: bold; margin-bottom: 5px;">Message:</p>
        <div style="padding: 12px; background-color: #f8f9fa; border-left: 4px solid #3498db;">
          ${message}
        </div>
      </div>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 12px; color: #777;">
        This email was generated automatically from the website contact form.
        Please respond directly to the sender if required.
      </p>
    </div>
  `,
        });


        res.json({ success: true, message: "Message sent to admin" });

    } catch (error) {
        console.error("Contact controller error:", error);
        res.status(500).json({ message: error.message || "Failed to send email" });
    }
};
