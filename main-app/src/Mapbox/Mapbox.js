import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup} from "react-mapbox-gl";
// import '../node_modules/mapbox-gl/dist/mapbox-gl.css'
// import '../../node_modules/mapbox-gl/dist/'
// import ReactMapboxLanguage from '@mapbox/mapbox-gl-language';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import Icon from '../images/favicon-32x32.png';
import { withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { compose } from 'redux';
import styled from 'styled-components';


const Mapbox = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 19,
  accessToken: 'pk.eyJ1IjoiYWNjZXNzbWFwcyIsImEiOiJjanF3b2NkM3QwMXo3NDJvMmIxcTBjeWMyIn0.crXErUpSUmm5hqXyvJyXBQ',
});

const styles = theme => ({
  myLocalButton: {
    // margin: theme.spacing.unit,
    width: '42px',
    height: '42px',
    color: 'white',
    backgroundColor: '#4ec3c7',
    '&:hover': {
      backgroundColor: '#4ec3c7',
    },
    position: 'absolute',
    right: '50%',
  }
});

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
  text-align: center;
`;

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

  componentDidMount() {
    this.generateMarkers(this.props.cards);
    // console.log(this.props.activeCard);
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

  // addMarker = (card) => {
  //   const newPoint = {
  //     lng: card.y,
  //     lat: card.x,
  //     id: card.service_id,
  //     title: card.title,
  //   }
  //   const newPoints = this.state.points;
  //   newPoints.push(newPoint);
  //   this.setState({
  //     points: newPoints,
  //     // onlyPtCoords: newCoords,
  //   });

  // };

  // getUserLocation = () => {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.props.centerOnUser);
  //   }
  // }

  generateMarkers = (cards) => {
    cards.map(this.props.addPoint);
  };

  markerClick = (lng, lat, id, title, address) => {
    this.props.closeRight();
    // this.setState({
    //   center: feature.geometry.coordinates,
    //   point: this.state.points[point],
    // })
    this.props.centerOnPoint([lng, lat], id, title, address);
    this.props.openRight();
    this.props.activateCard(id)
  }

  render() {
    const { classes } = this.props;
    const image = new Image(30, 30);
    image.src = Icon;
    const images = ["SWH-Icon", image];
    return (
      <Mapbox
        // eslint-disable-next-line
        style='mapbox://styles/mapbox/streets-v10'
        center={this.props.center}
        zoom={this.props.zoom}
        onStyleLoad={this.mapDidLoad}
        bearing={this.props.bearing}
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
          {(this.props.points).map(({lng, lat, id, title, address}) => (
            <Feature 
              id={id}
              key={id}
              coordinates={[lng,lat]}
              onClick={this.markerClick.bind(this, lng, lat, id, title, address)}
            />))}
        </Layer>
        {this.props.point && (
          <Popup key={this.props.point.id} coordinates={[this.props.point.lng, this.props.point.lat]}>
            <StyledPopup>
              <div>{this.props.point.title}</div>
              <div>
                <a href={'https://www.google.ca/maps/?q=' + this.props.point.address} target="_blank" rel="noopener noreferrer">get directions</a>
              </div>
            </StyledPopup>
          </Popup>
        )}
        <Fab className={classes.myLocalButton} title="center on your location" prefetch="true" onClick={this.props.centerOnUser}><MyLocationIcon/></Fab>
      </Mapbox>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.rtS.rightMenu.cards,
    activeCard: state.rtS.rightMenu.activeCard,
    points: state.mpB.points,
    point: state.mpB.point,
    zoom: state.mpB.zoom,
    center: state.mpB.center,
    bearing: state.mpB.bearing,
    userCoords: state.mpB.userCoords,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    openRight: () => dispatch({type: actionTypes.OPEN_RIGHT}), 
    closeRight: () => dispatch({type: actionTypes.CLOSE_RIGHT}),
    activateCard: (service_id) => dispatch({
      type: actionTypes.ACTIVATE_CARD, 
      payload: service_id
    }),
    addPoint: (card) => dispatch({
      type: actionTypes.ADD_POINT,
      payload: {
        lng: card.y,
        lat: card.x,
        id: card.service_id,
        title: card.title,
        address: card.address,
      }
    }),
    centerOnPoint:(coordinates, id, title, address) => dispatch({
      type: actionTypes.CENTER_ON_POINT,
      payload: {
        center: coordinates,
        id: id, 
        title: title,
        address: address,
      }
    }),
    centerOnUser:() => dispatch({type: actionTypes.CENTER_ON_USER}) 
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps), 
)(MapboxComponent);