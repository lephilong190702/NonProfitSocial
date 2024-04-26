import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import ApiConfig, { endpoints } from '../../configs/ApiConfig';

const GoogleMapProject = ({projectId}) => {
    const libraries = ["places"];
    const mapContainerStyle = {
      width: "100vw",
      height: "100vh",
    };
    const center = {
      lat: 7.2905715,
      lng: 80.6337262,
    };

    const [markers, setMarkers] = useState([]);
    
    useEffect(() => {
      const loadAddressProject = async () => { // Make function async
          try {
              const { data } = await ApiConfig.get(endpoints["address-project"](projectId)); // Await the API call
              setMarkers(data);
          } catch (error) {
              console.log(error);
          }
      };

      loadAddressProject();
  }, [projectId]);

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
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} />
          ))}
        </GoogleMap>
      </div>
    );
}

export default GoogleMapProject;
