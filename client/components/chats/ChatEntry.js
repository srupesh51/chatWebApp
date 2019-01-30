import React, { Component } from 'react';
import userOnline from './online.png';
import userOffline from './offline.png';
import Moment from 'react-moment';
import {getMessages} from '../../src/actions/messageActions';
import {getApproverMessages} from '../../src/actions/approverActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class ChatEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true
    }
  }
    render(){
      const {userList,list,online_users,c1,show,enableOnline,user,user_type} = this.props;
      console.log(user);
      let listUsers = [];
      if(online_users){
        online_users.map((connected) => {
            userList.map((user)=> {
              if(connected[user.name] && connected[user.name]['name'] && connected[user.name]['name'] === user.name){
                  listUsers.push({name: connected[user.name]['name'],
                status: 'online',date: user.date,email: user.email});
              } else {
                listUsers.push({name: user.name,
                  status: 'offline',date: user.date,email: user.email});
              }
            });
        });
      }
      const c2 = listUsers.length === 0 ? c1 : listUsers;
        return(
              c2.map((c) => {
                return(
                <div
                  key={c.id? c.id : c._id} ref='container' className={this.state.status ? "chat-entry-show" : "chat-entry-hide"} hidden={show}>
                  <div className="user-info">
                    {!enableOnline ? <div id="dh"><a className="divLink" href="#" onClick={()=>{
                      this.props.getMessages({user: user.email},user.name);
                      this.props.enableMessage();
                      this.props.enableReservation();
                    }
                  } id="dv"> {c.name+": "+c.id}  <div id="hotel">{c.hotel} {c.date} </div></a>
                  </div> : <div className="name" id="dv">{c.name} <img src={c.status === 'online' ? userOnline : userOffline} title={c.status} hidden={!enableOnline} /></div>
                  }
                    </div>
                  </div>
              );
            })
        );
    }
}
ChatEntry.propTypes = {
	getMessages: PropTypes.func.isRequired,
  getApproverMessages: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, { getMessages,getApproverMessages })(ChatEntry);
