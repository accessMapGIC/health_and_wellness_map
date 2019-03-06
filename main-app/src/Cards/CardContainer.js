import React from 'react';
import CardTemplate from './CardTemplate';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

class CardContainer extends React.Component{

    renderCard(color, title, location, phone, url, description, cardId){
        return <CardTemplate 
                    cardColor = {color} 
                    cardTitle = {title}
                    cardLocatiom = {location}
                    cardPhone = {phone}
                    cardURL = {url}
                    cardDescription = {description}
                    cardId = {cardId}
                />
    }



    render() {
        return (
            <div className='Card_Container'>
                {this.renderCard(
                    'redCard',
                    'Test Title',
                    'Test Location',
                    '123-456-7890',
                    'https://www.test.com',
                    'test description'
                )}
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