import React from 'react';
import logo from './logo.svg';
import './App.css';
import { wizard } from './homework/3.3';

function App() {
  wizard.introduce('I am the mighty wizard');
  wizard.castSpell();
  wizard.levelUp(); // Level up! New level is 16
  return <div className="App"></div>;
}

export default App;
