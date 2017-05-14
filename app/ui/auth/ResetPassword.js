'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import { Link } from 'react-router';
import { Spin, Alert, notification } from 'antd';
import * as InputHelper from 'app/utils/helpers/Input';


const mapStateToProps = ( state, ownProps ) => {
	return {
		login: state.auth.get('login'),
		reset_password: state.auth.get('reset_password'),
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		authUpdateLoginFormField: (data) => dispatch( Action.authUpdateLoginFormField(data) ),
		authSubmitResetPasswordForm: (data) => dispatch( Action.authSubmitResetPasswordForm(data) ),
		authInvalidateResetPasswordForm: (data) => dispatch( Action.authInvalidateResetPasswordForm(data) ),
		authServerResetPassword: (data) => dispatch( Action.authServerResetPassword(data) ),
	}
}

let ResetPasswordPage = (props) => {


	let user_email = props.login.get('email');

	let handleSubmit = ( event ) => {
		event.preventDefault();
		props.authSubmitResetPasswordForm(true);

		let errorHandler = ( message, description ) => {
			setTimeout( () => {
				props.authInvalidateResetPasswordForm(true);
				notification.error({ message: message, description: description });
				props.authSubmitResetPasswordForm(false);
			}, 50);
		}

		if ( !user_email ) {
			errorHandler('Error Occoured!', 'Please enter your email address.')
		}
		else if ( ! InputHelper.validateEmail(user_email) ) {
			errorHandler('Invalid Email', 'Please enter a valid email address.')
		}
		else {
			props.authInvalidateResetPasswordForm(false);
			props.authServerResetPassword({ email: user_email });
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


	const ui_form = (
		<div className="content">

			<form onSubmit={ handleSubmit }>
				<h2>Enter your email address.</h2>

				{ props.reset_password.get('error') &&
					<Alert message="Please enter valid email address." type="error" showIcon />
				}

				<div className="input">
					<input type="text" placeholder="email address" autoFocus defaultValue={ user_email } onChange={ e => { handleInputChange(e,'email') } } />

					{ props.reset_password.get('done') &&
						<div className="m-t-20">
							<p>Password reset request received. If your email is registered with us, you will receive a password reset email.</p>
							<p className="m-t-10">You can alternatively <Link to="/auth/login">login with your social profile</Link> as well.</p>
						</div>
					}

				</div>

				<div className="form-footer">
					<button type="submit" className="ant-btn ant-btn-primary">Reset password</button>
					<Link className="label-marker"  to="/auth/login">&larr; Back to Login Page</Link>
				</div>
			</form>

		</div>
	);
	return (
		<div className="flex column">

			{ ui_logo }

			<Spin spinning={ props.reset_password.get('submit') } size="large">
			<div className="content-container">

				<div className="flex flex--jc-sa flex--align-center">
					{ ui_form }
				</div>

			</div>
			</Spin>

		</div>
	)

}




const ConnectResetPasswordPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetPasswordPage)


export default ConnectResetPasswordPage;

