import React from 'react';
import CardTemplate from './CardTemplate';
// import { compose } from 'redux';
// import data from "../store/newOutput.json";
import { connect } from 'react-redux';
// import * as actionTypes from '../store/actions';
import {Element} from 'react-scroll';

class CardContainer extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          activeCard: null
        };
      }

    handleClick = (service_id) => this.setState({ activeCard: service_id }) //this is how we set the activeCard

    getDistanceFromLatLonInKm = (lon1, lat1,lon2,lat2) => {
      var R = 6371;
      var dLat = this.deg2rad(lat2-lat1);
      var dLon = this.deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }
    
    deg2rad = (deg) => {
      return deg * (Math.PI/180)
    }

    sortService = (serviceData) => {
      let sortedCards = serviceData.map(service => {
        let distance = 10000;
        if(service.x && service.y){
          distance = this.getDistanceFromLatLonInKm(this.props.userCoords[0], this.props.userCoords[1], service.y, service.x);
        };
        service['distance'] = distance;
        return service;
      })
      sortedCards.sort((a, b) => {
        return a.distance - b.distance;
      });
      return sortedCards;
    }

    render(){
      let cards = this.props.data; //this is where we subscribe to the redux data that changes when a query is run
      if(cards) {
        cards = this.sortService(cards);
      };
      return (
        <div className='Card_Container' style={{height: "80%"}} id='Card_Container'>
          {
            cards.map((card) =>
              <Element name={"" + card.service_id} key={card.service_id}>
                <CardTemplate
                  title={card.name}
                  address={card.address}
                  phone={card.phone}
                  hours={card.hours}
                  url={card.url}
                  x={card.x}
                  y={card.y}
                  service_id={card.service_id}
                  notes={this.props.language === 'fr' ? card.notes_fr : card.notes}
                  key={card.service_id}
                />
              </Element>
            )}
        </div>
      )
    }
}

const mapStateToProps = state => {
  return {
    userCoords: state.mpB.userCoords,
    activeCard: state.rtS.rightMenu.activeCard,
    data: state.lfS.data,
    language: state.lang.language
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     activateCard: (service_id) => dispatch({
//       type: actionTypes.ACTIVATE_CARD,
//       payload: service_id
//     })
//   }
// }

export default connect(mapStateToProps)(CardContainer);
