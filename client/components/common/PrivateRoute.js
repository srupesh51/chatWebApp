import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getSession from '../utils/getSession';
console.log(getSession());
const PrivateRoute = ({ component: Component, socket,user,
   logout, chats, list, cookies, activeChat,setActiveChat,enable,enableMessage,disable,
   getConnected,setUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
       cookies.get('id') ? (
        <Component {...props}
        socket={socket} user={user} setUser={setUser} logout={logout} chats={chats} cookies={cookies}
        list={list} getConnected={getConnected} activeChat={activeChat}
        setActiveChat={setActiveChat} enable={enable} enableMessage={enableMessage} disable={disable}
        />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(PrivateRoute);
