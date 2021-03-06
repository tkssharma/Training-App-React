'use strict';

import Auth from 'app/redux/api/Auth';
import axios from 'axios';
import * as API from 'app/api'
import { message } from 'antd';
import { browserHistory } from 'react-router';

import * as Action from 'app/redux/actions';
import jwt from 'jsonwebtoken';


function authenticatedUsersOnly( nextState, replace ) {
	if( nextState.location.pathname != '/user/dashboard' ) {
		if ( sessionStorage.redirect_after_login ) {
			localStorage.removeItem('redirect_after_login');
		}
		sessionStorage.setItem( 'redirect_after_login', nextState.location.pathname);
	}

	if ( !Auth.loggedIn() ) {
		replace({
			pathname: '/auth/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}


function userTypeHostOnly( nextState, replace, store ) {
	const state = store.getState();

	if ( state.auth.get('user').get('userType') != 2 ) {
		replace({
			pathname: '/user/dashboard',
			state: { nextPathname: nextState.location.pathname }
		});
	}

}



function authenticatedHostsOnly( nextState, replace, store ) {
	authenticatedUsersOnly(nextState, replace);
	userTypeHostOnly(nextState, replace, store);
}



function notLoggedIn( nextState, replace ) {
	if ( Auth.loggedIn() ) {
		replace({
			pathname: '/user/dashboard',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}



function logoutUser( nextState, replace ) {
	Auth.logout();
	replace({
		pathname: '/user/dashboard',
		state: { nextPathname: nextState.location.pathname }
	});

}





function loadGoogleMapsScript( nextState, replace, done ) {

	if( ! window.google ) {
		let infoMessage = message.info('Loading google maps api for location search...', 0);
		let script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBb7Ms5zllURVGWoJ2QJx6_jly8gyqKY6g&libraries=places';
		script.async = true;
		script.onload = () => {
			infoMessage();
			// console.log('script loaded', window.google);
			done();
		}
		document.head.appendChild(script);
	} else {
		done();
	}

}









function userChangesEventView( nextState, replace, store ) {
	const state = store.getState();
	if ( state.www.get('current_booking').get('booking') === false ) {
		store.dispatch( Action.wwwUpdateCurrentBookingField({ key: 'guests', value: 1 }) );
	}
}



export { authenticatedUsersOnly };
export { notLoggedIn };
export { logoutUser };
export { userTypeHostOnly };
export { authenticatedHostsOnly };

export { loadGoogleMapsScript };
export { userChangesEventView };


