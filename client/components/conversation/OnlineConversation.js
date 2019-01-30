import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
class OnlineConversation extends Component {
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
		//this.props.getMessages({user: this.props.user.email});
    this.scrollDown();
	}
  componentWillReceiveProps(newProps){
	}
  componentDidUpdate(prevProps, prevState) {
        this.scrollDown()
	}
  render(){
    const {user,messages} = this.props;
    const msgs = !messages.messages || messages.messages.length === 0 ? [] : messages.messages;
    console.log(this.props);
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
export default OnlineConversation;
