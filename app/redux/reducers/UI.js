'use strict';

import {AUTH_UPDATE_USER_DATA, UI_PROCESSING_UPDATE_FIELD, UI_MODALS_UPDATE_FIELD, UI_LOADED_UPDATE_FIELD} from 'app/redux/constants';

import Immutable from 'immutable';

const ui_default_data = Immutable.Map({

    modals: Immutable.Map({update_password: false, how_it_works: false}),

    processing: Immutable.Map({
        user_account: false,
        update_password: false,
        user_to_trainer: false,

        trainer_settings: false,

        load_training: false,
        training_create: false,
        training_update: false,

        load_webinar: false,
        webinar_create: false,
        webinar_update: false,

        user_load_training: false,
        www_training: false,
        www_trainers: false
    }),

    loaded: Immutable.Map({
        training: false, webinar: false,

        // host_events: false

        user_training: false,
        www_training: false,
        www_trainers: false,

        last_query_location_events: '',
        last_query_location_hosts: ''
    })
});

function UIStore(ui = ui_default_data, action) {

    if (action.type === AUTH_UPDATE_USER_DATA) {
        if (action.payload && !action.payload.hasPassword) {
            return ui.setIn([
                'modals', 'update_password'
            ], true);
        }
        return ui;
    } else if (action.type === UI_MODALS_UPDATE_FIELD) {
        return ui.setIn([
            'modals', action.payload.key
        ], action.payload.value);
    } else if (action.type === UI_PROCESSING_UPDATE_FIELD) {
        return ui.setIn([
            'processing', action.payload.key
        ], action.payload.value);
    } else if (action.type === UI_LOADED_UPDATE_FIELD) {
        return ui.setIn([
            'loaded', action.payload.key
        ], action.payload.value);
    } else {
        return ui;
    }

}

export default UIStore;
