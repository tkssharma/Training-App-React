'use strict';

import {
    combineReducers
} from 'redux';

import app from './App';
import auth from './Auth';
import user from './User';
import ui from './UI';
import trainer from './trainer';
import www from './WWW';
import DB from './DB';


import {
    routerReducer
} from 'react-router-redux';


const GenNextApp = combineReducers({
    app,
    auth,
    user,
    ui,
    trainer,
    www,
    DB,
    routing: routerReducer,
});


const rootReducer = (state, action) => {

    if (action.type === 'REDUX_RESET_STATE') {
        const {
            routing
        } = state
        state = {
            routing
        }
    }
    return GenNextApp(state, action);
}

export default rootReducer;
