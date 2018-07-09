import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';


const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,
});

export default reducers;
