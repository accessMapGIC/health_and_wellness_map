import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
// import ReactMapboxLanguage from '@mapbox/mapbox-gl-language';

const Mapbox = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 19,
  accessToken: 'pk.eyJ1IjoiYWNjZXNzbWFwcyIsImEiOiJjanF3b2NkM3QwMXo3NDJvMmIxcTBjeWMyIn0.crXErUpSUmm5hqXyvJyXBQ',
});
const zoom = [16];
// const center = [-73.577222222222, 45.504166666667];
const center = [-73.578520, 45.505642];
const bearing = [-55];
// const language = new ReactMapboxLanguage();

const MapboxComponent = () => (
  <Mapbox
    // eslint-disable-next-line
    style='mapbox://styles/mapbox/streets-v10'
    center={center}
    zoom={zoom}
    bearing={bearing}
    containerStyle={{
      height: '100vh',
      width: '100vw',
    }}>
      </Mapbox>
);

MapboxComponent.displayName = 'MapboxComponent';

// MapboxComponent.addControl(language);

export default MapboxComponent;