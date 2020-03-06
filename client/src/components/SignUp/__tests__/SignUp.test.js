import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AlertContext from '../../../context/alert/alertContext'
import SignUp from '../SignUp'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../../services/usersService')

describe('SignUp component', () => {
  test('Basic render', () => {
    const alerts = []
    const showAlert = (msg) => {
      alerts.push(msg)
    }
    const { container, getAllByText } = render(
      <MemoryRouter>
        <AlertContext.Provider value={{ showAlert }}>
          <SignUp history={{}} />
        </AlertContext.Provider>
      </MemoryRouter>
    )

    expect(alerts.length).toBe(0)

    const signUpButton = getAllByText('Sign Up')[0].closest('button')
    fireEvent.click(signUpButton)
    expect(alerts.length).toBe(1)

    fireEvent.change(container.querySelector('#firstName'), {
      target: { value: 'John' }
    })
    fireEvent.click(signUpButton)
    expect(alerts.length).toBe(2)

    fireEvent.change(container.querySelector('#lastName'), {
      target: { value: 'Smith' }
    })
    fireEvent.click(signUpButton)
    expect(alerts.length).toBe(3)

    fireEvent.change(container.querySelector('#email'), {
      target: { value: 'john.smith@gmail.com' }
    })
    fireEvent.click(signUpButton)
    expect(alerts.length).toBe(4)

    fireEvent.change(container.querySelector('#password'), {
      target: { value: '123456' }
    })
    fireEvent.click(signUpButton)
    expect(alerts.length).toBe(4) // no alerts
  })
})
