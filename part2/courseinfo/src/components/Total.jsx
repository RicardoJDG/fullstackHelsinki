import React from 'react';

const Total = (props) => {
  const parts = props.parts;
  const exercises = parts.reduce((ac, current) => {
    return ac + current.exercises;
  }, 0);

  return (
    <div>
      <b>total of {exercises} exercises</b>
    </div>
  );
};

export default Total;
