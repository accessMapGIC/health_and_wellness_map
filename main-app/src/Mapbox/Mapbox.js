import React from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";
// import '../node_modules/mapbox-gl/dist/mapbox-gl.css'
// import '../../node_modules/mapbox-gl/dist/'
// import ReactMapboxLanguage from '@mapbox/mapbox-gl-language';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Icon from '../images/logo_2blue.png';

const Mapbox = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 19,
  accessToken: 'pk.eyJ1IjoiYWNjZXNzbWFwcyIsImEiOiJjanF3b2NkM3QwMXo3NDJvMmIxcTBjeWMyIn0.crXErUpSUmm5hqXyvJyXBQ',
});

class MapboxComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      points: [],
      zoom: [16],
      center: [-73.578520, 45.505642],
      bearing: [-55],
    };
  }

  componentDidMount() {
    this.generateMarkers(this.props.cards);
  }

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

  addMarker = (card) => {
    const newPoint = {
      lng: card.y,
      lat: card.x,
      id: card.service_id,
    }
    const newPoints = this.state.points;
    newPoints.push(newPoint);
    this.setState({
      points: newPoints
    });
  };

  generateMarkers = (cards) => {
    cards.map(this.addMarker);
  };

  render() {
    const { points, zoom, center, bearing } = this.state;
    const image = new Image(30, 30);
    image.src = Icon;
    const images = ["SWH-Icon", image];
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
        <Layer
          type="symbol"
          id="points"
          layout={{ "icon-image": "SWH-Icon", "icon-allow-overlap": true }}
          images={images}
        >
          {points.map((point) => 
            <Feature 
              id={point.id} 
              coordinates={[point.lng,point.lat]}
            />)}
        </Layer>
      </Mapbox>
        
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.rtS.rightMenu.cards,
  }
};

export default connect(mapStateToProps) (MapboxComponent);