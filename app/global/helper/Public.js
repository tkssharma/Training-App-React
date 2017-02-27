'use strict';

import { browserHistory } from 'react-router';

let config = { url: '', };



export default {


	event: {

		exists: ( data, props, redirect=true ) => {
			if ( ! data ) {
				config.url = props.location.pathname;
				if ( redirect ) {
					setTimeout( () => {
						browserHistory.push('/events');
					}, 2);
				}
				return false;
			} else {
				config.url = '';
				return true;
			}
		},

		checkRedirect: () => {
			if ( config.url ) {
				setTimeout( () => {
					browserHistory.push(config.url);
					config.url = '';
				}, 2);
			}
		},



	},







	host: {

		exists: ( data, props, redirect=true ) => {
			if ( ! data ) {
				config.url = props.location.pathname;
				if ( redirect ) {
					setTimeout( () => {
						browserHistory.push('/hosts');
					}, 2);
				}
				return false;
			} else {
				config.url = '';
				return true;
			}
		},

		checkRedirect: () => {
			if ( config.url ) {
				setTimeout( () => {
					browserHistory.push(config.url);
					config.url = '';
				}, 2);
			}
		},

		findById: (events, id) => {
			return events.find( (obj) => { return obj.id === id; });
		},


	},












}
