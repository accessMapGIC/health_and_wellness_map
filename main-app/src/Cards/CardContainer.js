import React from 'react';
import CardTemplate from './CardTemplate';
import data from "../store/newOutput.json";
// import * as actionTypes from "../store/actions";
// import { compose } from 'redux';
// import { connect } from 'react-redux';


class CardContainer extends React.Component{
    renderCard(item){
      console.log(item.service_id);
        return <CardTemplate
          title={item.name}
          address={item.address}
          phone={item.phone}
          hours={item.hours}
          url={item.url}
          x={item.x}
          y={item.y}
          service_id={item.service_id}
          key={item.service_id}
          />
    }

    renderCards(cardData){
      // for(var i=0; i<10; i++){
      //   console.log(i);
      //   return this.renderCard(cardData[i]);
      // }
      return cardData.map(this.renderCard);
    }



    render() {
        return (
            <div className='Card_Container'>
                {this.renderCards(data)}
            </div>
        )
    }

}

// const mapStateToProps = state => {
//     return {
//       service_id: {
//         name: state.rtS.rightMenu.cards,
//         title: state.rtS.rightMenu.cards,
//         address: state.rtS.rightMenu.cards,
//         hours: state.rtS.rightMenu.cards,
//       }
//     }
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       addCard: (item) => dispatch({type: actionTypes.ADD_CARD, payloadA: item.name, payloadAd: item.address, payloadP: item.phone, payloadH: item.hours, payloadS: item.service_id})
//     }
//   }
  
  export default (CardContainer);


  //connect(mapStateToProps, mapDispatchToProps)
  // return <CardTemplate  
//             cardTitle = {card.title}
//             cardLocatiom = {card.location}
//             cardPhone = {card.phone}
//             cardHours = {card.hours}
//             cardURL = {card.url}
//             cardDescription = {card.description}
//             key = {card.service_id}
//         />
// renderCards(cards){
//   return cards.map(this.renderCard,)
// }