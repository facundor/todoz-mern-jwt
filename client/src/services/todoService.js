import axiosClient from '../config/axios'

export const todoService = {
  getAll: getAll,
  add: add,
  remove: remove,
  update: update
}

function getAll () {
  return axiosClient.get('/api/todoitems')
}

function add (todoItem) {
  return axiosClient.post('/api/todoitems', todoItem)
}

function remove (todoItem) {
  return axiosClient.delete('/api/todoitems/' + todoItem.id)
}

function update (todoItem) {
  return axiosClient.patch('/api/todoitems', todoItem)
}
