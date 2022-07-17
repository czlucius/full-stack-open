import { useState } from 'react'
import React from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => { setGood(good + 1) }
  const badHandler = () => { setBad(bad + 1) }
  const neutralHandler = () => { setNeutral(neutral + 1) }

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={goodHandler}>Good</button>
      <button onClick={badHandler}>Bad</button>
      <button onClick={neutralHandler}>Neutral</button>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Bad: {bad}</p>
      <p>Neutral: {neutral}</p>

    </div>
  )
}

export default App
