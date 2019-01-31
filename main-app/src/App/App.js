import React, { Component } from 'react';
import './App.scss';
import MapboxComponent from '../Mapbox/Mapbox';
import LeftHamburgerComponent from '../LeftBurgerMenu/LeftBurgerMenu';
import RightHamburgerComponent from '../RightBurgerMenu/RightBurgerMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RightHamburgerComponent pageWrapId={'page-wrap'} outerContainerId={'App'}/>
        <LeftHamburgerComponent pageWrapId={'page-wrap'} outerContainerId={'App'}/>
        <main id='page-wrap'>
          <MapboxComponent/>
        </main>
      </div>
    );
  }
}

export default App;
