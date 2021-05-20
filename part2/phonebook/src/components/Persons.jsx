import React from 'react';

const Persons = ({ handleDelete, peopleToShow }) => {
  return (
    <div>
      {peopleToShow.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
