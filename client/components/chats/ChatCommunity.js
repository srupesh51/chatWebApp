
import React, { Component } from 'react';
import userOnline from './online.png';
import userOffline from './offline.png';
import {getMessages} from '../../src/actions/messageActions';
import {getApproverMessages,sendApproverText} from '../../src/actions/approverActions';
import {getUsers,setStatus} from '../../src/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CONNECTED_LIST,INVITE,INVITE_RECEIVED } from '../../src/Events';
import Moment from 'react-moment';
class ChatCommunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approver_messages: [],
      messageList: [],
      listUsers: [],
      connected_users: [],
      btn_hidden: true,
      accept: false
    }
  }
  performAction =()=>{
    const {socket,user_type,userList,user,c1} = this.props;
    const {listUsers,btn_hidden} = this.state;
    let listData = userList;
    if(user_type === 'traveller' && listData.length > 0){
      console.log(this.state.messageList);
      const messageData = {
        messages: this.state.messageList,
        email: listData[0].email,
        flag: true
      }
      // let approverData = [];
      // const approverInvite = this.props.users.approvers.map((currentUser) => {
      //     const approver =  listData.filter((user) => user.name === currentUser.name);
      //     if(approver.length > 0){
      //       approverData = approver;
      //     }
      // });
      this.props.setStatus({email: listData[0].email, user_status: true});
      socket.emit(INVITE,messageData);
      this.getConnected();
    } else if(user_type === 'approver') {
      let approverData = [];
      const approverInvite = this.props.users.approvers.map((currentUser) => {
          const approver =  listData.filter((user) => user.name === currentUser.name);
          if(approver.length > 0){
            approverData = approver;
          }
      });
      console.log(approverData);
      socket.on(INVITE, (message) => {
    		this.props.sendApproverText({user: this.props.user.email, message: message.messages, name: this.props.user.name});
      });
      this.props.setStatus({email: this.props.user.email, user_status: true});
    }
  }
  componentDidMount() {
    const {list,user_type,socket,user} = this.props;
    this.props.getUsers();
    console.log(user);
    this.getConnected();
  }
  getConnected(){
    console.log(this.props.list);
    this.props.socket.on(INVITE, (messages) => {
        this.setState({accept: messages.flag});
      });
  }
  componentWillReceiveProps(newProps){
    this.setState({messageList: newProps.messages});
    const {userList,btn_hidden,user,user_type} = this.props;
    console.log(userList,user_type);
    this.setState({approver_messages: !newProps.approver_data ? [] : newProps.approver_data.approver_messages})
    console.log(newProps,"PO");
    let listData = userList.filter((currentUser) => user.name === currentUser.name);
    listData.map((list) => {
        if(list.user_status && user_type === 'traveller'){
          this.setState({btn_hidden: false});
        } else if(list.user_status && user_type === 'approver'){
          this.setState({accept: false});
        }
    });
  }
  filterMessages(user){
    console.log("LO");
      //this.props.getMessages({user: this.props.user.email}, user);
  }
  render(){
    const {userList,list,online_users,show,user_type,enableOnline,c1,user,socket} = this.props;
    console.log(online_users, userList,socket);
    let uList = userList;
    const currentUser = user;
    const {btn_hidden,accept} = this.state;
    console.log(currentUser.name,btn_hidden,accept);
    this.state.listUsers = [];
    if(user_type !== 'traveller'){
      online_users.map((connected) => {
          c1.map((user)=> {
            if(connected[user.name] && connected[user.name]['name'] && connected[user.name]['name'] === user.name ){
                this.state.listUsers.push({name: connected[user.name]['name'],
              status: 'online', btn_hidden: false});
            } else {
              this.state.listUsers.push({name: user.name,
                status: 'offline', btn_hidden: false});
            }
          });
      });
    } else {
      online_users.map((connected) => {
          userList.map((user)=> {
            if(connected[user.name] && connected[user.name]['name'] && connected[user.name]['name'] === user.name ){
                this.state.listUsers.push({name: connected[user.name]['name'],
              status: 'online',btn_hidden: true});
            } else {
              this.state.listUsers.push({name: user.name,
                status: 'offline',btn_hidden: false});
            }
          });
      });
    }
    const listOfUsers = user_type === 'traveller'? this.state.listUsers.filter(
      user => user.name !== 'Approver 1' && user.name !== 'Approver 2'
       && user.name !== 'Hotelier 1' && user.name !== 'Hobse 1') : this.state.listUsers;
    console.log(listOfUsers);
    console.log(online_users);
    return(
    listOfUsers.map((user)=>{
      return(
    <div
      key={user._id} ref='container'
      className='user-active' hidden={show}>
      <div className="user-photo" id="dn"> {user.name}<img src={user.status === 'online' ? userOnline : userOffline} title={user.status} hidden={!enableOnline}/>
    <div className="time" id="timeColor"><Moment format="HH:mm">{user.date}</Moment></div>
      {user_type === 'traveller' && user.status === 'online'
       && currentUser.name === user.name?
      <button type="submit" className="btn btn-primary" id="btnId1" onClick={this.performAction
    } hidden={ !this.state.btn_hidden}>Invite Approver</button> : user_type === 'approver' && user.status === 'online' && currentUser.name === user.name?
    <button type="submit" className="btn btn-primary" id="btnId1"
    hidden={ !accept} onClick={this.performAction
  }>Accept Invite</button> : ''
  }
      </div>
    </div>
  );
  })
);
  }
}
ChatCommunity.propTypes = {
  messages: PropTypes.array.isRequired,
  approver_messages: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  getApproverMessages: PropTypes.func.isRequired,
  sendApproverText: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users,
  approver_data: state.approver_data
});
export default connect(mapStateToProps, { getMessages,getUsers, sendApproverText,getApproverMessages,setStatus})(ChatCommunity);
