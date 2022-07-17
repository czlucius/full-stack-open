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
      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}



const Statistics = ({ good, bad, neutral }) => {
  const calcAll = () => good + bad + neutral
  const calcAvg = () => {
    const goodScore = good
    const badScore = -bad
    const allScore = goodScore + badScore
    const allLen = calcAll()
    const avg = allLen != 0 ? allScore / allLen : 0
    return !isNaN(avg) ? avg : 0 // Check if avg is NaN
  }

  const content = (calcAll() > 0) ? (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Bad: {bad}</p>
      <p>Neutral: {neutral}</p>
      <p>All: {calcAll()}</p>
      <p>Average: {calcAvg()}</p>
    </>
  ) : (
    <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </>
  )

  return content
}

export default App
