import React, { Component } from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'
import FAClose from 'react-icons/lib/fa/close';
export default class ChatHeading extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	chats:[],
			error: '',
	  	activeChat:null,
			message: [],

			show:false
		}
	}
	render(){
		const { numberOfUsers, name, enable,disable} = this.props;
		const {show} = this.state;
		return (
			<div className="chat-header" hidden={enable ? enable: disable? disable: false }>
				<div className="user-info">
					<div className="user-name">{name}</div>
					<div className="status">
						<div className="indicator"></div>
						<span>{numberOfUsers ? numberOfUsers : null}</span>
					</div>
				</div>
				<div className="options">
					<FAVideo />
					<FAUserPlus />
					<MdEllipsisMenu />
					<FAClose onClick={()=> {
						this.setState({show: true});
						this.props.disableMessage();
					}}/>
				</div>
			</div>
		);
  }
}
