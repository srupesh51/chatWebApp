import React, { Component } from 'react';
import Layout from '../components/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
//import setSession from './utils/setSession';
import LoginForm from '../components/LoginForm';
import ChatContainer from '../components/chats/ChatContainer';
import SideBar from '../components/chats/SideBar';
import { Provider } from 'react-redux';
import PrivateRoute from '../components/common/PrivateRoute';
import store from './store';
import { CookiesProvider } from 'react-cookie';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
            <CookiesProvider>
            <Layout />
            </CookiesProvider>
      </Router>
      </Provider>
    );
  }
}

export default App;
