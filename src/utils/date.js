/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} format - The format type ('short', 'long', 'medium')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
        const dateObj = new Date(date);

        if (isNaN(dateObj.getTime())) {
                return 'Invalid Date';
        }

        const options = {
                short: { month: 'short', day: 'numeric' },
                medium: { month: 'short', day: 'numeric', year: 'numeric' },
                long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        };

        return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
};

/**
 * Get the start and end dates of the current week
 * @param {Date} date - Reference date (defaults to today)
 * @returns {Object} Object with start and end dates
 */
export const getWeekStartAndEnd = (date = new Date()) => {
        const currentDate = new Date(date);
        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Calculate start of week (Sunday)
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - dayOfWeek);
        startDate.setHours(0, 0, 0, 0);

        // Calculate end of week (Saturday)
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        return {
                start: startDate,
                end: endDate,
                startFormatted: formatDate(startDate, 'short'),
                endFormatted: formatDate(endDate, 'short')
        };
};

/**
 * Check if a date is today
 * @param {Date|string} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
        const today = new Date();
        const checkDate = new Date(date);

        return today.toDateString() === checkDate.toDateString();
};

/**
 * Check if a date is within the current week
 * @param {Date|string} date - The date to check
 * @returns {boolean} True if the date is in current week
 */
export const isThisWeek = (date) => {
        const { start, end } = getWeekStartAndEnd();
        const checkDate = new Date(date);

        return checkDate >= start && checkDate <= end;
};

/**
 * Get date range string
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Formatted date range
 */
export const getDateRange = (startDate, endDate) => {
        const start = formatDate(startDate, 'short');
        const end = formatDate(endDate, 'short');
        return `${start} - ${end}`;
};