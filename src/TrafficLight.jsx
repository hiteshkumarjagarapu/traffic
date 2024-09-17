import React, { useContext } from 'react';
import { TrafficLightContext } from './TrafficLightContext';
import './TrafficLight.css';

function TrafficLight() {
  const { state, dispatch } = useContext(TrafficLightContext);

  const handlePedestrianRequest = () => {
    
    if (!state.pedestrianRequest && state.currentLight !== 'Red') {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  const handleEmergencyOverride = () => {
    dispatch({ type: 'EMERGENCY_OVERRIDE' });
  };

  return (
    <div className="traffic-light-container">
      <div className={`light green ${state.currentLight === 'Green' ? 'active' : ''}`}></div>
      <div className={`light yellow ${state.currentLight === 'Yellow' ? 'active' : ''}`}></div>
      <div className={`light red ${state.currentLight === 'Red' ? 'active' : ''}`}></div>
      <div className="timer">{state.countdown}</div>

      <button className="pedestrian-button" onClick={handlePedestrianRequest}>
        Pedestrian Crossing
      </button>
      <button className="emergency-button" onClick={handleEmergencyOverride}>
        Emergency Override
      </button>
    </div>
  );
}

export default TrafficLight;
