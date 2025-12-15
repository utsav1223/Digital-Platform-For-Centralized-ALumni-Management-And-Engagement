export function mockRequests() {
  const now = new Date();
    const statuses = ["pending", "approved", "rejected"];
  return Array.from({ length: 21 }).map((_, i) => ({
    id: `r_${i + 1}`,
    type: ["mentorship", "internship", "job"][i % 3],
    title: `Request Title ${i + 1}`,
    name: ["Priya Sharma", "Aman Verma", "Sneha Gupta"][i % 3],
    email: `user${i + 1}@example.com`,
    company: i % 2 === 0 ? `Company ${i + 10}` : `Institute ${i + 5}`,
    phone: `+91-9${Math.floor(100000000 + Math.random() * 900000000)}`,
    message: "This is a sample message sent by the user for the admin to review.",
    date: now.toISOString().slice(0, 10),
      status: i % 4 === 0 ? "approved" : i % 5 === 0 ? "rejected" : "pending",
  }));
}

export function mockReports() {
  const now = new Date();
  return Array.from({ length: 7 }).map((_, i) => ({
    id: `rep_${i + 1}`,
    postId: `p_${100 + i}`,
    postType: ["mentorship", "internship", "job"][i % 3],
    postTitle: `Reported Item ${i + 1}`,
    postContent: "Content violating community guidelines.",
    reporterId: `u_${200 + i}`,
    reporterName: "Anonymous Reporter",
    reportType: ["spam", "abuse", "other"][i % 3],
    reason: "Inappropriate content.",
    date: now.toISOString().slice(0, 10),
  }));
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}