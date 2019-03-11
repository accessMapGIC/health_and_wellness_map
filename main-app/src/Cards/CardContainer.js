import React from 'react';
import CardTemplate from './CardTemplate';
import data from "../store/newOutput.json";

class CardContainer extends React.Component{
    renderCard(item){
        return <CardTemplate
          title={item.name}
          address={item.address}
          phone={item.phone}
          hours={item.hours}
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
//       category: state.lfS.leftMenu.catDrop,
//     }
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       onChange: (event) => dispatch({type: actionTypes.CATEGORY_CHANGE, payload: (event.target.value)})
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