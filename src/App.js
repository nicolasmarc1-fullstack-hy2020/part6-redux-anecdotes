import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdocteForm from './components/AnecdocteForm'
import { initializeAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdote())
  }, [dispatch])

  return (
    <div>
      <AnecdoteList />
      <AnecdocteForm />
    </div>
  )
}

export default App