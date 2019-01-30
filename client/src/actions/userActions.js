import axios from 'axios';
import cookie from "react-cookie";
import {
  CREATE_USER,
  GET_USERS,
  GET_ERRORS,
  GET_CONNECTED_USERS,
  SET_STATUS,
  GET_CONNECTED
} from './types';
const BASE_URL = process.env.NODE_ENV === 'production'? 'https://safe-shore-36860.herokuapp.com' : '';
export const createUser = (userData,history) => dispatch => {
  axios
    .post(BASE_URL+'/api/users/create-user', userData)
    .then(res => {
      // Save to localStorage
      // Set current user
      console.log(history.location.pathname);
      const {_id} = res.data;
      console.log(_id);
      dispatch({
          type: CREATE_USER,
          payload: res.data
        })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
export const setStatus = (userData) => dispatch => {
  axios
    .post(BASE_URL+'/api/users/update-status', userData)
    .then(res => {
      // Save to localStorage
      // Set current user
      dispatch({
          type: SET_STATUS,
          payload: res.data
        })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
}
export const getUsers = () => dispatch => {
  axios
    .get(BASE_URL+'/api/users')
    .then(res => {
      // Save to localStorage
      // Set current user
      dispatch({
          type: GET_USERS,
          payload: res.data
        })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
export const getConnectedUsers = () => dispatch => {
  axios
    .get('https://api.myjson.com/bins/zs69o')
    .then(res => {
      // Save to localStorage
      // Set current user
      dispatch({
          type: GET_CONNECTED_USERS,
          payload: res.data
        })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
}
export const getConnected = (users) => dispatch => {
    dispatch({
        type: GET_CONNECTED,
        payload: users
      })
};
