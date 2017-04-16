'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Row } from 'antd';


let EmptyComponent = (props) => {

	return (
		<Row>
			<div className="page-not-found">
				<div className="heading m-0">
					<h1>Empty Component Here.</h1>
					<div className="m-t-20">
						<a href="#" className="button default">404 Nothing | Error page</a>
					</div>
				</div>
			</div>
		</Row>
	)

}



export default EmptyComponent;

