import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import healthReducer from './healthSlice';
import changeViewReducer from './utilsSlice';
import fitnessReducer from './fitnessSlice'
import toggleReducer  from './toggle';
import agendaReducer from './agendaSlice';
import sleepReducer from './sleepSlice'
import dietReducer from './dietSlice'; 



    const store =configureStore({
        reducer: {
            changeView: changeViewReducer,
            fitness: fitnessReducer,
            toggle:toggleReducer,
            agenda:agendaReducer,
            sleep: sleepReducer,
            diet: dietReducer, 
        },
    }); 


export { store };
