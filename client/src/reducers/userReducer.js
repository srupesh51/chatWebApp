import {
  CREATE_USER,
  GET_USERS,
  GET_CONNECTED_USERS,
  SET_STATUS,
  GET_CONNECTED
} from '../actions/types';

const initialState = {
  users: [],
  list: [],
  hobse: {name:'Hobse 1',email:'pushkar@gmail.com'},
  approvers: [{name:'Approver 1',email:'approver1@gmail.com'},
  {name:'Approver 2',email:'approver2@gmail.com'}],
  hoteliers: [{name:'Hotlier 1',email:'hotlier1@gmail.com'},
  {name:'Hotlier 2',email:'hotelier2@gmail.com'}],
  loading: false,
  status: false,
  connected_users: [],
  connected: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USERS:
      console.log(action.payload);
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case GET_CONNECTED_USERS:
      console.log(action);
      return {
        ...state,
        connected_users: action.payload
      }
    case SET_STATUS:
      console.log(action);
      return {
        ...state
      }
    case GET_CONNECTED:
      return {
        ...state,
        connected: action.payload
      }
    default:
      return state;
  }
}
