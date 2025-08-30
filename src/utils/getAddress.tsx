export async function reverseGeocode(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${import.meta.env.VITE_MAPS_API}&types=address,place,region,country`
    );
    const data = await response.json();

    if (!data.features?.length) return null;

    const address: any = {
      streetAndNumber: '',
      place: '',
      region: '',
      country: '',
      latitude,
      longitude,
    };

    data.features.forEach((feature: any) => {
      const type = feature.place_type[0];
      switch (type) {
        case 'address':
          address.streetAndNumber = feature.text;
          break;
        case 'place':
          address.place = feature.text;
          break;
        case 'region':
          address.region = feature.text;
          break;
        case 'country':
          address.country = feature.text;
          break;
      }
    });

    if (!address.streetAndNumber && data.features[0]) {
      address.streetAndNumber = data.features[0].place_name?.split(',')[0];
    }

    return address;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}
