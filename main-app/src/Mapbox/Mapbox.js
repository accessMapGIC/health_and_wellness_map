import React from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, Marker } from "react-mapbox-gl";
// import '../node_modules/mapbox-gl/dist/mapbox-gl.css'
// import '../../node_modules/mapbox-gl/dist/'
// import ReactMapboxLanguage from '@mapbox/mapbox-gl-language';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import Icon from '../images/favicon-32x32.png';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

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
      point: {},
      zoom: [16],
      center: [-73.5731, 45.501],//[-73.578520, 45.505642],
      bearing: [-55],
      userCoords: [],
    };
  }

  componentWillMount() {
    this.getUserLocation();
  }

  componentDidMount() {
    this.generateMarkers(this.props.cards);
  }

  // handleClick = (map, ev) => {
  //   const { lng, lat } = ev.lngLat;
  //   var { points } = this.state;
  //   points = [...points, [lng, lat]];
  //   const zoom = [map.transform.tileZoom + map.transform.zoomFraction];
  //   this.setState({
  //     points,
  //     zoom,
  //     center: map.getCenter()
  //   });
  // };

  addMarker = (card) => {
    const newPoint = {
      lng: card.y,
      lat: card.x,
      id: card.service_id,
      title: card.title,
      ref: card.ref,
    }
    const newPoints = this.state.points;
    newPoints.push(newPoint);
    this.setState({
      points: newPoints,
      // onlyPtCoords: newCoords,
    });
  };

  generateMarkers = (cards) => {
    cards.map(this.addMarker);
  };

  markerClick = (point, { feature }) => {
    this.props.closeRight();
    this.setState({
      center: feature.geometry.coordinates,
      point: point,
    })
    this.props.openRight();
    this.props.activateCard(feature.properties.id)
  }
  getUserLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.centerOn)
    }
  }
  centerOn = (position) => {
    console.log([position.coords.longitude, position.coords.latitude]);
    this.setState({
      center: [position.coords.longitude, position.coords.latitude],
      userCoords: [position.coords.longitude, position.coords.latitude]
    })
  }

  render() {
    const { points, zoom, center, bearing, userCoords} = this.state;
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
        // fitBounds={onlyPtCoords}
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
          {points.map((point) => (
            <Feature 
              id={point.id}
              key={point}
              ref={point.ref}
              coordinates={[point.lng,point.lat]}
              onClick={this.markerClick.bind(this, points[point])}
            />))}
        </Layer>
        <Marker
          coordinates={userCoords}
          anchor="bottom">
          <AccessibilityNewIcon/>
        </Marker>
      </Mapbox>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.rtS.rightMenu.cards,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    openRight: () => dispatch({type: actionTypes.OPEN_RIGHT}), 
    closeRight: () => dispatch({type: actionTypes.CLOSE_RIGHT}),
    activateCard: (service_id) => dispatch({
      type: actionTypes.ACTIVATE_CARD, 
      payload: service_id
    })    
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MapboxComponent);