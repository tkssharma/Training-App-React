'use strict';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { Icon, Button, Tooltip } from 'antd';
import DB from 'app/api/DB';


let Message = ( props ) => {

	let flagThisMessage = () => {
		return DB.messages.flag( props.message.id );
	}


	let classname = '';

	let name = '';
	if ( props.message.from.id === props.user.id ) { name = 'You'; }
	else { name = props.message.from.name; }

	if ( props.host ) {
		if ( props.message.from.id === props.user.id ) { classname = 'host'; }
		else { classname = 'user'; }
	}
	else {
		if ( props.message.from.id === props.user.id ) { classname = 'user'; }
		else { classname = 'host'; }
	}


	return (
		<div className={`component--message ${classname}`}>
	
			
			<div className="timestamp">
				{ props.host ?
					(
					<div className="overflow">
						<strong>{ name }</strong> wrote this <strong>{ moment(props.message.timestamp).fromNow() }</strong>
						{ classname == 'user' &&
							(
								<span className="top-actions">
									<Tooltip placement="top" title={ props.message.flagged ? 'You have already flagged this message' : 'Flag this message' }>
									<Button
										type="ghost" icon="frown" onClick={ () => flagThisMessage() }
										disabled={ props.message.flagged }
									>flag</Button>
									</Tooltip>
								</span>
							)
						}
					</div>
					) : (
					<div>
						<strong>{ name }</strong> wrote this <strong>{ moment(props.message.timestamp).fromNow() }</strong>
					</div>
					)
				}
			</div>

			<div className="message-text">
				<ReactMarkdown source={ props.message.text || 'no message entered' } escapeHtml={true} />
			</div>


		</div>
	)

}




export default Message;

