'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import { Link, browserHistory } from 'react-router';
import { message, Spin } from 'antd';


import * as API from 'app/api'
import Auth from 'app/redux/api/Auth';
import axios from 'axios';
import jwt from 'jsonwebtoken';


const mapStateToProps = ( state, ownProps ) => {
	return {
		query: ownProps.location.query,
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		authUpdateUserData: (data) => dispatch( Action.authUpdateUserData(data) ),
	}
}

let ValidateTokenPage = (props) => {

	const access_token = props.query.token;
  console.log(access_token);
	if ( access_token ) {

		API.setAuthToken(access_token);
		axios.get( API.url('validate_auth') )
		.then( (response) => {
			if ( response.data.code === 200 && response.data.message === 'success' ) {
				message.success('Successfully logged in.', 3);
				Auth.setAccessToken(access_token);
				props.authUpdateUserData( jwt.decode(access_token) );
				browserHistory.push('/user/dashboard');
			} else {
				message.error('Invalid auth token, please try logging in again', 3);
				Auth.deleteAccessToken();
				API.setAuthToken();
				browserHistory.push('/auth/login');
			}
		})
		.catch( (response) => {
			console.log('catch error', response);
		});

	}

	  const ui_logo = (
			<div className="authlogo">
				  <Link to="/auth/login">
				      <img alt="Logo with text" class="" src="../images/logo.png"/>
				 </Link>
				</div>
		);


	const ui_no_access_token = (
		<div className="content">
			<h1>Access token not present</h1>
			<Link className="label-marker"  to="/auth/login" className="button default inline m-t-20">Try logging in again &rarr;</Link>
		</div>
	);

	const ui_verifying = (
		<div className="content">
			<h1>Verifying your access token, please wait...</h1>
			<div className="m-t-20 center">
				<Spin size="large" />
			</div>
		</div>
	);


	return (
		<div className="flex column">
			{ ui_logo }
			<div className="content-container">
				<div className="flex flex--jc-sa flex--align-center">
					{ access_token ? ui_verifying : ui_no_access_token }
				</div>
			</div>
		</div>
	)

}




const ConnectValidateTokenPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ValidateTokenPage)


export default ConnectValidateTokenPage;
