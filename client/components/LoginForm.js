import React, { Component } from 'react';
import { VERIFY_USER } from '../src/Events';
import {createUser,setStatus} from '../src/actions/userActions';
import { connect } from 'react-redux';
import  {withRouter} from 'react-router-dom';
//import {getConnection,getOptions} from '../src/actions/userActions';
import PropTypes from 'prop-types';
import Header from './Header';
import getSession from './utils/getSession';
class LoginForm extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	name:"",
			email:"",
			password:"",
	  	error:""
	}
};

	setUser = ()=>{
		const { hobse } = this.props
		console.log(this.props.users);
		if(this.props.users.hobse.name === this.state.name){
			const userData = {
				name: this.props.users.hobse.name,
				email: this.state.email
			};
			this.props.setUser(userData);
			this.props.createUser(userData,this.props.history);
		} else {
			const approverData = this.props.users.approvers.filter(approver => approver.name === this.state.name);
			const HotleierData = this.props.users.hoteliers.filter(approver => approver.name === this.state.name);
			const userData = {
				name: approverData.length > 0 ? approverData[0].name : HotleierData.length > 0 ? HotleierData[0].name : this.state.name,
				email: approverData.length > 0 ? approverData[0].email : HotleierData.length > 0 ? HotleierData[0].email : this.state.email,
				password: this.state.password,
				user_status: false
			};
			const {name, email} = userData;
			console.log(name,email);
			this.props.setUser({name: name, email: email});
			this.props.createUser(userData,this.props.history);
			//this.props.setStatus({email: userData.email, user_status: true});
			console.log("Hello");
			this.props.getConnected();
	  }
		this.props.history.push('/chat');
		//console.log(this.props.history)
	}
	componentDidMount(){
		console.log("Hello");
		if(this.props.cookies.get('id')){
			console.log("Hello 1",this.props.history);
				//this.props.history.push('/chat');
		}
	}
	componentWillReceiveProps(newProps){
		console.log("LKJ");
	}
	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { name,email } = this.state;
		socket.emit(VERIFY_USER, email, this.setUser)
		this.props.setSession();
		//this.props.getConnected();
	}

	handleChange = (e)=>{
		this.setState({[e.target.name]: e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {
		const { name, error,email } = this.state
		return (
			<div>
				<Header />
			<div className="container">
				<form  onSubmit={this.handleSubmit}>
				<div className="form-group" >
					<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.handleChange}
						placeholder={'Enter Your Name'}
						/>
						</div>
						<div className="form-group" >
						<input
							name="email"
							type="text"
							value={this.state.email}
							onChange={this.handleChange}
							placeholder={'Enter Your Email'}
							/>
							</div>
							<div className="form-group">
								<input
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.handleChange}
									placeholder={'Enter Your Password'}
									/>
									</div>
							<button type="submit" className="btn btn-primary">Chat Now!</button>
						<div className="error">{error ? error:null}</div>

				</form>
			</div>
			</div>
		);
	}
}






LoginForm.propTypes = {
  users: PropTypes.array.isRequired,
	hobse: PropTypes.object.isRequired,
	setStatus: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  users: state.users,
	hobse: state.hobse
});
export default connect(mapStateToProps, { createUser, setStatus})(withRouter(LoginForm));
