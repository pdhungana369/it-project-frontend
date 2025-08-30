import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import { RiMapPin2Fill } from 'react-icons/ri';
import { Address, MapProps, Viewport } from '@types';
import { reverseGeocode } from '@utils/getAddress';
import { useDebounce } from '@hooks/useDebounce';
import { DEFAULT_LOCATION } from '@utils/default-location';
import { LoadingOverlay } from './loading-overlay';
import { Controls } from './controls';
import { ErrorOverlay } from './error-overlay';

const TOKEN = import.meta.env.VITE_MAPS_API;
interface ExtendedMapProps extends MapProps {
  setAddress: (address: Address) => void;
}

interface MarkerPosition {
  latitude: number;
  longitude: number;
}

export function Map({
  longitude = DEFAULT_LOCATION.longitude,
  latitude = DEFAULT_LOCATION.latitude,
  updateCoordinates,
  setAddress,
}: ExtendedMapProps) {
  const [viewport, setViewport] = useState<Viewport>({
    latitude: Number(latitude),
    longitude: Number(longitude),
    zoom: DEFAULT_LOCATION.zoom,
  });

  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    latitude: Number(latitude),
    longitude: Number(longitude),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedPosition = useDebounce<MarkerPosition>(markerPosition, 500);

  useEffect(() => {
    const updateAddress = async () => {
      if (debouncedPosition.latitude && debouncedPosition.longitude) {
        setIsLoading(true);
        try {
          const newAddress = await reverseGeocode(
            debouncedPosition.latitude,
            debouncedPosition.longitude
          );
          if (newAddress) {
            setAddress(newAddress);
          }
        } catch (err: any) {
          console.log('Error', err);
          setError('Failed to update address. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    updateAddress();
  }, [debouncedPosition, setAddress]);

  useEffect(() => {
    setMarkerPosition({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  }, [latitude, longitude]);

  const handleMarkerDrag = (event: {
    lngLat: { lat: number; lng: number };
  }) => {
    const newLatitude = event.lngLat.lat;
    const newLongitude = event.lngLat.lng;

    setMarkerPosition({
      latitude: newLatitude,
      longitude: newLongitude,
    });

    updateCoordinates(newLatitude, newLongitude);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLatitude = position.coords.latitude;
          const newLongitude = position.coords.longitude;

          setViewport((prev) => ({
            ...prev,
            latitude: newLatitude,
            longitude: newLongitude,
          }));

          setMarkerPosition({
            latitude: newLatitude,
            longitude: newLongitude,
          });

          updateCoordinates(newLatitude, newLongitude);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please try again.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[250px] md:h-[95%]">
      <Controls
        onGetCurrentLocation={getCurrentLocation}
        isLoading={isLoading}
      />

      {isLoading && <LoadingOverlay />}
      {error && <ErrorOverlay message={error} />}

      <ReactMapGl
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(evt: { viewState: Viewport }) => setViewport(evt.viewState)}
      >
        <Marker
          latitude={markerPosition.latitude}
          longitude={markerPosition.longitude}
          draggable
          onDrag={handleMarkerDrag}
        >
          <RiMapPin2Fill className="h-8 w-8 text-danger" />
        </Marker>
      </ReactMapGl>
    </div>
  );
}
