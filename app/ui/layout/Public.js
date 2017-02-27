'use strict';

import React from 'react';
import { Row, Col } from 'antd';
import Header from 'app/components/common/Header';
import Footer from 'app/components/common/Footer';


let PublicPage = (props) => {

	return (
		<div>
					{props.children}
		</div>
	);

}


export default PublicPage;
