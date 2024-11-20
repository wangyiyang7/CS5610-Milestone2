import React, { useEffect, useRef } from "react";
import * as atlas from "azure-maps-control";
/****** npm install azure-maps-control******/
import "./atlas.min.css";

const SimpleHtmlMarker = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new atlas.Map(mapRef.current, {
      center: [-123.11544, 49.28078],
      zoom: 14,
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey:
          "AQPjGnNIJmyFYXcFYW8g9XG8GOf2BqzNSY0LUZAdNOGg3d9GeSIuJQQJ99AKAC8vTInpI8XKAAAgAZMP3kjH",
      },
    });

    map.events.add("ready", () => {
      map.markers.add(
        new atlas.HtmlMarker({
          color: "DodgerBlue",
          position: [-123.11544, 49.28078],
        })
      );
    });

    return () => map.dispose();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default SimpleHtmlMarker;
