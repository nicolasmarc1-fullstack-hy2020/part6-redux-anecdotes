import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Filter from './Filter'

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

const AnecdoteList = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => props.voteFor(anecdote)}
        />
      ))}
    </div>
  )
}

const sortByMostVotes = (anecdotes) => {
  //  to be consistent through multiples renders in case of equality in nb of votes
  //  we decide of an order based on the content if votes are equals
  return anecdotes.sort((a, b) =>
    a.votes === b.votes
      ? a.content.localeCompare(b.content, undefined, { sensitivity: 'base' })
      : b.votes - a.votes
  )
}

const mapStateToProps = (state) => {
  // useSelector returns refernce / shallow copy and sorting mutate original array
  //  to avoid changing state with sorting, need deep copy value in new array arr.slice or [...arr]
  // (state) => [...state.anecdotes]
  return {
    anecdotes: sortByMostVotes(
      [...state.anecdotes].filter((a) =>
        a.content.toLowerCase().includes(state.filter)
      )
    ),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteFor: (anecdote) => {
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
      dispatch(voteAnecdote(anecdote))
    },
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
