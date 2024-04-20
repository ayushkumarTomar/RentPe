import React, { useEffect } from 'react';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import * as maptilersdk from '@maptiler/sdk';

const MapComponent = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  useEffect(() => {
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid latitude or longitude provided.');
      return;
    }

    // Initialize MapTiler SDK
    maptilersdk.config.apiKey = 'hICSSCHBNL45c8Afxy2J';
    const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const marker = new maptilersdk.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      // Cleanup code here
      marker.remove();
      map.remove();
    };
  }, [latitude, longitude]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapComponent;
