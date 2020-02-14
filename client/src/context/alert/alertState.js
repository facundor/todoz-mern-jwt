import React, {useReducer} from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const AlertState = props => {

    const initialState = {
        message: '',
        severity: '',
        show: false
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const showAlert = (message, severity) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                message,
                severity    
            }
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT,
                payload: {
                    severity    
                }
            })
        }, 5000);
    }

    return (
        <alertContext.Provider
            value={{
                message: state.message,
                severity: state.severity,
                show: state.show,
                showAlert
            }}
        > 
            {props.children }
        </alertContext.Provider>
    )
}

export default AlertState;