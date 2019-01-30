import React, { Component } from 'react';
export default class ChatSupport extends Component {
  constructor(props){
    super(props);
    this.state =  {
      show : false
    }
  }

  render(){
    return (
      <div class="chat-support-header" hidden={this.props.users.hobse.name === user.name}>
          <div className="user-info">
            <div className="user-name">Hobse Support</div>
          </div>
          <form onSubmit={this.handleSubmit}>
        <div id="rg">
      <div class="form-group">
    <label for="exampleInputEmail1" disabled="true">Email address</label>
    <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email *" value={this.props.users.hobse.email}/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" disabled="true">Name</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Name *" name="name" value={this.props.users.hobse.name}/>
  </div>
  <label for="exampleInputEmail1">Message</label>
  <div ref='container'
    className="thread-container" id="msg1">
    <div className="thread">
    {
      msgs.map((mes)=>{
        return (
          <div
            key={mes._id}
            className={`message-container1 ${mes.sender === user.name && 'right'}`}>
            <div className="time"><Moment format="HH:mm">{mes.message.date}</Moment></div>
            <div className="data">
              <div className="message">{mes.message.text}</div>
              <div className="name">{mes.user.name}</div>
            </div>
          </div>
          )
      })
  }
  </div>
  </div>

    )

  }


}
