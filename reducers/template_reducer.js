import {
  TEMPLATE,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case TEMPLATE:
      return state;
    default:
      return state;
  }
}