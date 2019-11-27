import React, { Component } from 'react';
import './App.scss';
import MapboxComponent from '../Mapbox/Mapbox';
import SidebarsComponent from '../Sidebars/Sidebars';
import ModalComponent from '../App/Modal';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ModalComponent/>
        <SidebarsComponent pageWrapId={'page-wrap'} outerContainerId={'App'}/>
        <main id='page-wrap'>
          <MapboxComponent/>
        </main>
        
      </div>
    );
  }
}

export default App;
