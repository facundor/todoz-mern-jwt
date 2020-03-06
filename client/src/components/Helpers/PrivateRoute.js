import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

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

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default PrivateRoute
