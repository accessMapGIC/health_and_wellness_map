import React from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";
// import '../node_modules/mapbox-gl/dist/mapbox-gl.css'
// import '../../node_modules/mapbox-gl/dist/'
// import ReactMapboxLanguage from '@mapbox/mapbox-gl-language';

const Mapbox = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 19,
  accessToken: 'pk.eyJ1IjoiYWNjZXNzbWFwcyIsImEiOiJjanF3b2NkM3QwMXo3NDJvMmIxcTBjeWMyIn0.crXErUpSUmm5hqXyvJyXBQ',
});

class MapboxComponent extends React.Component {
  state = {
    points: [
    ],
    zoom: [16],
    center: [-73.578520, 45.505642],
    bearing: [-55],
  };
  handleClick = (map, ev) => {
    const { lng, lat } = ev.lngLat;
    var { points } = this.state;
    points = [...points, [lng, lat]];
    const zoom = [map.transform.tileZoom + map.transform.zoomFraction];
    this.setState({
      points,
      zoom,
      center: map.getCenter()
    });
  };
  render() {
    const { points, zoom, center, bearing } = this.state;
    const image = new Image(20, 30);
    // image.src = Icon;
    const images = ["myImage", image];
    return (
      <Mapbox
        // eslint-disable-next-line
        style='mapbox://styles/mapbox/streets-v10'
        center={center}
        zoom={zoom}
        bearing={bearing}
        localIdeographFontFamily={'dinreg'}
        containerStyle={{
          height: '100vh',
          width: '100vw',
      }}>
        {/* <Layer
          type="symbol"
          id="points"
          layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
          images={images}
        >
          {points.map((point, i) => <Feature key={i} coordinates={point} />)}
        </Layer> */}
      </Mapbox>
        
    );
  }
}

export default MapboxComponent;