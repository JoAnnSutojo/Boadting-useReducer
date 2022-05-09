import React, { useReducer, useEffect } from 'react';
import '../components/App.css'

const initialState = {
    engine: 'OFF',
    gear: 0,
    speed: 0,
    distance: 0
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'start': {
            //  start engine with 50% chance to fail
            if (Math.random() > 0.5) {
               return {
                   ...state,
                   engine: 'ON'
               }
            }
            return state;
        }
        case 'stop': {
            return {
                ...state,
                engine: 'OFF',
                gear: 0
            }
        }

        // start/stop button (start engine with 50% chance to fail)
        // case 'toggle': {
        //     if (state.engine === 'OFF' && Math.random() > 0.5) {
        //         return {
        //             ...state,
        //             engine: 'ON'
        //         }
        //     } else if (state.engine === 'OFF') {
        //         return state;
        //     } else {
        //         return {
        //             ...state,
        //             engine: 'OFF'
        //         }
        //     }
        // }

        case 'move': {
            return {
                ...state,
                distance: state.distance + state.speed
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
            return {...state, speed: state.speed + Math.abs(10 * state.gear)}
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

    // Bonus
    // The setInterval() method calls a function at specified intervals (in milliseconds).
    // 1 second = 1000 milliseconds.

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: 'move'
            })
        }, 1000)
        return () => { clearInterval(interval)};
    }, [])

    return (
        <div className='container'>
            <h1>Boating with useReducer</h1>
            <div>
                <h2>Engine {state.engine}</h2>
                <h2>Gear: {state.gear}</h2>
                <h2>Speed: {state.speed} Km/h</h2>
                <h2>Distance travelled: {state.distance} Km</h2>
            </div>
            <div>
                <button onClick={() => dispatch({type: 'start'})}>Start Engine</button>
                <button onClick={() => dispatch({type: 'stop'})}>Stop Engine</button>
                <button onClick={() => dispatch({type: 'gearUp'})}>Gear Up</button>
                <button onClick={() => dispatch({type: 'gearDown'})}>Gear Down</button>
                <button onClick={() => dispatch({type: 'accelerate'})}>Accelerate</button>
                <button onClick={() => dispatch({type: 'decelerate'})}>Decelerate</button>
            </div>
        </div>

    )
}

export default App;