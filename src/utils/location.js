export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Get location name from coordinates using reverse geocoding
          const locationName = await getLocationName(latitude, longitude);
          resolve({
            latitude,
            longitude,
            locationName,
          });
        } catch (error) {
          // Return coordinates even if location name fails
          resolve({
            latitude,
            longitude,
            locationName: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        }
      },
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

const getLocationName = async (latitude, longitude) => {
  try {
    // Using OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "VibeChat/1.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location name");
    }

    const data = await response.json();

    // Extract city and country from the response
    const address = data.address || {};
    const city =
      address.city || address.town || address.village || address.county;
    const state = address.state;
    const country = address.country;

    // Build location string
    let locationParts = [];
    if (city) locationParts.push(city);
    if (state && state !== city) locationParts.push(state);
    if (country) locationParts.push(country);

    return (
      locationParts.join(", ") ||
      data.display_name ||
      `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
    );
  } catch (error) {
    console.error("Error getting location name:", error);
    throw error;
  }
};
