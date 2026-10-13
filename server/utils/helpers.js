/**
 * Shared utility helpers
 */

/**
 * Parse a positive integer from a string with a fallback default.
 */
export const parsePositiveInt = (value, defaultValue = 1, max = Infinity) => {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < 1) return defaultValue;
  return Math.min(parsed, max);
};

/**
 * Escape special regex characters from user input to prevent injection.
 */
export const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Build a standard success response object.
 */
export const successResponse = (message, data = {}) => ({
  success: true,
  message,
  data,
});

/**
 * Build a standard error response object.
 */
export const errorResponse = (message) => ({
  success: false,
  message,
});
