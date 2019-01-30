import axios from 'axios';
import {
  GET_HOBSE_MESSAGE,
  SEND_SUPPORT_MESSAGE,
  GET_ERRORS
} from './types';
const BASE_URL = process.env.NODE_ENV === 'production'? 'https://safe-shore-36860.herokuapp.com' : '';
export const getHobseMessages = (userData) => dispatch => {
  console.log("ER",userData);
  axios
    .post(BASE_URL+'/api/support',userData)
    .then(res => {
      dispatch({
        type: GET_HOBSE_MESSAGE,
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
export const sendMessage = profileData => dispatch => {
  axios
    .post(BASE_URL+'/api/support/send-message', profileData)
    .then(res =>   dispatch({
        type: SEND_SUPPORT_MESSAGE,
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
