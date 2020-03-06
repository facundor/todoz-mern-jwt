import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import { SHOW_ALERT, HIDE_ALERT } from '../../types'
import PropTypes from 'prop-types'

const AlertState = props => {
  const initialState = {
    message: '',
    severity: '',
    show: false
  }

  const [state, dispatch] = useReducer(AlertReducer, initialState)

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
    }, 5000)
  }

  return (
    <AlertContext.Provider
      value={{
        message: state.message,
        severity: state.severity,
        show: state.show,
        showAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

AlertState.propTypes = {
  children: PropTypes.element.isRequired
}

export default AlertState
