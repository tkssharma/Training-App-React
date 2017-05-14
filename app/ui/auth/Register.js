'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import { Link, browserHistory } from 'react-router';
import { Row, Col, Spin, Alert, notification } from 'antd';
import * as InputHelper from 'app/utils/helpers/Input';
import config from 'app/global/config';


const mapStateToProps = ( state, ownProps ) => {
	return {
		register: state.auth.get('register'),
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		authSubmitRegisterForm: (status) => dispatch( Action.authSubmitRegisterForm(status) ),
		authUpdateRegisterFormField: (data) => dispatch( Action.authUpdateRegisterFormField(data) ),
		authInvalidateRegisterForm: (value) => dispatch( Action.authInvalidateRegisterForm(value) ),
		authServerRegisterUser: (value) => dispatch( Action.authServerRegisterUser(value) ),
	}
}




let RegisterPage = (props) => {

	// get data from state and assign 
	// 
	let user_name = props.register.get('name');
	let user_email = props.register.get('email');
	let user_phone = props.register.get('phone');
	let user_password = props.register.get('password');
	let user_password_confirm = props.register.get('password_confirm');



	let handleSubmit = ( event ) => {

		event.preventDefault();
		props.authSubmitRegisterForm(true);

		let errorHandler = ( message, description ) => {
			setTimeout( () => {
				notification.error({ message: message, description: description });
				props.authInvalidateRegisterForm(true);
				props.authSubmitRegisterForm(false);
			}, 50);
		}

		if ( !user_name || !user_email || !user_password || !user_password_confirm ) {
			errorHandler('Error Occoured!', 'Please enter all the fields.')
		}
		else if ( ! InputHelper.validateEmail(user_email) ) {
			errorHandler('Invalid Email', 'Please enter a valid email address.')
		}
		else if ( user_password != user_password_confirm ) {
			errorHandler('Password Mismatch', 'Your password and verify password is not same.')
		}
		else {
			props.authInvalidateRegisterForm(false);
			props.authServerRegisterUser({
				name: user_name,
				email: user_email,
				phone: user_phone,
				password: user_password,
				verify_password: user_password_confirm
			});
		}


	}








	let handleInputChange = ( event, field ) => {
		let value = event.target.value;
		props.authUpdateRegisterFormField( { field, value } );
	}





			const ui_logo = (
			<div className="authlogo">
				  <Link to="/auth/login">
				      <img alt="Logo with text" class="" src="../images/logo.png"/>
				 </Link>
				</div>
		);

	const ui_links = (
		<div className="social">
			<a href={ config.social.facebook } className="button block facebook"><i className="fa fa-facebook-official" aria-hidden="true"></i> Login with Facebook</a>
			<a href={ config.social.google } className="button block google"><i className="fa fa-google" aria-hidden="true"></i> Login with Google</a>
			<a href={ config.social.twitter } className="button block twitter"><i className="fa fa-twitter" aria-hidden="true"></i> Login with Twitter</a>
			<a href={ config.social.instagram } className="button block instagram"><i className="fa fa-instagram" aria-hidden="true"></i> Login with Instagram</a>
		</div>
	);

	const ui_form = (
		<div className="content">

			<form onSubmit={ handleSubmit }>
				<h2>Register new account.</h2>

				{ props.register.get('error') &&
					<Alert message="Place enter all the fields with valid information." type="error" />
				}

				<div className="input">
					<input type="text" placeholder="full name" autoFocus defaultValue={ user_name } onChange={ e => { handleInputChange(e,'name') } } />
				</div>
				<div className="input">
					<input type="text" placeholder="email address" defaultValue={ user_email } onChange={ e => { handleInputChange(e,'email') } } />
				</div>
				<div className="input">
					<input type="text" placeholder="phone number" defaultValue={ user_phone } onChange={ e => { handleInputChange(e,'phone') } } />
				</div>
				<div className="input">
					<input 	type="password" placeholder="password" defaultValue={ user_password } onChange={ e => { handleInputChange(e,'password') } } />
				</div>
				<div className="input">
					<input type="password" placeholder="verify password" defaultValue={ user_password_confirm } onChange={ e => { handleInputChange(e,'password_confirm') } } />
				</div>

				<div className="form-footer">
					<button type="submit" className="ant-btn ant-btn-primary">Register</button>
					<Link className="label-marker"  to="/auth/login">&larr; Back to Login Page</Link>
				</div>
			</form>

		</div>
	);


	return (
		<div className="flex column">

			{ ui_logo }


			<Spin spinning={ props.register.get('submit') } size="large">
			<div className="content-container">

				<div className="flex flex--jc-sa flex--align-center">
					{ ui_form }
					{ ui_links }
				</div>

			</div>
			</Spin>


		</div>
	)



}



const ConnectLoginPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterPage)


export default ConnectLoginPage;



