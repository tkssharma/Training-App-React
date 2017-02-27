'use strict';

import {
    TRAINER_CREATE_TRAINING_MANY,
    TRAINER_CREATE_TRAINING,
    TRAINER_UPDATE_TRAINING,
    TRAINER_UPDATE_TRAINING_SECTION,

    TRAINER_CREATE_TRAINING_ACTION_MANY,
    TRAINER_CREATE_TRAINING_ACTION,
    TRAINER_UPDATE_TRAINING_ACTION,
    TRAINER_DELETE_TRAINING_FIELD,

    TRAINER_CREATE_WEBINAR_MANY,
    TRAINER_CREATE_WEBINAR,
    TRAINER_UPDATE_WEBINAR
} from 'app/redux/constants';

import Immutable from 'immutable';


const trainer_default_data = Immutable.Map({

    actions: Immutable.List([{
        training_id: 'STATIC-001',
        current_tab: 'general',
    }, {
        training_id: 'STATIC-002',
        current_tab: 'general',
    }, ]),

    training: Immutable.List([]),
    webinar: Immutable.List([]),
});


function Trainer(trainer = trainer_default_data, action) {

    if (action.type === TRAINER_CREATE_TRAINING_MANY) {
        return trainer.set('training', Immutable.List(action.payload));
    } else if (action.type === TRAINER_CREATE_TRAINING) {
        return trainer.set('training', trainer.get('training').push(action.payload));
    } else if (action.type === TRAINER_UPDATE_TRAINING) {
        let trainingIndex = trainer.get('training').findIndex(item => {
            return item.id == action.payload.id;
        });
        let updatedTraining = trainer.get('training').update(trainingIndex, (training) => {
            return Object.assign({}, training, action.payload);
        });
        return trainer.set('training', updatedTraining);
    }
    if (action.type === TRAINER_DELETE_TRAINING_FIELD) {
        let trainingIndex = trainer.get('training').findIndex(item => {
            return item.id == action.payload.id;
        });
        let updatedTraining = trainer.get('training').update(trainingIndex, (event) => {
            delete event[action.payload.field];
            return event;
        });
        return trainer.set('training', updatedTraining);
    } else if (action.type === TRAINER_UPDATE_TRAINING_SECTION) {
        let trainingIndex = trainer.get('training').findIndex(item => {
            return item.id == action.payload.id;
        });
        let updatedTraining = trainer.get('training').update(trainingIndex, (event) => {
            return Object.assign({}, event, {
                [action.payload.section]: action.payload.value
            });
        });
        return trainer.set('training', updatedTraining);
    } else if (action.type === TRAINER_CREATE_TRAINING_ACTION_MANY) {
        let updatedActions = trainer.get('actions');
        action.payload.map((id) => {
            updatedActions = updatedActions.push({
                training_id: id,
                current_tab: 'general'
            });
        });
        return trainer.set('actions', updatedActions);
    } else if (action.type === TRAINER_CREATE_TRAINING_ACTION) {
        return trainer.set('actions', trainer.get('actions').push({
            training_id: action.payload,
            current_tab: 'general'
        }));
    } else if (action.type === TRAINER_UPDATE_TRAINING_ACTION) {
        let actionIndex = trainer.get('actions').findIndex(item => {
            return item.training_id == action.payload.id;
        });
        let updatedAction = trainer.get('actions').update(actionIndex, (eventAction) => {
            return Object.assign({}, eventAction, {
                [action.payload.key]: action.payload.value
            });
        });
        return trainer.set('actions', updatedAction);
    } else if (action.type === TRAINER_CREATE_WEBINAR_MANY) {
        return trainer.set('webinar', Immutable.List(action.payload));
    } else if (action.type === TRAINER_CREATE_WEBINAR) {
        return trainer.set('webinar', trainer.get('webinar').push(action.payload));
    } else if (action.type === TRAINER_UPDATE_WEBINAR) {
        let webinarIndex = trainer.get('webinar').findIndex(item => {
            return item.id == action.payload.id;
        });
        let updatedWebinar = trainer.get('webinar').update(webinarIndex, (webinar) => {
            return Object.assign({}, webinar, action.payload);
        });
        return trainer.set('webinar', updatedWebinar);
    } else {
        return trainer;
    }


}



export default Trainer;
