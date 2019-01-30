import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import errorReducer from './errorReducer';
import hobseReducer from './hobseReducer';
import approverReducer from './approverReducer';
export default combineReducers({
  users: userReducer,
  errors: errorReducer,
  messages: messageReducer,
  approver_data: approverReducer,
  hobse_messages: hobseReducer
});
