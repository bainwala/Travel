import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { listLogEntry } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntry();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/bainwala/ckdsk5fc510n719nvcs8o8xyz"
      mapboxApiAccessToken={
        "pk.eyJ1IjoiYmFpbndhbGEiLCJhIjoiY2tkc2pnenZ4MTA4ZzJwcGJ1eDNoaG1sNCJ9.ZMAvkce5f7auI58nefYT5A"
      }
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {logEntries.map((entry) => (
        <Marker
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-12}
          offsetTop={-24}
        >
          <div>
            <svg
              className="marker"
              style={{
                width: '24px',
                height: '24px'
              }}
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default App;
