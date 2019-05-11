import React from 'react';
import CardTemplate from './CardTemplate';
// import { compose } from 'redux';
import data from "../store/newOutput.json";
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

    render(){
      const cards = this.props.data; //this is where we subscribe to the redux data that changes when a query is run
      console.log(`Redux data: ${cards}`);
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
    activeCard: state.rtS.rightMenu.activeCard,
    data: state.lfS.data,
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
