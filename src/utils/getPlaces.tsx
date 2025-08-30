import { PlaceSuggestion } from '@types';
import axios from 'axios';

export async function getPlaces(query: string): Promise<PlaceSuggestion[]> {
  if (!query || query.length < 3) return [];

  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: import.meta.env.VITE_MAPS_API,
        },
      }
    );

    return data.features || [];
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}
