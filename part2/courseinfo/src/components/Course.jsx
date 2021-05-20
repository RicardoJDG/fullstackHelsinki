import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = (props) => {
  const { name, parts } = props.course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
