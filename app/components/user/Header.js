'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, Icon, Popover } from 'antd';
import * as Action from 'app/redux/actions';

import Helper from 'app/global/helper';



const mapStateToProps = ( state, ownProps ) => {
	return {
		aside: state.app.get('config').get('aside'),
        app: state.app.get('default'),
        user: state.auth.get('user'),
	}
}

const mapDispatchToProps = dispatch => ({
    appConfigToggleAside: () => dispatch( Action.appConfigToggleAside() )
});


let Header = ( props ) => {

	const toggleNavAside = () => {
		props.appConfigToggleAside();
	}




	let hostsNavigation = (
		<Row gutter={20} className="m-t-20">
			<Col span={12}>
				<Link to="/user/dashboard" className="button block small default">Dashboard</Link>
				<Link to="/user/trainings" className="button block small default">Trainings</Link>
				<Link to="/user/account" className="button block small default">Account</Link>
			</Col>
			<Col span={12}>
				<Link to="/host/training" className="button block small default">Training</Link>
				<Link to="/host/webinar" className="button block small default">Webinar</Link>
				<Link to="/auth/logout" className="button block small default">Logout</Link>
			</Col>
		</Row>
	);
	let userNavigation = (
		<Row className="m-t-20">
			<Link to="/user/dashboard" className="button block small default">Dashboard</Link>
			<Link to="/user/bookings" className="button block small default">Bookings</Link>
			<Link to="/user/account" className="button block small default">Account</Link>
			<Link to="/auth/logout" className="button block small default">Logout</Link>
		</Row>
	);
	const popoverContent = (
		<div className="dropdown_container">
			<div className="avatar">
				<img src={ Helper.user.avatar( props.user.get('avatar') ) } alt={props.user.get('name')} />
			</div>
			{ props.user.get('userType') == 2 ?
				hostsNavigation : userNavigation
			}
		</div>
	);
	let user_profile = () => {
		return (
			<div className="dropdown">
				<Popover
					placement="bottomRight"
					content={popoverContent}
					trigger="click"
					overlayClassName="header-popover"
					>
					<a className="ant-dropdown-link" href="#">{ props.user.get('name') } <Icon type="down" /></a>
				</Popover>
			</div>
		)
	}

	return (
		<header className="main header">

			<div className="flex">

				<div className="logo">
					<Link to="/">{ props.app.get('name') }</Link>
				</div>

				<div className="navicon" onClick={ toggleNavAside }>
					{ props.aside.get('visible') ?
						<Icon type="menu-fold" /> : <Icon type="menu-unfold" />
					}
				</div>
				{/*
				<ul className="nav">
					<li>
						<Link to="/auth/logout">Logout</Link>
					</li>
				</ul>
				*/}
			</div>

			<div className="profile">
				{ user_profile() }
			</div>


		</header>
	);

}




const ConnectHeader = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)


export default ConnectHeader;
