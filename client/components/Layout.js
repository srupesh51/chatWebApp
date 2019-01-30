import React, { Component } from 'react';
import { USER_CONNECTED, LOGOUT,CONNECTED_LIST,USER_START } from '../src/Events'
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import getSession from './utils/getSession';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import PrivateRoute from './common/PrivateRoute';
import ChatContainer from './chats/ChatContainer'
import {getConnection,getConnectedUsers,setStatus,
getConnected} from '../src/actions/userActions';
import {instanceOf ,PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {cookie,withCookies,Cookies} from "react-cookie";
class Layout extends Component {
	static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
	constructor(props) {
	  super(props);
	  this.state = {
	  	socket:null,
	  	user:null,
			sessionId:null,
			connected_list: []
	  };
	}

	componentWillMount() {
		this.initSocket()
	}

	componentDidMount(){
		const {cookies} = this.props;
		// if(cookies.get('id')){
		// 	if(this.props.location.pathname === '/'){
		// 			window.location.href = '/chat';
		// 	}
		// }
		this.state.socket.on(USER_START, ()=> {
			console.log("LO");
			if(this.props.cookies.get('id')){
			if(this.props.location.pathname === '/'){
					window.location.href = '/chat';
			}
		 }
		});
	}
	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "timeout" : 10000, //before connect_error and connect_timeout are emitted.
            "transports" : ["websocket"]
        };
				const socketURL = process.env.NODE_ENV === 'production'? 'https://www.hobse.com:9000' : 'http://localhost:9000';
				//console.log(socketURL);
		const socket = io(socketURL);
		socket.on('connect', ()=>{
			console.log("Connected");
		});
		socket.emit(USER_START);
		// console.log(socket);
		this.setState({socket})
	}

	/*
	* 	Sets the user property in state
	*	@param user {id:number, name:string}
	*/
	setUser = (user)=>{
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user);
		this.getConnected();
		//this.props.getOptions();
		const { cookies } = this.props;
		console.log(user);
		cookies.set('id', user, { path: '/' });
		this.setState({user})
		socket.emit(USER_START);
	}

	setSession = () => {
		//this.setState({sessionId: getSession()});
	}
	getConnected = ()=> {
		const { socket } = this.state
		socket.emit(CONNECTED_LIST, this.state.connected_list);
	}

	componentWillReceiveProps(newProps){
		console.log("LKKKM");
		this.state.socket.on(LOGOUT, (user)=> {
			console.log("logout");
			window.location.href = "/";
		});
		this.state.socket.on(USER_START, ()=> {
			console.log("LO");
			if(this.props.cookies.get('id')){
			if(this.props.location.pathname === '/'){
					window.location.href = '/chat';
			}
		 }
		});
		// this.state.socket.on(USER_START, ()=> {
		// 	console.log("LO");
		// });
	}
	/*
	*	Sets the user property in state to null.
	*/
	logout = ()=>{
		const { socket } = this.state
		const user = this.props.cookies.get('id');
		if(this.props.cookies.get('id')){
			socket.emit(LOGOUT,user)
			this.props.cookies.remove('id');
			localStorage.removeItem('email');
		}
		const lo = [];
		console.log(user);
		this.setState({user:null})
	}


	render() {
		const { title, cookies } = this.props
		const { socket, user, connected_list, sessionId } = this.state
		console.log(socket,cookies,user,connected_list,this.props.users);
		return (
			<div className="element-container">
					{!cookies.get('id') ?
					<Router>
					   <LoginForm socket={socket} setUser={this.setUser} setSession={this.setSession} cookies={cookies}
						 getConnected={this.getConnected} />
          </Router>
						 :
						 	<Router>
								<Switch>
								<PrivateRoute exact path="/chat" component={ChatContainer}
									cookies={cookies}
									socket={socket} user={cookies.get('id')} logout={this.logout}
									list={connected_list} />
									</Switch>
								</Router>
						}
			</div>
		);
	}
}
Layout.propTypes = {
  connected_list: PropTypes.object.isRequired,
	getConnectedUsers: PropTypes.func.isRequired,
	setStatus: PropTypes.func.isRequired,
	getConnected: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  conn: state.conn,
	users: state.users,
	connected_list: state.connected_list,
	connected: state.connected
});
export default connect(mapStateToProps, { getConnection, getConnectedUsers, setStatus,getConnected })(withCookies(withRouter(Layout)));
