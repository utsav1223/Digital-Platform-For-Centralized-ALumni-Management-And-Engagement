import axios from "axios";

// IMPORTANT: Use Vite proxy with relative URLs so session cookies (set on 5173) are sent
const API = axios.create({
  baseURL: "/api/events",
  withCredentials: true,
});

// ==================== EVENT CRUD ====================

// Get all visible events (accepted events + user's own pending/rejected)
export const getAllEvents = () => API.get("/");

// Get user's own events
export const getMyEvents = () => API.get("/mine");

// Create a new event
export const createEvent = (eventData) => {
  console.log('📝 Creating event with data:', eventData);
  console.log('📝 API base URL:', API.defaults.baseURL);
  return API.post("/", eventData).then(response => {
    console.log('✅ Event created successfully:', response.data);
    return response;
  }).catch(error => {
    console.error('❌ Event creation failed:', error.response?.status, error.response?.data);
    throw error;
  });
};

// ==================== EVENT REGISTRATION ====================

// Register for an event
export const registerForEvent = (eventId) => {
  console.log('📝 Registering for event:', eventId);
  return API.post(`/${eventId}/attend`);
};

// Unregister from an event
export const unregisterFromEvent = (eventId) => {
  console.log('❌ Unregistering from event:', eventId);
  return API.delete(`/${eventId}/attend`);
};

// Delete an event (user-owned event deletion)
export const deleteEvent = (eventId) => {
  console.log('🗑️ Deleting event:', eventId);
  return API.delete(`/${eventId}`);
};

// ==================== ADMIN ENDPOINTS ====================

const AdminAPI = axios.create({
  baseURL: "/api/admin/events",
  withCredentials: true,
});

// Get all events (with optional status filter: pending, accepted, rejected)
export const adminGetAllEvents = (status) => {
  const params = status ? { status } : {};
  return AdminAPI.get("/", { params });
};

// Get pending events only
export const adminGetPendingEvents = () => AdminAPI.get("/pending");

// Approve/accept an event
export const adminApproveEvent = (eventId, visibilityData) => 
  AdminAPI.post(`/${eventId}/approve`, visibilityData);

// Reject an event
export const adminRejectEvent = (eventId, reason) => 
  AdminAPI.post(`/${eventId}/reject`, { reason });

// Delete an event
export const adminDeleteEvent = (eventId) => AdminAPI.delete(`/${eventId}`);

export default API;
