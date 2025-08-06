require('dotenv').config();
const fetch = global.fetch || require('node-fetch'); // Node ≥18 ships fetch

const API_KEY = process.env.OPENWEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/zip';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * @typedef {{ latitude: number, longitude: number, timezone: number }} LocationInfo
 */


/**
 * Resolve a US ZIP code to geo coords and timezone.
 * @param {string} zip e.g. "10001" or "10001,US"
 * @returns {Promise<LocationInfo>} resolved info
 */
async function enrichLocation(zip) {
  if (!API_KEY) throw new Error('OPENWEATHER_API_KEY env var missing');

  // Step 1: ZIP → lat/lon
  const geoRes = await fetch(`${GEO_URL}?zip=${zip}&appid=${API_KEY}`);
  if (!geoRes.ok) {
    const err = new Error(`ZIP lookup failed (${geoRes.status})`);
    err.status = geoRes.status;
    throw err;
  }
  const { lat, lon } = await geoRes.json();

  // Step 2: lat/lon → timezone (via current weather)
  const weatherRes = await fetch(`${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  if (!weatherRes.ok) {
    const err = new Error(`Timezone lookup failed (${weatherRes.status})`);
    err.status = weatherRes.status;
    throw err;
  }
  const { timezone } = await weatherRes.json();

  return { latitude: lat, longitude: lon, timezone };
}

module.exports = { enrichLocation };