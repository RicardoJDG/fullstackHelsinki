import React from 'react';
import Part from './Part';

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part part={part.name} exercise={part.exercises} key={part.id} />
        );
      })}
    </div>
  );
};

export default Content;
