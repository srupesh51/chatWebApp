import {
  SEND_APPROVER_MESSAGE,
  GET_APPROVER_MESSAGES
} from '../actions/types';

const initialState = {
  approver_messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPROVER_MESSAGES:
      console.log(action,"UJ");
      return {
        ...state,
        approver_messages: action.payload
      }
    case SEND_APPROVER_MESSAGE:
    return {
      ...state,
      approver_messages: action.payload
    }
    default:
      return state;
  }
}
