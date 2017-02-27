'use strict';

import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';



const mapStateToProps = ( state, ownProps ) => {
	return {
		user: state.auth.get('user'),
    appLinks: state.app.get('config').get('links'),
	}
}

const mapDispatchToProps = dispatch => ({
});



const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;


const commonMenuItems = {
	welcome: 'welcome',
};




class Aside extends React.Component {

	constructor(props) {
		super(props);
		this.displayName = 'Aside';
		this.state = {
			openKeys: ['user'],
			current: 'user.dashboard',
		};
    this.subMenuDefaults = this.props.appLinks;
		this.handleClick = this.handleClick.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.processURLs = this.processURLs.bind(this);
	}


	processURLs( url ) {
		let openKeys = [];
		let current = '';
		let menuItems = url.split('/');
		// menuItems.shift(); // remove the first element, i..e 'user'.

		if ( menuItems[1] ) {
			if ( commonMenuItems[ menuItems[1] ] ) {
				openKeys.push( 'user' );
			}
			else {
				openKeys.push( menuItems[1] );
				if( menuItems[2] ) {
					if( this.subMenuDefaults[ menuItems[1] ] ) {
						if( this.subMenuDefaults[ menuItems[1] ]['_submenus'] && this.subMenuDefaults[ menuItems[1] ]['_submenus'].indexOf( menuItems[2] ) > -1 ) {
							let s_menu = menuItems[1] + '.' + menuItems[2];
							openKeys.push( s_menu );
						}
					}
				}
			}
		}
		else { openKeys.push( 'user' ); }

		if ( menuItems[1] && menuItems[2] ) {
			let currentMenu = this.subMenuDefaults[ menuItems[1] ];
			if ( currentMenu && currentMenu[ menuItems[2] ] && currentMenu[ menuItems[2] ][menuItems[3]] ) { current = menuItems[1] + '.' + menuItems[2] + '.' + menuItems[3]; }
			else if ( currentMenu && currentMenu[ menuItems[2] ] ) { current = menuItems[1] + '.' + menuItems[2]; }
			else { current = menuItems[1] + '.index'; }
		}
		else if (menuItems[1] ) {
			if ( commonMenuItems[ menuItems[1] ] ) { current = 'user.' + menuItems[1]; }
			else { current = menuItems[1] + '.index'; }
		}
		else { current = 'user.dashboard'; }

		this.setState({
			openKeys: openKeys,
			current: current
		});

	}




	componentWillMount() {
		this.processURLs( this.props.location.pathname );
	}


	componentWillReceiveProps( nextProps ) {
		this.processURLs( nextProps.location.pathname );
	}


	handleClick(e) {
		this.setState({
			current: e.key,
			openKeys: e.keyPath.slice(1),
		});
	}

	onToggle(info) {
		this.setState({
			openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
		});
	}




	render() {


		let userMenuLinks = (
			<SubMenu key="user" title={<span><Icon type="user" />User</span>}>
				<Menu.Item key="user.dashboard"><Link to="/user/dashboard">Dashboard</Link></Menu.Item>
				<Menu.Item key="user.trainings"><Link to="/user/training">Training</Link></Menu.Item>
				<Menu.Item key="user.messages"><Link to="/user/messages">Messages</Link></Menu.Item>
				<Menu.Item key="user.account"><Link to="/user/account">Account</Link></Menu.Item>
			</SubMenu>
		)

		let hostsMenuLinks = (
			<SubMenu key="Trainer" title={<span><Icon type="laptop" />Trainer Dashboard</span>}>
				<SubMenu key="Trainer.training" title="Trainings">
					<Menu.Item key="Trainer.training"><Link to="/trainer/training">All Trainings</Link></Menu.Item>
					<Menu.Item key="Trainer.training.create"><Link to="/trainer/training/create">Create Event</Link></Menu.Item>
				</SubMenu>
				<SubMenu key="Trainer.webinar" title="Webinars">
					<Menu.Item key="trainer.webinar"><Link to="/trainer/webinar">All</Link></Menu.Item>
					<Menu.Item key="trainer.webinar.create"><Link to="/trainer/webinar/create">Create Webinar</Link></Menu.Item>
				</SubMenu>
			</SubMenu>
		)


		let userMenu = (
			userMenuLinks
		);

		let hostsMenu = ([
			userMenuLinks,
			hostsMenuLinks
		]);




		return (
			<div className="wrapper">
			<Menu
				mode="inline"
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['user']}
				onClick={this.handleClick}
				style={{ width: "100%", marginTop: 15 }}
				onOpen={this.onToggle}
				onClose={this.onToggle}
				openKeys={this.state.openKeys}
				selectedKeys={[this.state.current]}
			>

				{ this.props.user.get('userType') == 2 ?
					hostsMenu : userMenu
				}
			</Menu>
			</div>
		);
	}



}



Aside.propTypes = {
	location: React.PropTypes.object.isRequired
};




const ConnectAside = connect(
	mapStateToProps,
	mapDispatchToProps
)(Aside)


export default ConnectAside;
