import { useState } from 'react'
import "./App.css"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectHandler = () => {
    setSelected(getRandomInt(anecdotes.length))
  }
  const voteHandler = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const mostVotesAnecdoteIndex = indexOfMax(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p className='text'>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      
      <button onClick={selectHandler}>Next anecdote</button>
      <button onClick={voteHandler}>Vote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotesAnecdoteIndex]}</p>
    </div>
  )
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}





export default App