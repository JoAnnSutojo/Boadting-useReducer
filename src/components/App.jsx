import React, { useReducer } from 'react';
import '../components/App.css'

const initialState = {
    engine: 'OFF',
    gear: 0,
    speed: 0,
    distanceTravelled: 0
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'power': {
            return  {
                ...state, 
                engine: state.engine === 'OFF' ? 'ON' : 'OFF', 
                gear: state.engine === 'ON' ? 0 : state.gear,
                speed: state.engine === 'ON' ? 0 : state.speed,
             }
        }
        case 'gearUp': 
            if (state.engine === 'ON') {
            return {...state, gear: state.gear === 5 ?  state.gear : state.gear + 1}
        } else return state;
        case 'gearDown': 
             if (state.engine === 'ON') {
            return {...state, gear: state.gear === -2 ? state.gear :  state.gear - 1}
        } else return state;
        case 'accelerate': 
             if (state.engine === 'ON' && state.gear !== 0) {
            return {...state, speed: state.speed + (10 * state.gear)}
        } else return state;
        case 'decelerate': 
             if (state.engine === 'ON' && state.gear !== 0) {
            return {...state, speed: state.speed === 0 ? state.speed : state.speed - 10}
        } else return state;
        default: {
            throw new Error();
        }
    } 
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className='container'>
            <h1>Boat UI</h1>
            <div>
                <h2>Engine {state.engine}</h2>
                <h2>Gear: {state.gear}</h2>
                <h2>Speed: {state.speed} Km/h</h2>
                <h2>Distance travelled: {state.distanceTravelled} Km</h2>
            </div>
            <div>
                <button onClick={() => dispatch({type: 'power'})}>Start/Stop</button>
                <button onClick={() => dispatch({type: 'gearUp'})}>Gear Up</button>
                <button onClick={() => dispatch({type: 'gearDown'})}>Gear Down</button>
                <button onClick={() => dispatch({type: 'accelerate'})}>Accelerate</button>
                <button onClick={() => dispatch({type: 'decelerate'})}>Decelerate</button>
            </div>
        </div>

    )
}

export default App;