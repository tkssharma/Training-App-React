'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { Button, message, Row, Col } from 'antd';
import Header from 'app/components/user/Header';
import Aside from 'app/components/user/Aside';


const mapStateToProps = (state, ownProps) => {
    return {
        aside: state.app.get('config').get('aside'),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

let DefaultLayout = (props) => {


	let aside_classes = '';
	let wrapper_classes = 'has-fh ';
	if ( props.aside.get('visible') ) {
		wrapper_classes = wrapper_classes + 'has-fa';
	} else {
		aside_classes = 'hidden';
	}

	return (
		<div>
			<Header />

			<aside id="main" className={ aside_classes }>
				<Aside location={ location } />
			</aside>

			<div id="wrapper" className={ wrapper_classes }>

				<Row>
					<Col span={22} offset={1}>
						{props.children}
					</Col>
				</Row>

			</div>

		</div>
	)

}





const ConnectDefaultLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultLayout)


export default ConnectDefaultLayout;
