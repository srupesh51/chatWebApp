import React, { Component } from 'react';
import OfflineConversation from '../conversation/OfflineConversation';
import OnlineConversation from '../conversation/OnlineConversation';
import Moment from 'react-moment';
import {createUser} from '../../src/actions/userActions';
import { connect } from 'react-redux';
import { MESSAGES_SENT,INVITE,MESSAGE_PRIVATE } from '../../src/Events';
import PropTypes from 'prop-types';
class Messages extends Component {
	constructor(props) {
	  super(props);

		this.scrollDown = this.scrollDown.bind(this);
		this.state = {
			scrollTop: '',
			scrollHeight:'',
			container:{},
			numItems: 0,
			messages: [],
			connected : false
		}
	}
	scrollDown(){
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		console.log('po');
		const list = this.props.users.approvers.filter(approver => approver.name === this.props.user.name);
    if(list.length > 0){
      this.setState({connected: true});
    }
		this.props.socket.on(INVITE, (message) => {
			console.log(message,"LKK");
			//this.setState({connected: false});
			this.setState({messages: this.props.message_list});
		});
		//
		// const list = this.props.users.approvers.filter(approver => approver.name === this.props.user.name);
    // if(this.props.users.hobse.name === this.props.user.name
    //  || list.length > 0){
    //   console.log("POU");
    //   this.props.socket.on(INVITE, (messages,flag) => {
    //           this.setState({messages: messages});
    //     });
    // }
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	componentWillReceiveProps(newProps){
		console.log(newProps);
	}
	render() {
		const { message_list, user, typingUsers,socket } = this.props
		const {scrollTop,scrollHeight,container,messages} = this.state;
		console.log(this.props.disable);
		const msgs = messages.length > 0 ? messages: message_list;
		console.log(msgs,"PK");
		return (
			<div ref='container'
				className="thread-container" id="msg" hidden={this.props.enable ? this.props.enable: this.props.disable? this.props.disable : false}>
				<div className="thread">
					<OfflineConversation user={user} scrollTop={scrollTop} scrollHeight={scrollHeight} socket={socket}
					container={container} />
					{
						msgs.map((mes)=>{
								return (
									<div
										key={mes.id}
										className={`message-container ${mes.sender === user.name && 'right'}`}
									>
										<div className="time">{mes.time}</div>
										<div className="data">
											<div className="message">{mes.message}</div>
											<div className="name">{mes.sender}</div>
										</div>
									</div>
									)
							})
					  }
					{
						typingUsers.map((name)=>{
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
				</div>

			</div>
		);
	}
}
Messages.propTypes = {
  messages: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users
});
export default connect(mapStateToProps, { createUser})(Messages);
