'use strict';
import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import { Link, browserHistory } from 'react-router';
import { Row, Col, Spin, Alert, notification } from 'antd';
import * as InputHelper from 'app/utils/helpers/Input';
import config from 'app/global/config';


const mapStateToProps = ( state, ownProps ) => {
	return {
		status: state.auth.get('status'),
		login: state.auth.get('login'),
	}
}
const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		authSubmitLoginForm: (status) => dispatch( Action.authSubmitLoginForm(status) ),
		authInvalidateLoginForm: (value) => dispatch( Action.authInvalidateLoginForm(value) ),
		authUpdateLoginFormField: (data) => dispatch( Action.authUpdateLoginFormField(data) ),
		authServerLoginUser: (value) => dispatch( Action.authServerLoginUser(value) ),
	}
}




let LoginPage = (props) => {

	let user_email = props.login.get('email');
	let user_password = props.login.get('password');


	let handleSubmit = ( event ) => {
		event.preventDefault();
		props.authSubmitLoginForm(true);

		let errorHandler = ( message, description ) => {
			setTimeout( () => {
				notification.error({ message: message, description: description });
				props.authInvalidateLoginForm(true);
				props.authSubmitLoginForm(false);
			}, 50);
		}

		if ( !user_email || !user_password ) {
			errorHandler('Error Occoured!', 'Please enter your email address and password.')
		}
		else if ( ! InputHelper.validateEmail(user_email) ) {
			errorHandler('Invalid Email', 'Please enter a valid email address.')
		}
		else {
			props.authInvalidateLoginForm(false);
			props.authServerLoginUser({
				email: user_email,
				password: user_password,
			});
		}

	}

	let handleInputChange = ( event, field ) => {
		let value = event.target.value;
		props.authUpdateLoginFormField( { field, value } );
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
				<h2>Login to Members Area.</h2>

				{ props.login.get('error') &&
					<Alert message="Please enter valid email and password." type="error" showIcon />
				}

				<div className="input">
					<input type="text" placeholder="email address" autoFocus defaultValue={ user_email } onChange={ e => { handleInputChange(e,'email') } } />
				</div>

				<div className="input">
					<input type="password" placeholder="password" defaultValue={ user_password } onChange={ e => { handleInputChange(e,'password') } } />
				</div>

				<div className="form-footer">
					<button type="submit" className="ant-btn ant-btn-primary">Login Now</button>
					<Link className="label-marker" to="/auth/reset-password">Reset password</Link>
				</div>
			</form>

		</div>
	);

	return (
		<div className="flex column">

			{ ui_logo }


			<Spin spinning={ props.login.get('submit') } size="large">
			<div className="content-container">

				<div className="flex flex--jc-sa flex--align-center">
					{ ui_form }
					{ ui_links }
				</div>

				<div className="center m-t-20">
					<Link to="/auth/register" className="button default centered extra-padding">Not yet a member? Register Now</Link>
				</div>

			</div>
			</Spin>


		</div>
	)



}



const ConnectLoginPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage)


export default ConnectLoginPage;





