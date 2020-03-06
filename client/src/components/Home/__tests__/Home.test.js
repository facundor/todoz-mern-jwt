// import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// import { render } from '@testing-library/react'
// import Home from '../Home'
// import AuthContext from '../../../context/auth/authContext'
// import AlertContext from '../../../context/alert/alertContext'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

describe('Home component', () => {
  test('Basic render', () => {
    /* const signOut = () => {};
    const { getByText, container } = render(
        <AlertContext.Provider>
          <AuthContext.Provider value={{ signOut }}>
            <Home/>
          </AuthContext.Provider>
        </AlertContext.Provider>
    ); */
  })
})
