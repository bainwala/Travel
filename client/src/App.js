import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntry } from "./API";
import LogEntryForm from "./LogEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntry, setAddEntry] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntry();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntry({
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/bainwala/ckdsk5fc510n719nvcs8o8xyz"
      mapboxApiAccessToken={
        "pk.eyJ1IjoiYmFpbndhbGEiLCJhIjoiY2tkc2pnenZ4MTA4ZzJwcGJ1eDNoaG1sNCJ9.ZMAvkce5f7auI58nefYT5A"
      }
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => (
        <div
          onClick={() =>
            setShowPopup({
              [entry.title]: true,
            })
          }
        >
          <Marker
            key={entry.title}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div>
              <svg
                className="marker"
                style={{
                  width: "24px",
                  height: "24px",
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
          {showPopup[entry.title] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top"
              dynamicPosition={true}
            >
              <div>
                <h3>{entry.title}</h3>
              </div>
            </Popup>
          ) : null}
        </div>
      ))}
      {addEntry ? (
        <>
          <Marker
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div>
              <svg
                className="marker"
                style={{
                  width: "24px",
                  height: "24px",
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
          <Popup
            className="pop"
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntry(null)}
            anchor="top"
            dynamicPosition={true}
          >
            <div>
              <LogEntryForm
                location={addEntry}
                onClose={() => {
                  setAddEntry(null);
                  getEntries();
                }}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
