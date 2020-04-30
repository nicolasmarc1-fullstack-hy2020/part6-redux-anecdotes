import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const sortByMostVotes = (anecdotes) => {
    //  to be consistent through multiples renders in case of equality in nb of votes
    //  we decide of an order based on the content if votes are equals
    return anecdotes.sort((a, b) =>
      a.votes === b.votes
        ? a.content.localeCompare(b.content, undefined, { sensitivity: 'base' })
        : b.votes - a.votes
    )
  }
  // useSelector returns refernce / shallow copy and sorting mutate original array
  //  to avoid changing state with sorting, need deep copy value in new array arr.slice or [...arr]
  const anecdotes = sortByMostVotes(useSelector((state) => [...state.anecdotes]))
  const dispatch = useDispatch()



  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      ))}
    </div>
  )
}
export default AnecdoteList
