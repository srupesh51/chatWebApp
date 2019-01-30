import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/eject'
import ChatEntry from './ChatEntry';
import {getUsers,getConnectedUsers} from '../../src/actions/userActions';
import {getMessages} from '../../src/actions/messageActions';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import ChatCommunity from './ChatCommunity';
import { CONNECTED_LIST,COMMUNITY_CHAT,MESSAGE_SENT } from '../../src/Events';
class SideBar extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	show: false,
			show1: false,
			show2: false,
			show3: false,
			show4: false,
			show5: false,
			show6: false,
			scrollTop: '',
			scrollHeight:'',
			container:{},
			user_list: [],
			connected_users: []
    };
    this.scrollDown = this.scrollDown.bind(this);
	}
	scrollDown(){
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}
	enableReservation =()=>{
		this.setState({show6: true});
	}

	getConnected(){
		const {socket} = this.props;
		socket.emit(CONNECTED_LIST, this.props.list);
	}
	// shouldComponentUpdate(nextProps, nextState){
  //   return true;
	// }
	componentDidMount() {
		const {list,socket} = this.props;
		console.log('po',list);
		this.props.getUsers();
		console.log(this.props);
		this.getConnected();

		socket.on(CONNECTED_LIST, (users)=> {
				console.log(users);
				this.setState({connected_users: users});
				//this.props.getConnected(users);
		});
		//
		this.scrollDown()
	}
	componentWillReceiveProps(newProps){
		const {socket} = this.props;
		console.log(newProps.users.list,"PO");
		if(newProps.users.list.length > 0){
			this.setState({
				user_list: newProps.users.list
			})
		}

		// if(!this.props.cookies.get('id')){
		// 	window.location.href = "/";
		// }
		console.log(this.props.list,newProps);
		//socket.emit(CONNECTED_LIST, this.props.list);
		// if(this.state.connected_users.length === 0){
		// 		this.getConnected();
		// }
		//this.getConnected();
	}
	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	render(){
		const { chats, activeChat, user, setActiveChat, logout,users,socket,list,
		connList,getConnected,disable,enable} = this.props;
		const c1 = [{"id":1,"name":"Approver 1","status":"offline","date":"14-12-2018"},{"id":2,"name":"Approver 2","status":"offline","date":"14-12-2018"}];
		const c2 = [{"id":1,"name":"Hotelier 1","status":"offline","date":"14-12-2018"}];
		const c3 = [{"id":1,"name":"Hobse 1","status":"offline"}];
		//cons
		console.log(this.props.users,user);
		const c4 = [{"id":1,"name":"Rupesh"},{"id":2,"name":"Rakesh"},
	{"id":1,"name":"Vivek"},{"id":2,"name":"Aneesh"},{"id":1,"name":"Wilson"},{"id":2,"name":"Arthur"},{"id":1,"name":"Rupesh"},{"id":2,"name":"Rakesh"},
{"id":1,"name":"Vivek"},{"id":2,"name":"Aneesh"},{"id":1,"name":"Wilson"},{"id":2,"name":"Arthur"}];
const c5 = [{"id":"HN154477881792","name":"Catherine Hannah","status":"offline","date":"14-12-2018","hotel":"Thamizhan Hotel"},{"id":"HN154476944117","name":"Gini Isaac","status":"offline","date":"14-12-2018","hotel":"Crescent Inn"}];
		const userList = !this.props.users || this.props.users.list.length === 0 ? [] : this.props.users.list;
		console.log(userList);
		console.log(list);
		console.log(this.state.user_list);
		return (
			<div id="side-bar" ref='container'>
					<div className="heading">
						<div className="app-name">Hobse Chat <FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>
					</div>
					<div className="search">
						<i className="search-icon"><FASearch /></i>
						<input placeholder="Search" type="text"/>
						<div className="plus"></div>
					</div>
					<div
						className="users"
						ref='users'
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						{
						chats.map((chat)=>{
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const user = chat.users.find(({name})=>{
									return name !== this.props.name
								}) || { name:"Recent Conversation" }
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''

								return(
								<div
									key={chat.id}
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveChat(chat) } }
									>
									<div className="user-photo">{user.name[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{user.name}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>

								</div>
							)
							}
						})
					}
					<div className="app-name-chat-grp4">Reservations <FAChevronDown onClick = {() => {
						this.setState({show5: !this.state.show5})
					}}
					/>
					<ChatEntry show={this.state.show5} c1={c5}
					userList={userList} user={user} list={list} socket={socket}
					enableOnline={false}
					enableMessage={this.props.enableMessage}
					enableReservation={this.enableReservation}
					/>
					<button type="submit" className="btn btn-primary" id="btnId" onClick={()=>{
						this.props.getMessages({user: this.props.user.email});
						this.props.enableMessage();
					}
				}>Show Conversation History </button>
					</div>
					<div className="heading" hidden={!this.state.show6 ? !this.state.show6 : disable ? disable : false}>
						<div className="app-name">Community <FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>
					</div>
					<div className="app-name-chat-grp2" hidden={!this.state.show6 ? !this.state.show6 : disable ? disable : false}>Travellers<FAChevronDown 			  onClick = {() => {
								this.setState({show3: !this.state.show3})
							}}
							/>
						<ChatCommunity show={this.state.show3} userList={userList} user={user} list={list} socket={socket} user_type="traveller" online_users={this.state.connected_users} c1={userList}
						enableOnline={true} getConnected={this.getConnected}
						/>
						</div>
					<div className="app-name-chat" hidden={!this.state.show6 ? !this.state.show6 : disable ? disable : false}>Approvers
						<FAChevronDown onClick = {() => {
							this.setState({show: !this.state.show})
						}} />
						<ChatCommunity show={this.state.show3} userList={userList} user={user} list={list} socket={socket} user_type="approver"
						c1={c1} online_users={this.state.connected_users}
						enableOnline={true} getConnected={this.getConnected}
						/>
						</div>
						<div className="app-name-chat-grp" hidden={!this.state.show6 ? !this.state.show6 : disable ? disable : false}>Hoteliers <FAChevronDown onClick = {() => {
							this.setState({show1: !this.state.show1})
						}}
					  />
						<ChatCommunity show={this.state.show1} c1={c2} user_type="hotelier" online_users={this.state.connected_users} userList={userList} user={user} socket={socket}
						enableOnline={true}/>
						</div>
						<div className="app-name-chat-grp3" hidden={!this.state.show6 ? !this.state.show6 : disable ? disable : false}>Hobse <FAChevronDown onClick = {() => {
							this.setState({show4: !this.state.show4})
						}}
					  />
						<ChatCommunity show={this.state.show4} c1={c3} user_type="hobse" online_users={this.state.connected_users} userList={userList}
						enableOnline={true} socket={socket} user={user}/>
						</div>
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout();}} title="Logout" className="logout">
							<MdEject/>
						</div>
					</div>
			</div>
		);

	}
}
SideBar.propTypes = {
  users: PropTypes.array.isRequired,
	getUsers: PropTypes.func.isRequired,
	getMessages: PropTypes.func.isRequired,
	getConnectedUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, { getUsers, getMessages,getConnectedUsers })(withRouter(SideBar));
