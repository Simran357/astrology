import tzLookup from "tz-lookup";

export interface GeocodedLocation {
  name: string;
  displayName?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string; // Pincode / Postal Code
  latitude: number;
  longitude: number;
  timezone: string;
}

// Built-in offline database for instant 0ms resolution of popular world cities
const POPULAR_CITIES: Record<
  string,
  {
    lat: number;
    lon: number;
    name: string;
    city: string;
    state?: string;
    country: string;
    postcode?: string;
  }
> = {
  "san francisco": {
    lat: 37.7749,
    lon: -122.4194,
    name: "San Francisco, CA 94102, USA",
    city: "San Francisco",
    state: "California",
    country: "USA",
    postcode: "94102",
  },
  "san francisco, ca": {
    lat: 37.7749,
    lon: -122.4194,
    name: "San Francisco, CA 94102, USA",
    city: "San Francisco",
    state: "California",
    country: "USA",
    postcode: "94102",
  },
  "new york": {
    lat: 40.7128,
    lon: -74.006,
    name: "New York, NY 10001, USA",
    city: "New York",
    state: "New York",
    country: "USA",
    postcode: "10001",
  },
  "new york, ny": {
    lat: 40.7128,
    lon: -74.006,
    name: "New York, NY 10001, USA",
    city: "New York",
    state: "New York",
    country: "USA",
    postcode: "10001",
  },
  "los angeles": {
    lat: 34.0522,
    lon: -118.2437,
    name: "Los Angeles, CA 90012, USA",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    postcode: "90012",
  },
  "chicago": {
    lat: 41.8781,
    lon: -87.6298,
    name: "Chicago, IL 60601, USA",
    city: "Chicago",
    state: "Illinois",
    country: "USA",
    postcode: "60601",
  },
  "austin": {
    lat: 30.2672,
    lon: -97.7431,
    name: "Austin, TX 78701, USA",
    city: "Austin",
    state: "Texas",
    country: "USA",
    postcode: "78701",
  },
  "austin, tx": {
    lat: 30.2672,
    lon: -97.7431,
    name: "Austin, TX 78701, USA",
    city: "Austin",
    state: "Texas",
    country: "USA",
    postcode: "78701",
  },
  "seattle": {
    lat: 47.6062,
    lon: -122.3321,
    name: "Seattle, WA 98101, USA",
    city: "Seattle",
    state: "Washington",
    country: "USA",
    postcode: "98101",
  },
  "miami": {
    lat: 25.7617,
    lon: -80.1918,
    name: "Miami, FL 33101, USA",
    city: "Miami",
    state: "Florida",
    country: "USA",
    postcode: "33101",
  },
  "boston": {
    lat: 42.3601,
    lon: -71.0589,
    name: "Boston, MA 02108, USA",
    city: "Boston",
    state: "Massachusetts",
    country: "USA",
    postcode: "02108",
  },
  "london": {
    lat: 51.5074,
    lon: -0.1278,
    name: "London, SW1A 1AA, Greater London, United Kingdom",
    city: "London",
    state: "England",
    country: "United Kingdom",
    postcode: "SW1A 1AA",
  },
  "london, uk": {
    lat: 51.5074,
    lon: -0.1278,
    name: "London, SW1A 1AA, Greater London, United Kingdom",
    city: "London",
    state: "England",
    country: "United Kingdom",
    postcode: "SW1A 1AA",
  },
  "paris": {
    lat: 48.8566,
    lon: 2.3522,
    name: "Paris, 75001, Île-de-France, France",
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    postcode: "75001",
  },
  "paris, france": {
    lat: 48.8566,
    lon: 2.3522,
    name: "Paris, 75001, Île-de-France, France",
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    postcode: "75001",
  },
  "berlin": {
    lat: 52.52,
    lon: 13.405,
    name: "Berlin, 10117, Germany",
    city: "Berlin",
    country: "Germany",
    postcode: "10117",
  },
  "tokyo": {
    lat: 35.6762,
    lon: 139.6503,
    name: "Tokyo, 100-0001, Japan",
    city: "Tokyo",
    country: "Japan",
    postcode: "100-0001",
  },
  "mumbai": {
    lat: 19.076,
    lon: 72.8777,
    name: "Mumbai, 400001, Maharashtra, India",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postcode: "400001",
  },
  "delhi": {
    lat: 28.6139,
    lon: 77.209,
    name: "New Delhi, 110001, Delhi, India",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    postcode: "110001",
  },
  "bangalore": {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru, 560001, Karnataka, India",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    postcode: "560001",
  },
  "bengaluru": {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru, 560001, Karnataka, India",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    postcode: "560001",
  },
  "sydney": {
    lat: -33.8688,
    lon: 151.2093,
    name: "Sydney, NSW 2000, Australia",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    postcode: "2000",
  },
  "toronto": {
    lat: 43.6532,
    lon: -79.3832,
    name: "Toronto, ON M5H 2N2, Canada",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    postcode: "M5H 2N2",
  },
  "dubai": {
    lat: 25.2048,
    lon: 55.2708,
    name: "Dubai, United Arab Emirates",
    city: "Dubai",
    country: "United Arab Emirates",
  },
};

