export const todoService = {
  getAll: getAll,
  add: add,
  remove: remove,
  update: update
}

const todoItems = [
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
  },
  {
    done: false,
    timestamp: '2020-02-14T13:51:25.908Z',
    description: 'Backend init',
    id: '5e46a811607c150011784a12'
  }
]

function wrap (data) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({
        data
      })
    }, 200)
  })
}

function getAll () {
  return wrap(todoItems)
}

function add (todoItem) {
  todoItems.push(todoItem)
  return wrap(todoItem)
}

function remove (todoItem) {
  const index = todoItems.indexOf(todoItem)
  if (index > -1) {
    todoItems.splice(index, 1)
  }
  return wrap()
}

function update (todoItem) {
  const index = todoItems.indexOf(todoItem)
  todoItems[index] = todoItem
  return wrap(() => {})
}
