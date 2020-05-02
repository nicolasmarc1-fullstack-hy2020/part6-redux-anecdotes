import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
const Filter = ({filterChange}) => {
  const handleChange = (event) => {
    filterChange(event.target.value.toLowerCase())
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterChange })(Filter)
