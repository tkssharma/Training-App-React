'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';

import Auth from 'app/redux/api/Auth';
import { message } from 'antd';


const mapStateToProps = ( state, ownProps ) => {
	return {
		user: state.auth.get('user'),
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		authResetUserData: () => dispatch( Action.authResetUserData() ),
		reduxResetState: () => dispatch( Action.reduxResetState() ),

	}
}




let LogoutPage = (props) => {

	// console.log('props.user',props.user);
	// if ( props.user.get('id') ) {
	if ( props.user.size > 0 ) {
		setTimeout( () => {
			Auth.logout();
			props.authResetUserData();
			props.reduxResetState();
			message.info('You have been successfully logged out', 3);
		}, 20 );
	}



	const ui_logo = (
		<div className="logo">
			<Link to="/auth/login">
				<img src="/images/logo.png" alt=""/>
			</Link>
		</div>
	);

	const ui_message_logout = (
		<div className="content">
			<h1>Logging you out right now...</h1>
			<p className="m-t-10">please be patient.</p>
		</div>
	);

	const ui_message_done = (
		<div className="content">
			<h1>You have been successfully logged out.</h1>
			<Link to="/auth/login" className="button default inline m-t-20">Login Again &rarr;</Link>
		</div>
	);

	return (
		<div className="flex column">

			{ ui_logo }

			<div className="content-container">
				<div className="flex flex--jc-sa flex--align-center">
					{ props.user.get('id') ? ui_message_logout : ui_message_done }
				</div>
			</div>

		</div>
	)

}



const ConnectLogoutPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(LogoutPage)


export default ConnectLogoutPage;


