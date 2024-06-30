import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import ApiConfig, { endpoints } from "../../configs/ApiConfig";

const ProjectsMap = () => {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const center = {
    lat: 10.762622,
    lng: 106.660172,
  };

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadAddressProject = async () => {
      try {
        const { data } = await ApiConfig.get(endpoints["address-project-all"]);
        console.log(data);
        setMarkers(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadAddressProject();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_yyZnPqT0Mv8iYRVw7Zt6xU-eWjBjMqk",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </GoogleMap>
  );
};

export default ProjectsMap;
