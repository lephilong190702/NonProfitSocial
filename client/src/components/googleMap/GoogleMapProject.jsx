import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React from 'react'

const GoogleMapProject = () => {
    const libraries = ["places"];
    const mapContainerStyle = {
      width: "100vw",
      height: "100vh",
    };
    const center = {
      lat: 7.2905715, // default latitude
      lng: 80.6337262, // default longitude
    };
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyD4V6SrIbhDYqYOzqpBxiYdR3Ya7rE7MFc',
      libraries,
    });
    if (loadError) {
      return <div>Error loading maps</div>;
    }
    if (!isLoaded) {
      return <div>Loading maps</div>;
    }
  
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    );
}

export default GoogleMapProject