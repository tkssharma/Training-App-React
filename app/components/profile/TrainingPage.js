'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions/DB';
import * as DefaultAction from 'app/redux/actions';
import { Link } from 'react-router';
import { Spin } from 'antd';


const mapStateToProps = ( state, ownProps ) => {
	return {
	}
}

const mapDispatchToProps = dispatch => ({
});

let TrainingPage = ( props ) => {
	return (
		<div className="">
		<div>
	   <Spin size="small" />
		 <Spin />
		 <Spin size="large" />
		</div>
		</div>
	)
}
const ConnectTrainingPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(TrainingPage)


export default ConnectTrainingPage;
