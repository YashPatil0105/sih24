import React, { useEffect } from "react";
import "./map.css";

export const Map = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadMapScripts = async () => {
      try {
        await loadScript("./mapdata.js");
        await loadScript("./countrymap.js");

        if (window.simplemaps_countrymap) {
          window.simplemaps_countrymap.load();
        }
      } catch (error) {
        console.error("Error loading map scripts:", error);
      }
    };

    loadMapScripts();
  }, []);

  return (
    <div className="home-container">
      <div className="map-container">
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};
