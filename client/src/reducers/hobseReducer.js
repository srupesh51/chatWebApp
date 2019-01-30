import {
  GET_HOBSE_MESSAGE,
  SEND_SUPPORT_MESSAGE,
  GET_ERRORS
} from '../actions/types';

const initialState = {
  hobse_messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HOBSE_MESSAGE:
      console.log(action,"UJ");
      return {
        ...state,
        hobse_messages: action.payload
      }
    case SEND_SUPPORT_MESSAGE:
    return {
      ...state,
      hobse_messages: action.payload
    }
    default:
      return state;
  }
}
