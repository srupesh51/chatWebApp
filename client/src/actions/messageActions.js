import axios from 'axios';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_ONLINE,
  GET_MESSAGES,
  GET_ERRORS,
  GET_MESSAGES_ONLINE
} from './types';
let BASE_URL = process.env.NODE_ENV === 'production'? 'https://safe-shore-36860.herokuapp.com' : '';
export const sendText = (profileData,history) => dispatch => {
  axios
    .post(BASE_URL+'/api/messages/send-message', profileData)
    .then(res =>
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const getMessages = (messageParam, user,history) => dispatch => {
  axios
    .post(BASE_URL+'/api/messages', messageParam)
    .then(res =>
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
        user: user
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
