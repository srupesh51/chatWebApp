import React, { Component } from 'react';
import SideBar from './SideBar'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGES_SENT, MESSAGE_RECIEVED, TYPING,
LOGOUT,USER_CONNECTED,CONNECTED_LIST,MESSAGE_PRIVATE } from '../../src/Events'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  {withRouter} from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import OfflineConversation from '../conversation/OfflineConversation';
import {getMessages} from '../../src/actions/messageActions';
import {createUser,getUsers} from '../../src/actions/userActions';
import {sendMessage} from '../../src/actions/hobseActions';
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import getSession from '../utils/getSession';
import {cookies} from "react-cookie";
//console.log(localStorage.id);
if(localStorage.id){

} else {
	//window.location.href = 	window.location.href+'/login';
}
class ChatContainer extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	chats:[],
			error: '',
	  	activeChat:null,
			message: [],
			show:false,
			show1: false,
			show2:true,
			connected_list: []
		}
	}
	componentDidMount() {
		const { socket } = this.props
		if(this.props.users.hobse.name !== this.props.user.name){
			//this.props.getMessages({user: this.props.user.email});
	 	}
		socket.emit(COMMUNITY_CHAT, this.resetChat)
	}
	/*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
	resetChat = (chat)=>{
		return this.addChat(chat, true)
	}

	/*
	*	Adds chat to the chat container, if reset is true removes all chats
	*	and sets that chat to the main chat.
	*	Sets the message and typing socket events for the chat.
	*
	*	@param chat {Chat} the chat to be added.
	*	@param reset {boolean} if true will set the chat as the only chat.
	*/
	addChat = (chat, reset)=>{
		const { socket } = this.props
		const { chats } = this.state

		const newChats = reset ? [chat] : [...chats, chat]
		this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

		const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, this.updateTypingInChat(chat.id))
		socket.on(messageEvent, this.addMessageToChat(chat.id))
	}

	/*
	* 	Returns a function that will
	*	adds message to chat with the chatId passed in.
	*
	* 	@param chatId {number}
	*/
	addMessageToChat = (chatId)=>{
		return message => {
			const { chats } = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

			this.setState({chats:newChats})
		}
	}

	refreshList(list) {
		console.log(list);
	}

	getConnected(){
		const {socket,list} = this.props;
		socket.emit(CONNECTED_LIST,list);
	}
	/*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
	updateTypingInChat = (chatId) =>{
		return ({isTyping, user})=>{
			if(user !== this.props.user.name){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
	}
	componentWillReceiveProps(newProps){
		const {message} = this.state;
			this.setState({message: newProps.messages});
			// if(!this.props.cookies.get('id')){
			// 	window.location.href = "/";
			// }
			// this.props.socket.on(USER_CONNECTED, (user) => {
			// 		const cookieUser = this.props.cookies.get('id');
			// 		console.log("LKJ",user);
			// 		if(cookieUser && user.email === cookieUser.email){
			// 			console.log("connec");
			// 		}
			// });
			console.log("LO",this.props.list);
			//this.getConnected();
			// this.props.socket.on(LOGOUT, ()=> {
			// 	console.log("logout");
			// 	window.location.href = "/";
			// });
	}
	handleSubmit = (e)=>{
		e.preventDefault()
		console.log(this.props);
		if(this.props.users.hobse.name !== this.props.user.name){
			console.log(this.props, this.state);
			this.props.sendMessage({user: this.props.users.hobse.email,
			name: this.props.users.hobse.name, message: this.state.message})
			this.sendMessages(this.state.message);
	  }
		this.setState({message:""});
	}
	/*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
	sendMessage = (chatId, message)=>{
		const { socket,user } = this.props
		socket.emit(MESSAGE_SENT, {chatId, message} )
	}

	sendMessages = (message)=>{
		const { socket } = this.props
		console.log("LM");
		socket.emit(MESSAGES_SENT, message);
	}
	enableMessage = ()=>{
			console.log("enable");
			this.setState({show: true});
			this.setState({show1: false});
	}
	disableMessage = ()=>{
		console.log("disable");
		this.setState({show: false});
		this.setState({show1: true});
	}
	/*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
	sendTyping = (chatId, isTyping)=>{
		const { socket } = this.props
		socket.emit(TYPING, {chatId, isTyping})
	}

	setActiveChat = (activeChat)=>{
		this.setState({activeChat})
	}
	render() {
		const { user, logout,socket,list,connList,cookies } = this.props
		const { chats, activeChat,message,error,scrollTop,scrollHeight,container,show,show1,connected_list,show2 } = this.state
		const msgs = !message.messages || message.messages.length === 0 ? [] : message.messages;
		let conn = JSON.parse(localStorage.getItem('email'));
		console.log(JSON.parse(localStorage.getItem('email')));
		console.log("LKJ",user,this.props.users,msgs,message,list,localStorage.getItem('email'),conn);
		return (
			<div className="element-container">
			<Router>
			<SideBar
				logout={logout}
				chats={chats}
				user={user}
				activeChat={activeChat}
				socket={socket}
				setActiveChat={this.setActiveChat}
				list={list}
				getConnected={this.props.getConnected}
				enable={show}
				enableMessage={this.enableMessage}
				disableMessage={this.disableMessage}
				disable={show1}
				cookies={cookies}
				/>
				</Router>
				<div className="chat-room-container">
					{
						activeChat !== null ? (

							<div className="chat-room">
								<ChatHeading name={activeChat.name} enable={!show} disableMessage={this.disableMessage} disable={show1}/>
								<Messages
									message_list={activeChat.messages}
									user={user}
									typingUsers={activeChat.typingUsers}
									socket={socket}
									enable={!show}
									enableMessage={this.props.enableMessage}
									disable={show1}
									/>
								<MessageInput
									sendMessage={
										(message)=>{
											this.sendMessage(activeChat.id, message)
										}
									}
									sendTyping={
										(isTyping)=>{
											this.sendTyping(activeChat.id, isTyping)
										}
									}
									socket={socket}
									user={user}
									enable={!show}
									disable={show1}
									/>
							</div>
						):
						<div className="chat-room choose">
							<h3>Choose a chat!</h3>
						</div>
					}
				</div>
	<div className="error">{error ? error:null}</div>
   	</div>
		);
	}
}

ChatContainer.propTypes = {
  users: PropTypes.array.isRequired,
	messages: PropTypes.array.isRequired,
	hobse: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  users: state.users,
	hobse: state.hobse,
	messages: state.messages
});
export default connect(mapStateToProps, {createUser,sendMessage,getMessages,getUsers})(withRouter(ChatContainer));
