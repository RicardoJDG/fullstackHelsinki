import React, { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const positive = (good * 100) / total + '%';
  const average = ((good - bad) / total).toFixed(2);

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" onClick={() => setGood(good + 1)} />
        <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" onClick={() => setBad(bad + 1)} />
      </div>
      <h1>Statistics</h1>
      {!total ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <Statistics text="Good" value={good} />
            <Statistics text="Neutral" value={neutral} />
            <Statistics text="Bad" value={bad} />
            <Statistics text="Total" value={total} />
            <Statistics text="Positive" value={positive} />
            <Statistics text="Average" value={average} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;
