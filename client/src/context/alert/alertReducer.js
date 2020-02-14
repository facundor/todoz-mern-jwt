import { SHOW_ALERT, HIDE_ALERT } from '../../types';

export default (state, action) => {
    switch(action.type) {

        case SHOW_ALERT:
            return {
                ...action.payload,
                show: true
            }
        case HIDE_ALERT:
            return {
                ...action.payload,
                message: '',
                show: false
            };
        default:
            return state;
    }
}