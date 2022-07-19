import { useState } from 'react'
import React from 'react'
import "./App.css"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h2>Give feedback</h2>
      <Button attribute={good} setAttribute={setGood} text="Good" />
      <Button attribute={bad} setAttribute={ setBad} text="Bad" />
      <Button attribute={neutral} setAttribute={ setNeutral} text="Neutral" />
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
    const avg = allLen !== 0 ? allScore / allLen : 0
    return !isNaN(avg) ? avg : 0 // Check if avg is NaN
  }
  const positivePct = String((good / calcAll()) * 100) + "%"

  const content = (calcAll() > 0) ? (
    <>
      <h2>Statistics</h2>
      <StatisticTableRoot>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="All" value={calcAll()}/>
        <StatisticLine text="Average" value={calcAvg()}/>
        <StatisticLine text="Positive" value={positivePct}/>
      </StatisticTableRoot>
    </>
  ) : (
    <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </>
  )

  return content
}

const StatisticTableRoot = (props) => 
  <table>
    <colgroup>
      <col/>
      <col/>
    </colgroup>
    {props.children}
  </table>

const StatisticLine = ({text, value}) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Button = ({attribute, setAttribute, text}) => 
  <button onClick={() => setAttribute(attribute + 1)}>{text}</button>

export default App;