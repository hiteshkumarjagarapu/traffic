import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  currentLight: 'Green',
  pedestrianRequest: false,
  emergencyOverride: false,
  countdown: 10, 
  pedestrianCountdown: 5, 
};


const CHANGE_LIGHT = 'CHANGE_LIGHT';
const REQUEST_CROSSING = 'REQUEST_CROSSING';
const EMERGENCY_OVERRIDE = 'EMERGENCY_OVERRIDE';


function trafficLightReducer(state, action) {
  switch (action.type) {
    case CHANGE_LIGHT:
      return {
        ...state,
        currentLight: action.payload.light,
        countdown: action.payload.countdown,
        pedestrianRequest: action.payload.pedestrianRequest ?? state.pedestrianRequest,
      };
    case REQUEST_CROSSING:
      return { ...state, pedestrianRequest: true };
    case EMERGENCY_OVERRIDE:
      return { ...state, emergencyOverride: true, currentLight: 'Green', countdown: 10, pedestrianRequest: false };
    default:
      return state;
  }
}


const TrafficLightContext = createContext();


function TrafficLightProvider({ children }) {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  
  useEffect(() => {
    let timer;

    if (!state.emergencyOverride) {
      timer = setInterval(() => {
        switch (state.currentLight) {
          case 'Green':
            if (state.countdown > 0) {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Green', countdown: state.countdown - 1 } });
            } else if (state.pedestrianRequest) {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Red', countdown: 7, pedestrianRequest: false } });
            } else {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Yellow', countdown: 3 } });
            }
            break;
          case 'Yellow':
            if (state.countdown > 0) {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Yellow', countdown: state.countdown - 1 } });
            } else {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Red', countdown: 7 } });
            }
            break;
          case 'Red':
            if (state.pedestrianRequest && state.countdown <= 5) {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Red', countdown: 5, pedestrianRequest: false } });
            } else if (state.countdown > 0) {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Red', countdown: state.countdown - 1 } });
            } else {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'Green', countdown: 10 } });
            }
            break;
          default:
            break;
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [state]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
}


export { TrafficLightContext, TrafficLightProvider, CHANGE_LIGHT, REQUEST_CROSSING, EMERGENCY_OVERRIDE };