// In-memory & persistent cache
const memoryCache = new Map<string, GeocodedLocation>();
const suggestionsCache = new Map<string, GeocodedLocation[]>();

function getStorageCache(key: string): GeocodedLocation | null {
  try {
    const raw = localStorage.getItem(`celeste_geo_${key.toLowerCase()}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStorageCache(key: string, value: GeocodedLocation): void {
  try {
    localStorage.setItem(`celeste_geo_${key.toLowerCase()}`, JSON.stringify(value));
  } catch {}
}

export function resolveTimezone(latitude: number, longitude: number): string {
  try {
    return tzLookup(latitude, longitude);
  } catch (error) {
    console.warn("Could not lookup timezone for coords:", latitude, longitude, error);
    return "UTC";
  }
}

/**
 * Searches for real-time worldwide location suggestions with exact postal code/pincode,
 * state, country, and timezone.
 */
export async function searchLocations(query: string): Promise<GeocodedLocation[]> {
  const trimmed = (query || "").trim();
  if (trimmed.length < 2) return [];

  const normalized = trimmed.toLowerCase();

  // 1. Check suggestions cache
  if (suggestionsCache.has(normalized)) {
    return suggestionsCache.get(normalized)!;
  }

  const results: GeocodedLocation[] = [];
  const seenNames = new Set<string>();

  // 2. Add matching offline popular cities first (0ms instant response)
  for (const [key, city] of Object.entries(POPULAR_CITIES)) {
    if (key.includes(normalized) || city.name.toLowerCase().includes(normalized)) {
      const tz = resolveTimezone(city.lat, city.lon);
      const loc: GeocodedLocation = {
        name: city.name,
        displayName: city.name,
        city: city.city,
        state: city.state,
        country: city.country,
        postcode: city.postcode,
        latitude: city.lat,
        longitude: city.lon,
        timezone: tz,
      };
      results.push(loc);
      seenNames.add(city.name.toLowerCase());
    }
  }

  // 3. Query Photon Geocoding API (Fast autocomplete powered by OpenStreetMap)
  try {
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      trimmed
    )}&limit=6&lang=en`;

    const res = await fetch(photonUrl);
    if (res.ok) {
      const data = await res.json();
      if (data?.features && Array.isArray(data.features)) {
        for (const feat of data.features) {
          const props = feat.properties || {};
          const coords = feat.geometry?.coordinates || [];
          const lon = coords[0];
          const lat = coords[1];

          if (typeof lat === "number" && typeof lon === "number") {
            const cityName = props.city || props.name || props.town || props.village || props.county || "";
            const stateName = props.state || props.region || "";
            const countryName = props.country || "";
            const postcode = props.postcode || "";

            // Build full, readable address string
            const parts: string[] = [];
            if (props.name && props.name !== cityName) parts.push(props.name);
            if (cityName) parts.push(cityName);
            if (postcode) parts.push(postcode);
            if (stateName) parts.push(stateName);
            if (countryName) parts.push(countryName);

            const fullName = parts.length > 0 ? parts.join(", ") : props.name || trimmed;

            if (!seenNames.has(fullName.toLowerCase())) {
              seenNames.add(fullName.toLowerCase());
              const tz = resolveTimezone(lat, lon);

              results.push({
                name: fullName,
                displayName: fullName,
                city: cityName,
                state: stateName,
                country: countryName,
                postcode: postcode || undefined,
                latitude: lat,
                longitude: lon,
                timezone: tz,
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("Photon autocomplete query failed, trying Nominatim fallback:", err);
  }

  // 4. Fallback to OpenStreetMap Nominatim if Photon yielded no extra results
  if (results.length < 2) {
    try {
      const nomUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        trimmed
      )}&format=json&limit=5&addressdetails=1`;

      const nomRes = await fetch(nomUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "CelesteAstrologyApp/1.0 (contact@celeste.app)",
        },
      });

      if (nomRes.ok) {
        const data = await nomRes.json();
        if (Array.isArray(data)) {
          for (const item of data) {
            const lat = parseFloat(item.lat);
            const lon = parseFloat(item.lon);
            const addr = item.address || {};

            const cityName = addr.city || addr.town || addr.village || addr.municipality || item.name || "";
            const stateName = addr.state || addr.region || "";
            const countryName = addr.country || "";
            const postcode = addr.postcode || "";

            const fullName = item.display_name || trimmed;

            if (!seenNames.has(fullName.toLowerCase())) {
              seenNames.add(fullName.toLowerCase());
              const tz = resolveTimezone(lat, lon);

              results.push({
                name: fullName,
                displayName: fullName,
                city: cityName,
                state: stateName,
                country: countryName,
                postcode: postcode || undefined,
                latitude: lat,
                longitude: lon,
                timezone: tz,
              });
            }
          }
        }
      }
    } catch (nomErr) {
      console.warn("Nominatim fallback also failed:", nomErr);
    }
  }

  // Cache and return
  suggestionsCache.set(normalized, results);
  return results.slice(0, 7);
}

/**
 * Look up latitude, longitude, and IANA timezone for any city or address.
 * Prioritizes local offline database and cache, falls back to OpenStreetMap Nominatim.
 */
export async function lookupLocation(query: string): Promise<GeocodedLocation> {
  const normalized = (query || "").trim().toLowerCase();

  if (!normalized) {
    return {
      name: "San Francisco, CA 94102, USA",
      city: "San Francisco",
      state: "California",
      country: "USA",
      postcode: "94102",
      latitude: 37.7749,
      longitude: -122.4194,
      timezone: "America/Los_Angeles",
    };
  }

  // 1. Check in-memory cache
  if (memoryCache.has(normalized)) {
    return memoryCache.get(normalized)!;
  }

  // 2. Check localStorage cache
  const stored = getStorageCache(normalized);
  if (stored) {
    memoryCache.set(normalized, stored);
    return stored;
  }

  // 3. Check popular offline database
  if (POPULAR_CITIES[normalized]) {
    const city = POPULAR_CITIES[normalized];
    const timezone = resolveTimezone(city.lat, city.lon);
    const result: GeocodedLocation = {
      name: city.name,
      city: city.city,
      state: city.state,
      country: city.country,
      postcode: city.postcode,
      latitude: city.lat,
      longitude: city.lon,
      timezone,
    };
    memoryCache.set(normalized, result);
    setStorageCache(normalized, result);
    return result;
  }

  for (const [key, city] of Object.entries(POPULAR_CITIES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      const timezone = resolveTimezone(city.lat, city.lon);
      const result: GeocodedLocation = {
        name: city.name,
        city: city.city,
        state: city.state,
        country: city.country,
        postcode: city.postcode,
        latitude: city.lat,
        longitude: city.lon,
        timezone,
      };
      memoryCache.set(normalized, result);
      setStorageCache(normalized, result);
      return result;
    }
  }

  // 4. Try live suggestions first to get full address details
  try {
    const suggestions = await searchLocations(query);
    if (suggestions.length > 0) {
      const first = suggestions[0];
      memoryCache.set(normalized, first);
      setStorageCache(normalized, first);
      return first;
    }
  } catch (e) {
    console.warn("searchLocations lookup failed:", e);
  }

  // Fallback
  const fallbackResult: GeocodedLocation = {
    name: query,
    latitude: 37.7749,
    longitude: -122.4194,
    timezone: "America/Los_Angeles",
  };
  return fallbackResult;
}
