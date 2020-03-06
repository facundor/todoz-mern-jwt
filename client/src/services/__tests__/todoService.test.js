import axiosClient from '../../config/axios'
import { todoService } from '../todoService'
const moxios = require('moxios')

describe('Todo service', () => {
  beforeEach(() => {
    moxios.install(axiosClient)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('GET request', async () => {
    moxios.stubOnce('GET', '/api/todoitems', {
      status: 200,
      response: [
        {
          done: true,
          timestamp: '2020-02-14T14:05:25.137Z',
          description: 'Services',
          id: '5e46ac4ec3cd250011b8fb75'
        },
        {
          done: false,
          timestamp: '2020-02-14T14:05:25.137Z',
          description: 'Controllers',
          id: '5e46ac60c3cd250011b8fb76'
        }
      ]
    })
    const result = await todoService.getAll()
    expect(result.data).not.toBeNull()
    expect(result.data.length).toBe(2)
  })

  test('DELETE request', async () => {
    moxios.stubOnce('DELETE', '/api/todoitems/abcd', {
      status: 200
    })
    const result = await todoService.remove({ id: 'abcd' })
    expect(result.data).toBeUndefined()
  })

  test('POST request', async () => {
    moxios.stubOnce('POST', '/api/todoitems', {
      status: 200
    })
    const result = await todoService.add({ id: 'abcd' })
    expect(result.data).toBeUndefined()
  })

  test('PATCH request', async () => {
    moxios.stubOnce('PATCH', '/api/todoitems', {
      status: 200
    })
    const result = await todoService.update({ id: 'abcd' })
    expect(result.data).toBeUndefined()
  })
})
