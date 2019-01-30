import React, { Component } from 'react';
import {sendText} from '../../src/actions/messageActions';
import {createUser,getUsers} from '../../src/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {MESSAGE_PRIVATE,INVITE } from '../../src/Events';
class MessageInput extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	message:"",
	  	isTyping:false,
			list_data:[]
	  };

	}
	componentDidMount(){
		this.props.getUsers();
	}
	handleSubmit = (e)=>{
		e.preventDefault()
		const {list_data} = this.state;
		this.props.sendText({user: this.props.user.email, text: this.state.message});
		if(list_data.length === 0){
		} else {
		}
		this.props.socket.emit(INVITE,
		this.state.message);
		this.sendMessage();
		console.log(this.props);
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.state.message)
	}

	componentWillUnmount() {
	  this.stopCheckingTyping()
	}

	sendTyping = ()=>{
		this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
	}
	componentWillReceiveProps(newProps){
		let list = [];
    let listData = [];
    newProps.users.list.map(user => {
      list = this.props.users.approvers.filter(approver => approver.name === this.props.user.name);
      if(list.length > 0 && user.user_status){
          listData = list;
      }
    });
		if(listData.length > 0){
			this.setState({list_data: listData});
		}
	}
	/*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
	startCheckingTyping = ()=>{
		console.log("Typing");
		this.typingInterval = setInterval(()=>{
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState({isTyping:false})
				this.stopCheckingTyping()
			}
		}, 300)
	}

	/*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
	stopCheckingTyping = ()=>{
		console.log("Stop Typing");
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}


	render() {
		const { message } = this.state
		const {enable,disable} = this.props;
		return (
			<div className="message-input" hidden={enable ? enable : disable ? disable : false }>
				<form
					onSubmit={ this.handleSubmit }
					className="message-form">

					<input
						id = "message"
						ref = {"messageinput"}
						type = "text"
						className = "form-control"
						value = { message }
						autoComplete = {'off'}
						placeholder = "Type something interesting"
						onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
						onChange = {
							({target})=>{
								this.setState({message:target.value})
							}
						}
						/>
					<button
						disabled = { message.length < 1 }
						type = "submit"
						className = "send"

					> Send </button>
				</form>

			</div>
		);
	}
}
MessageInput.propTypes = {
	sendText: PropTypes.func.isRequired,
	hobse: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, {sendText,createUser,
getUsers})(MessageInput);
