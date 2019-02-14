// Package dependencies
import moment from 'moment';


export const ISO8601_FORMAT_WITH_MILLISECONDS = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]';


/**
 * Return a formatted date or datetime.
 * @param isoDate - ISO date.
 * @param setTime - Flag to set the time (12hs based) to the response.
 * @param useLocalTime - Flag to use local timezone (default: false).
 * @param useSeconds - Whether to use seconds on the format (default: false).
 * @returns {string}
 */
export const formatDate = (isoDate, {setTime = false, useLocalTime = false, useSeconds = false} = {}) => {
  const FORMAT = `MM/DD/YYYY${setTime ? ` - hh:mm${useSeconds ? ':ss' : ''} a` : ''}`;

  let dateTime = useLocalTime ? moment.utc(isoDate).local() : moment.utc(isoDate);

  return isoDate ? dateTime.format(FORMAT) : '';
};

/**
 * Return a formatted datetime.
 * @param isoDate - ISO date.
 * @param options - Options to be passed to formatDate.
 * @returns {string}
 */
export const formatDatetime = (isoDate, options = {}) => {
  return formatDate(isoDate, {
    // Use local time by default
    useLocalTime: true,
    ...options,
    // Always set the time
    setTime: true,
  });
};

/**
 * Format a date to ISO string.
 * @param date
 * @returns {*}
 */
export const formatDateToISO = date => {
  if (!date || !moment.isMoment(date)) {
    return null;
  }

  // Ignore timezone
  return date.format(ISO8601_FORMAT_WITH_MILLISECONDS);
};


export const dateFromDateTime = datetime => datetime ? moment.utc(datetime) : undefined;
