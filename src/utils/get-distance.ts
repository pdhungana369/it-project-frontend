import { getDistance } from 'geolib';
import getUserLocation from './get-location';

interface IDistance {
  lat: string;
  long: string;
}

export default function calcualteDistance({ long, lat }: IDistance) {
  // if (!localStorage.getItem('lat') && !localStorage.getItem('long')) {
  //   getUserLocation();
  // }
  // const userLat = JSON.parse(localStorage.getItem('lat') ?? '');
  // const userLong = JSON.parse(localStorage.getItem('long') ?? '');
  // const distInMeters = getDistance(
  //   {
  //     latitude: parseFloat(lat),
  //     longitude: parseFloat(long),
  //   },
  //   {
  //     latitude: parseFloat(userLat),
  //     longitude: parseFloat(userLong),
  //   }
  // );
  //
  // if (distInMeters < 1000) {
  //   return Math.round(distInMeters) + ' meter away';
  // } else {
  //   return Math.round(distInMeters / 1000) + 'KM away';
  // }
}
