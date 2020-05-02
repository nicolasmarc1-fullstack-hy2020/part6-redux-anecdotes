import anecdocteService from '../services/anecdocte'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTE':
      return action.data
    case 'UPDATE_ANECDOTE':
      const  updatedAnecdote  = action.data
      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    // case 'VOTE':
    // const { id } = action.data
    // const anecdoteToUpdate = state.find(anecdote =>
    //   anecdote.id === id)
    // const updatedAnecdote = {
    //   ...anecdoteToUpdate,
    //   votes: anecdoteToUpdate.votes + 1
    // }
    // return state.map(anecdote =>
    //   anecdote.id === id ? updatedAnecdote : anecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdocteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdocteService.update(anecdote.id,
      { ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: updatedAnecdote
    })
  }


  //   return {
  //     type: 'VOTE',
  //     data: { id: anecdote.id }
  //   }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdocteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer



// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)