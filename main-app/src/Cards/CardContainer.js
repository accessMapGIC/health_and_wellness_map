import React from 'react';
import CardTemplate from './CardTemplate';
import data from "../store/newOutput.json";
// import * as actionTypes from "../store/actions";
// import { compose } from 'redux';
// import { connect } from 'react-redux';


class CardContainer extends React.Component{
      state = {
        activeCard: null
      };
      // this.handleClick = this.handleClick.bind(this)

    handleClick = (service_id) => this.setState({ activeCard: service_id })

    // renderCard(item){
    //     return <CardTemplate
    //       title={item.name}
    //       address={item.address}
    //       phone={item.phone}
    //       hours={item.hours}
    //       url={item.url}
    //       x={item.x}
    //       y={item.y}
    //       service_id={item.service_id}
    //       key={item.service_id}
    //       onClick={ this.handleClick }
    //       isActive={ this.state.activeCard === item.service_id }
    //       />
    // }

    // renderCards(cardData){
    //   return cardData.map(this.renderCard);
    // }

    // render() {
    //     return (
    //         <div className='Card_Container'>
    //             {this.renderCards(data)}
    //         </div>
    //     )
    // }
    render(){
      const cards = data;
      return (
        <div className='Card_Container'>
          {
            cards.map(function(card) {
              return <CardTemplate
                title={card.name}
                address={card.address}
                phone={card.phone}
                hours={card.hours}
                url={card.url}
                x={card.x}
                y={card.y}
                service_id={card.service_id}
                key={card.service_id}
                // onClick={ this.handleClick }
                // isActive={ this.state.activeCard === card.service_id }
              />
            })
          }
        </div>
      )
    }
}
  
  export default (CardContainer);