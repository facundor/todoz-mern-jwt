import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = () => {
  const alertContext = useContext(AlertContext)
  const { message, show, severity } = alertContext

  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert elevation={6} variant='filled' severity={severity}>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
