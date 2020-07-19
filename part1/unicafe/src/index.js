import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic =  (props) => {
  const {text, value} = props

  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
const Statistics = (props) => {
    
  const {good, bad, neutral} = props
  const allFeedback = good + bad + neutral

  if(allFeedback == 0){
    return (
      <div>
        <h1>Statistics</h1>
        <p> No feedback given</p>
      </div>
    )
  }

  return (
      <div>
        <h1>Statistics</h1>

        <table>
          <tbody>

            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="All" value={allFeedback} />
            <Statistic text="average" value={(good - neutral)/allFeedback} />
            <Statistic text="Positive" value={(good*100/allFeedback) + "%"} />
          </tbody>
        </table>
        
      
      </div>
    )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood (good + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  

  return (
    <div>
      <h1> Give Feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
      

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)