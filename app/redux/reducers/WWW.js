'use strict';


import {
    WWW_LOAD_TRAINING,
    WWW_LOAD_TRAININGS,
    WWW_UPDATE_CURRENT_REGISTER_FIELD,
    WWW_RESET_CURRENT_REGISTER_FIELDS,

    WWW_LOAD_REVIEWS,

    WWW_LOAD_TRAINER,
    WWW_LOAD_TRAINERS,
    WWW_SET_GEO,


} from 'app/redux/constants';

import _ from 'lodash';
import Immutable from 'immutable';

const www_default_data = Immutable.Map({
    training: Immutable.List([]),
    reviews: Immutable.List([]),
    loaded_training: Immutable.List([]),
    trainer: Immutable.List([]),
    loaded_trainer: Immutable.List([]),
    current_registration: Immutable.Map({
        id: '',
        booking: false,
        guests: 1,
        price: 0,
        panel: 'summary',
        payment_method: 0,
        // braintree_setup: false,
        // braintree_token: '',
        show_loading: false,
    }),
    host_profile: Immutable.Map({}),
    geo: Immutable.Map({
        place: '',
        lat: '',
        lng: '',
    }),

});



function WWW(www = www_default_data, action) {



    if (action.type === WWW_LOAD_TRAINING) {
        let loaded_training = www.get('loaded_training').push(action.payload);
        return www.set('loaded_training', loaded_training);
    } else if (action.type === WWW_LOAD_TRAININGS) {
        return www.set('training', Immutable.List(action.payload));
        /*
        let old_events = www.get('events').toArray();
        let new_events = action.payload;
        let final_events = _.unionBy( old_events, new_events, 'id' );
        return www.set('events', Immutable.List(final_events) );
        */
    } else if (action.type === WWW_LOAD_REVIEWS) {
        return www.set('reviews', Immutable.List(action.payload));
    } else if (action.type === WWW_UPDATE_CURRENT_REGISTER_FIELD) {
        return www.setIn(['current_registration', action.payload.key], action.payload.value);
    } else if (action.type === WWW_RESET_CURRENT_REGISTER_FIELDS) {
        // return www.setIn(['current_booking', action.payload.key ], action.payload.value );
        return www.set('current_registration', www_default_data.get('current_registration'));
    } else if (action.type === WWW_LOAD_TRAINER) {
        let loaded_trainer = www.get('loaded_trainer').push(action.payload);
        return www.set('loaded_trainer', loaded_trainer);
    } else if (action.type === WWW_LOAD_TRAINERS) {
        return www.set('trainer', Immutable.List(action.payload));
    } else if (action.type === WWW_SET_GEO) {
        return www.set('geo', Immutable.Map(action.payload));
    } else {
        return www;
    }


}


export default WWW;
