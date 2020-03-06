import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...props }) => {
  const { token } = useContext(AuthContext)

  return (
    <Route
      {...props} render={props => (token
        ? <Component {...props} />
        : <Redirect to='/' />
      )}
    />
  )
}

export default PrivateRoute
