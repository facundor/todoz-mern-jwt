import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Alert from '../Alert'
import AlertContext from '../../../context/alert/alertContext'

// https://www.polvara.me/posts/mocking-context-with-react-testing-library/

function renderAlert (alert) {
  return render(
    <AlertContext.Provider value={alert}>
      <Alert />
    </AlertContext.Provider>
  )
}

describe('Alert component', () => {
  test('Test show error', () => {
    const message = 'Test message'
    const { getByText, container } = renderAlert({
      message,
      show: true,
      severity: 'error'
    })
    expect(getByText(message)).toBeInTheDocument()
    expect(container.firstChild.firstChild).toHaveClass('MuiAlert-filledError')
  })

  test('Test show info', () => {
    const message = 'Test message'
    const { getByText, container } = renderAlert({
      message,
      show: true,
      severity: 'info'
    })
    expect(getByText(message)).toBeInTheDocument()
    expect(container.firstChild.firstChild).toHaveClass('MuiAlert-filledInfo')
  })

  test('Test hide', () => {
    const { container } = renderAlert({
      message: '',
      show: false,
      severity: ''
    })
    expect(container.innerHTML).toBe('')
  })
})
