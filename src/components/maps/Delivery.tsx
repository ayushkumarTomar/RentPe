interface UserLocation {
    latitude: number;
    longitude: number;
    placeName: string;
  }
  
  interface Position {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  import { useEffect, useState } from 'react';
  
  import MapContainer from '@/components/maps/Map';
  
  const DeliveryLocation: React.FC = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          async (position: Position) => {
            const { latitude, longitude } = position.coords;
  
            try {
              // Perform reverse geocoding to get the name of the place
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const data = await response.json();
              const placeName = data.display_name;
              setUserLocation({ latitude, longitude, placeName });
            } catch (error) {
                //@ts-ignore
              console.error('Error fetching place name:', error.message);
            }
          },
          // Error callback
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    useEffect(()=>{getUserLocation()} , [])
  
    return (
      <div>
        <h1>Delivery Location</h1>
        {userLocation && (
          <p>
            Your current location: {userLocation.placeName} 
            <MapContainer latitude={userLocation.latitude} longitude={userLocation.longitude}/>
          </p>
        )}
      </div>
    );
  };
  
  export default DeliveryLocation;
  
  