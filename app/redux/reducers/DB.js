'use strict';

import {
	UPDATE_FIELD,
	UPDATE_SECTION,

	UPDATE_TABS,
	UPDATE_LOADED,
	SET_MESSAGES,
	UPDATE_MESSAGES,



} from 'app/redux/constants/DB';


import Immutable from 'immutable';

const default_data = Immutable.Map({
	training: Immutable.List([]),
	trainer: Immutable.List([]),
	user: Immutable.Map({}),
	config: Immutable.Map({
		event_layout: 'list',
	}),
	training_filter: Immutable.Map({
		visible: false,
		keyword: '',
		date_from: null,
		date_to: null,
		guest_min: 0,
		guest_max: 0,
		price_min: 9,
		price_max: 20000, // 160
		training_preferences: [],
		others: [],
	}),
	discountmaker: Immutable.Map({
		visible: false,
		closed: false,
		text: '',
		processing: false,
	}),

	review_data: Immutable.Map({}),
	user_review: Immutable.Map({
		processing: false,
		submitted: false,

		would_recommend: null,
		experience: '',
		private: '',
		cleanliness: 0,
		communication: 0,
		rules: 0,
		forus: '',
	}),
	registration: Immutable.List([]),
	trainer_training: Immutable.List([]),
	webinar: Immutable.List([]),
	account: Immutable.Map({}),
	settings: Immutable.Map({}),
	messages: Immutable.List([]),
	tabs: Immutable.Map({
		user_messages: 'inbox',
	}),
	loaded: Immutable.Map({
		user_messages: false,
		review_data: false,
	}),
	loading: Immutable.Map({
		user_messages: false,
		review_data: false,
	}),


	verify_phone: Immutable.Map({
		requested: false,
		modal: false,
		processing: false,
	}),


	_temp: Immutable.Map({}),


});



function DB( db = default_data, action ) {



	if ( action.type === UPDATE_FIELD ) {
		return db.setIn([ action.payload.section, action.payload.key ], action.payload.value );
	}


	else if ( action.type === UPDATE_SECTION ) {
		return db.set( action.payload.section, action.payload.value );
		// return db.set( action.payload.section, Immutable.fromJS(action.payload.value) );
	}




	else if ( action.type === UPDATE_TABS ) {
		return db.setIn(['tabs', action.payload.key ], action.payload.value );
	}


	else if ( action.type === UPDATE_LOADED ) {
		return db.setIn(['loaded', action.payload.key ], action.payload.value );
	}






	else if ( action.type === SET_MESSAGES ) {
		return db.set('messages', Immutable.List(action.payload) );
	}
	else if ( action.type === UPDATE_MESSAGES ) {
		console.log('action.payload',action.payload);
		// let messages = db.get('messages');
			// messages.push( Immutable.Map(action.payload) );
		// return db.get('messages').push( Immutable.Map(action.payload) );
		// let messages = db.get('messages').push( Immutable.Map(action.payload) );
		// console.log('messages',messages);
		// return db.set('messages', messages);
		return db.set('messages', db.get('messages').push(action.payload));
	}














	else {
		return db;
	}


}


export default DB;
