import React from 'react';
import { TrafficLightProvider } from './TrafficLightContext';
import TrafficLight from './TrafficLight';
import './App.css';

function App() {
  return (
    <TrafficLightProvider>
      <div className="app">
        <h1>Traffic Light Simulator</h1>
        <TrafficLight />
      </div>
    </TrafficLightProvider>
  );
}

export default App;
