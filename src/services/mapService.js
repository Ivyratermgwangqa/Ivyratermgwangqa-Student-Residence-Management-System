import axios from 'axios';

// Retrieve the Mapbox API key from environment variables
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

// Base URL for Mapbox API
const MAPBOX_BASE_URL = 'https://api.mapbox.com';

// Function to get geocoding data
export async function getGeocodingData(address) {
    try {
        const response = await axios.get(`${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`, {
            params: {
                access_token: MAPBOX_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        throw error;
    }
}

// Function to get directions
export async function getDirections(start, end) {
    try {
        const response = await axios.get(`${MAPBOX_BASE_URL}/directions/v5/mapbox/driving/${encodeURIComponent(start)};${encodeURIComponent(end)}.json`, {
            params: {
                access_token: MAPBOX_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching directions:', error);
        throw error;
    }
}

// Function to get static map image
export function getStaticMapImage(latitude, longitude, zoom = 12, width = 800, height = 600) {
    return `${MAPBOX_BASE_URL}/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${MAPBOX_API_KEY}`;
}