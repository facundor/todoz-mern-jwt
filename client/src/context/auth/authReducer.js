import {
  CLOSE_SESION,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS
} from '../../types'

export default (state, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token
      }
    case CLOSE_SESION:
    case SIGNIN_ERROR:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}
