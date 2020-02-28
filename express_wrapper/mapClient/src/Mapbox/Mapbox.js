import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup} from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import Icon from '../images/favicon-32x32.png';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link, scroller } from 'react-scroll';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

//Localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({
  en: english.mapboxStrings,
  fr: french.mapboxStrings
});

const Mapbox = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 19,
  accessToken: process.env.REACT_APP_MAPBOX_ACCESSTOKEN,
  attributionControl: false
});//instantiates the initial mapbox object

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
});//styling if you ever wanna make your own geolocate button

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
  text-align: center;
`;//styling for the popup

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
      dialogOpen: true
    };
  }


  componentDidMount() {
    this.generateMarkers(this.props.cards);
    strings.setLanguage(this.props.language);
    // console.log(this.props.activeCard);
  };//generates the markers once they've been loaded

  componentDidUpdate(prevProp) {
    if (this.props.language !== prevProp.language) {
      strings.setLanguage(this.props.language);
      this.forceUpdate();
    }
  }

  mapDidLoad = (map) => {
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
    }),'bottom-right');
    map.addControl(new mapboxgl.AttributionControl(), 'top-right');
  }//adds the geolocate control

  generateMarkers = (cards) => {
    cards.map(this.props.addPoint);
  };//this adds the points to the map

  markerClick = (lng, lat, id, title, address) => {
    this.props.closeRight();
    // this.setState({
    //   center: feature.geometry.coordinates,
    //   point: this.state.points[point],
    // })
    this.props.centerOnPoint([lng, lat], id, title, address);
    this.props.openRight();
    this.props.activateCard(id);
    scroller.scrollTo(id, {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: 'Card_Container',
      offset: -70, // Scrolls to element + 50 pixels down the page
    })
  }//the method that occurs when a marker is clicked

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const image = new Image(30, 30);
    image.src = Icon;
    const images = ["SWH-Icon", image];
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Do you allow Wellness Map access to your location."}</DialogTitle>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button 
            onClick= {() => {
              this.handleClose()
              window.navigator.geolocation.getCurrentPosition(
                (position)=> {
                  this.props.centerOnUser([position.coords.longitude, position.coords.latitude]);
                },
                ()=> {alert("There is an error in retrieving your location")})
            }}
            color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

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
              >
              <Link activeClass="active" to={"" + id} spy={true} smooth={true} offset={50} duration={500}/>
              </Feature>))}
          </Layer>
          {this.props.point && (
            <Popup key={this.props.point.id} coordinates={[this.props.point.lng, this.props.point.lat]}>
              <StyledPopup>
                <div>
                    <h3>{this.props.point.title}</h3>
                    <a href={'https://www.google.ca/maps/dir/' + this.props.point.address} target="_blank" rel="noopener noreferrer">{strings.dir}</a>
                </div>
              </StyledPopup>
            </Popup>
          )}
          {/* <Fab className={classes.myLocalButton} title="center on your location" prefetch="true"><geo/></Fab><MyLocationIcon/>} */}
        </Mapbox>
      </div>
    );
  }
}
// navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geoLocationError, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0})

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
    language: state.lang.language
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
    centerOnUser:(coordinates) => dispatch({
      type: actionTypes.CENTER_ON_USER,
      payload: {
        userCoords: coordinates,
      }
    })
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MapboxComponent);
