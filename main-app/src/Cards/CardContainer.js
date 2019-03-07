import React from 'react';
import CardTemplate from './CardTemplate';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

class CardContainer extends React.Component{

    renderCard(){
        return <CardTemplate/>
        // return <CardTemplate  
        //             cardTitle = {card.title}
        //             cardLocatiom = {card.location}
        //             cardPhone = {card.phone}
        //             cardHours = {card.hours}
        //             cardURL = {card.url}
        //             cardDescription = {card.description}
        //             key = {card.service_id}
        //         />
    }
    // renderCards(cards){
    //   return cards.map(this.renderCard,)
    // }
    renderCards(num){
      for(var i=0; i<num; i++){
        return this.renderCard;
      }
    }



    render() {
        return (
            <div className='Card_Container'>
                {this.renderCards(10)}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
      category: state.lfS.leftMenu.catDrop,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onChange: (event) => dispatch({type: actionTypes.CATEGORY_CHANGE, payload: (event.target.value)})
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);