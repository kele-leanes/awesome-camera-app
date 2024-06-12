import piexif from 'piexifjs';

type DMSTuple = [number, number];
type DMSArray = [DMSTuple, DMSTuple, DMSTuple];
type Direction = 'S' | 'W' | 'N' | 'E';

export const getCityName = async (
  lat: number,
  lon: number,
): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();
    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      'Unknown city'
    );
  } catch (error) {
    console.error('Error getting city name:', error);
    return 'Unknown city';
  }
};

export const convertDMSToDD = (dms: DMSArray, direction: Direction) => {
  const degrees = dms[0][0] / dms[0][1];
  const minutes = dms[1][0] / dms[1][1] / 60;
  const seconds = dms[2][0] / dms[2][1] / 3600;
  const dd = degrees + minutes + seconds;

  return direction === 'S' || direction === 'W' ? dd * -1 : dd;
};

export const getLocationFromImageData = async (imageBase64: string) => {
  const imageData = `data:image/jpeg;base64,${imageBase64}`;
  const result = { lat: 0, lon: 0 };

  const exifObj = piexif.load(imageData);
  const gps = exifObj.GPS;

  if (gps) {
    result.lat = convertDMSToDD(gps[2], gps[1]);
    result.lon = convertDMSToDD(gps[4], gps[3]);
  }
  return result;
};
