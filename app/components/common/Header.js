'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Popover, Icon, Row, Col} from 'antd';
import * as Action from 'app/redux/actions';
import Helper from 'app/global/helper';

const mapStateToProps = (state, ownProps) => {
				return {
								app: state
												.app
												.get('default'),
								user: state
												.auth
												.get('user')
				}
}
const mapDispatchToProps = dispatch => ({});

let UserNavigation = (
				<Row className="m-t-20">
								<Link to="/auth/login" className="button block small default">Login</Link>
								<Link to="/auth/register" className="button block small default">Register</Link>

				</Row>
);
let TrainerNavigation = (
				<Row className="m-t-20">
								<Link to="/user/dashboard" className="button block small default">Dashboard</Link>
								<Link to="/user/bookings" className="button block small default">Bookings</Link>
								<Link to="/user/account" className="button block small default">Account</Link>
								<Link to="/auth/logout" className="button block small default">Logout</Link>
				</Row>
);

let WWWHeader = (props) => {

				const popoverContent = (
								<div className="dropdown_container">
												<div className="avatar">
																<img
																				src={Helper
																				.user
																				.avatar(props.user.get('avatar'))}
																				alt={props
																				.user
																				.get('name')}/>
												</div>
												{props
																.user
																.get('userType') == 2
																? TrainerNavigation
																: UserNavigation
}
								</div>
				);
				let user_profile = () => {
								if (props.user.get('userType') === 1 || props.user.get('userType') === 2) {
												return (
																<div className="dropdown">
																				<Popover
																								placement="bottomRight"
																								content={popoverContent}
																								trigger="click"
																								overlayClassName="header-popover">
																								<a className="ant-dropdown-link" href="#">{props
																																.user
																																.get('name')}
																												<Icon type="down"/></a>
																				</Popover>
																</div>
												)
								} else {
												return (
																<Link to="/auth/login">SignIn</Link>
												);
								}

				}

				let UserNavigation = (
								<nav role="navigation" className="navbar header-navigation-holder">
												<div className="container">
																<div className="navbar-header">
																				<button
																								data-target="#header-navigation"
																								data-toggle="collapse"
																								className="navbar-toggle header-navigation-toggle"
																								type="button">
																								<i className="icon-reorder"></i>
																				</button>
																				<Link to="/" href="" className="navbar-brand logo"><img alt="Logo with text" className="img-responsive" src="../images/logo.jpg"/></Link>
																</div>

																<div id="header-navigation" className="collapse navbar-collapse">

																				<ul className="nav navbar-nav navbar-right">
																								<li>
																										<Link to="/auth/login">SignIn</Link>
																								</li>
																								
																				</ul>

																</div>

												</div>
								</nav>
				);

				return (
								<div>
												{props
																.user
																.get('userType') == 2
																? UserNavigation
																: UserNavigation
}
								</div>
				);
}

const ConnectWWWHeader = connect(mapStateToProps, mapDispatchToProps)(WWWHeader)

export default ConnectWWWHeader;
