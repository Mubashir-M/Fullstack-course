import { createStore, combineReducers } from 'redux'
import AnecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer'
import FilterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers ({
  anecdotes: AnecdoteReducer,
  notification: NotificationReducer,
  filter: FilterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
  )

export default store