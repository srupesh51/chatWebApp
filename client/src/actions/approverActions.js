import axios from 'axios';
import {
  SEND_APPROVER_MESSAGE,
  GET_APPROVER_MESSAGES
} from '../actions/types';
let BASE_URL = process.env.NODE_ENV === 'production'? 'https://safe-shore-36860.herokuapp.com' : '';
export const sendApproverText = (profileData,history) => dispatch => {
  axios
    .post(BASE_URL+'/api/approvers/send-message', profileData)
    .then(res =>
      dispatch({
        type: SEND_APPROVER_MESSAGE,
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

export const getApproverMessages = (messageParam, user,history) => dispatch => {
  console.log(messageParam);
  axios
    .post(BASE_URL+'/api/approvers', messageParam)
    .then(res =>
      dispatch({
        type: GET_APPROVER_MESSAGES,
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
