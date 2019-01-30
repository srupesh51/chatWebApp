import {
  SEND_MESSAGE,
  GET_MESSAGES
} from '../actions/types';

const initialState = {
  messages: [],
  message: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: !action.user ? action.payload : action.payload.filter(payload => { return payload.user.name === action.user}),
        loading: false
      };
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
