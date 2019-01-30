import React, { Component } from 'react';
import {getMessages} from '../../src/actions/messageActions';
import {getHobseMessages} from '../../src/actions/hobseActions';
import {getApproverMessages,sendApproverText} from '../../src/actions/approverActions';
import {createUser,getUsers} from '../../src/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { INVITE_RECEIVED } from '../../src/Events';
class OfflineConversation extends Component {
  constructor(props) {
	  super(props);
    this.state = {
      messageList: [],
			refreshNums:0
    }
    this.scrollDown = this.scrollDown.bind(this)
  }

  scrollDown(){
    const { container,scrollTop,scrollHeight } = this.props;
    console.log(this.props);
    if(container){
      container.scrollTop = scrollHeight
    }
  }
  componentDidMount() {
    console.log("PO");
    const list = this.props.users.approvers.filter(approver => approver.name === this.props.user.name);
    console.log(list);
    this.props.getUsers();
    if(list.length === 0){
      console.log("EF");
      this.props.getMessages({user: this.props.user.email});
    } else {
      this.props.getApproverMessages({user: list[0].email});
    }
    this.scrollDown();
	}
  componentWillReceiveProps(newProps){
		console.log(newProps.messages,newProps);
    let list = [];
    let listData = [];
    newProps.users.list.map(user => {
      list = this.props.users.approvers.filter(approver => approver.name === this.props.user.name);
      if(list.length > 0){
          listData = list;
      }
    });
    if(listData.length === 0){
      this.setState({messageList: newProps.messages.messages});
    } else {
      let approverData = [];
      approverData.push(newProps.approver_data.approver_messages);
      this.setState({messageList: newProps.approver_data.approver_messages.length > 0 ? approverData : []});
    }
	}
  componentDidUpdate(prevProps, prevState) {
        this.scrollDown();
	}
  render(){
    const {user} = this.props;
    const {messages} = this.props.messages;
    const {messageList} = this.state;
    const msgs = messageList.length > 0 ? messageList : messages;
    console.log(this.props,msgs,messageList.length > 0);
    return(
        msgs.map((mes)=>{
          return (
            <div
              key={mes._id}
              className={`message-container ${mes.sender === user.name && 'right'}`}>
              <div className="time"><Moment format="HH:mm">{mes.message.date}</Moment></div>
              <div className="data">
                <div className="message">{mes.message.text}</div>
                <div className="name">{mes.user.name}</div>
              </div>
            </div>
            )
        })
   )
  }


}
OfflineConversation.propTypes = {
  messages: PropTypes.array.isRequired,
  hobse_messages: PropTypes.array.isRequired,
  approver_data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users,
  hobse_messages: state.hobse_messages,
  approver_data: state.approver_data
});
export default connect(mapStateToProps, { getMessages,getHobseMessages, createUser,getApproverMessages,sendApproverText,getUsers})(OfflineConversation);
