/**
 * DG Interns Hub — Frontend API Client
 * Provides a thin wrapper around fetch() for all backend API calls.
 * The base URL is configured via VITE_API_URL environment variable.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Token helpers ────────────────────────────────────────────────────────────
export const getToken = () => localStorage.getItem('dgh_token');
export const setToken = (token) => localStorage.setItem('dgh_token', token);
export const clearToken = () => localStorage.removeItem('dgh_token');

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('dgh_user') || 'null');
  } catch {
    return null;
  }
};
export const setStoredUser = (user) => localStorage.setItem('dgh_user', JSON.stringify(user));
export const clearStoredUser = () => localStorage.removeItem('dgh_user');

// ─── Core request helper ──────────────────────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: 'Server returned an invalid response.',
  }));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// ─── Auth API ────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request('/auth/me'),

  logout: () =>
    request('/auth/logout', { method: 'POST' }),
};

// ─── Jobs API ────────────────────────────────────────────────────────────────
export const jobsAPI = {
  /**
   * Get all jobs with optional search, filter, pagination, sorting.
   * @param {Object} params - { search, type, location, skill, category, page, limit, sort }
   */
  getAll: (params = {}) => {
    const qs = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '' && value !== 'All') {
        qs.append(key, value);
      }
    }
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return request(`/jobs${query}`);
  },

  getById: (id) => request(`/jobs/${id}`),

  create: (jobData) =>
    request('/jobs', { method: 'POST', body: JSON.stringify(jobData) }),

  update: (id, jobData) =>
    request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(jobData) }),

  delete: (id) =>
    request(`/jobs/${id}`, { method: 'DELETE' }),
};

// ─── Applications API ────────────────────────────────────────────────────────
export const applicationsAPI = {
  create: (applicationData) =>
    request('/applications', { method: 'POST', body: JSON.stringify(applicationData) }),

  getMy: () => request('/applications/my'),

  getById: (id) => request(`/applications/${id}`),

  updateStatus: (id, status) =>
    request(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  delete: (id) =>
    request(`/applications/${id}`, { method: 'DELETE' }),
};

// ─── User API ────────────────────────────────────────────────────────────────
export const userAPI = {
  getProfile: () => request('/users/profile'),

  updateProfile: (profileData) =>
    request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  deleteProfile: () =>
    request('/users/profile', { method: 'DELETE' }),
};

export default { authAPI, jobsAPI, applicationsAPI, userAPI };
