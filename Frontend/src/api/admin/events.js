// Event API for Admin Table
// Place this at: Frontend/src/api/eventAdminAPI.js

const API_BASE_URL = 'http://localhost:8000/api/events';

// Get all events (for admin table)
export const getAllEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.category) params.append('category', filters.category);
    if (filters.regNo) params.append('regNo', filters.regNo);

    const url = `${API_BASE_URL}${params.toString() ? '?' + params.toString() : ''}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }

    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Get single event
export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch event');
    }

    return data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Get events by alumni regNo
export const getEventsByAlumni = async (regNo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/alumni/${regNo}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch alumni events');
    }

    return data;
  } catch (error) {
    console.error('Error fetching alumni events:', error);
    throw error;
  }
};

// Create event
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create event');
    }

    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update event
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update event');
    }

    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete event
export const deleteEvent = async (eventId, alumniId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alumniId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete event');
    }

    return data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Register attendee
export const registerAttendee = async (eventId, alumniId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alumniId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register');
    }

    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Unregister attendee
export const unregisterAttendee = async (eventId, alumniId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}/unregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alumniId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to unregister');
    }

    return data;
  } catch (error) {
    console.error('Error unregistering:', error);
    throw error;
  }
};

// Get events by status
export const getEventsByStatus = async (status, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/status/${status}?page=${page}&limit=${limit}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }

    return data;
  } catch (error) {
    console.error('Error fetching events by status:', error);
    throw error;
  }
};
