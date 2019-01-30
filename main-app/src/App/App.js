import React, { Component } from 'react';
import './App.scss';
import MapboxComponent from '../Mapbox/Mapbox';
import HamburgerComponent from '../LeftBurgerMenu/LeftBurgerMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HamburgerComponent pageWrapId={'page-wrap'} outerContainerId={'App'}/>
        <main id='page-wrap'>
          <MapboxComponent/>
        </main>
      </div>
    );
  }
}

export default App;
