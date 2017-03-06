'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import { Link } from 'react-router';

import axios from 'axios';
import * as API from 'app/api'
import StorageAPI from 'app/redux/api/Storage';

import { Button, message, Row, Col } from 'antd';




const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.auth.get('user'),
		user: state.user.get('profile'),
		processing: state.ui.get('processing'),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		uiProcessingUpdateField: (status) => dispatch(Action.uiProcessingUpdateField(status)),
		authUpdateUserField: (data) => dispatch(Action.authUpdateUserField(data)),
	}
}



let HomePage = (props) => {
	let loadUsers = () => {
		let loading_message = message.info('loading users from server.. please wait', 0);
		return axios.get(API.url('users'))
			.then((response) => {
				loading_message();
				if (response.data.code != 200) {
					message.error('failed loading data from server', 2);
				} else {
					message.success('users successfully loaded from server', 2);
				}
				console.log('response.data', response.data);
			});

	}



	let userTrainerClickHandler = () => {
		props.uiProcessingUpdateField({ key: 'user_to_trainer', value: true });

		return axios.get(API.url('user_make_trainer'))
			.then((response) => {
				props.uiProcessingUpdateField({ key: 'user_to_trainer', value: false });
				if (response.data.code != 200) {
					message.error('error occoured while making you a Trainer, please try again after some time.', 2);
				} else {
					props.authUpdateUserField({ key: 'userType', value: 2 });
					StorageAPI.user.setUserType(2);
					message.success('Your have been successfully upgraded to become host', 2);
				}
			});

	}




	return (

		<div>
			<Row>
				<div className="heading center">
					<h1>Hi {props.user.get('name') || props.auth.get('name')}</h1>
					<h3>Welcome to GenNext Training., From here you can manage everything related to your account.</h3>
				</div>
			</Row>
			<Row>

				<div className="m-t-20">
					<Button type="primary" onClick={loadUsers}>Load Some Data - Check console.</Button>
					<Link to="/user/account" className="ant-btn ant-btn-primary m-l-10">Manage your account</Link>
				</div>

				{props.auth.get('userType') === 1 &&
					<Button type="primary"
						size="large"
						onClick={userTrainerClickHandler}
						className="button success m-t-20"
						loading={props.processing.get('user_to_trainer')}>
						Start as Trainer
				</Button>
				}
			</Row>
		</div>
	)

}



const ConnectHomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage)


export default ConnectHomePage;
