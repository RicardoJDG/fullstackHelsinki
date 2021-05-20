import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import people from './services/people';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState();
  const [filter, setFilter] = useState();
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    people.getAll().then((response) => setPersons(response));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personFound = persons.find((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${personFound.name} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        people
          .update(personFound.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : response
              )
            );
            setMessage(`${personFound.name} has been succesfully updated`);
            setStatus('success');
            setTimeout(() => {
              setMessage(null);
              setStatus(null);
            }, 5000);
          })
          .catch((err) => {
            setMessage(
              `${personFound.name} has already been removed from the server`
            );
            setStatus('error');
            setTimeout(() => {
              setMessage(null);
              setStatus(null);
            }, 5000);
          });
      }
    } else {
      people.create(newPerson).then((response) => {
        setPersons([...response]);
        setMessage(`${newPerson.name} has been succesfully added`);
        setStatus('success');
        setTimeout(() => {
          setMessage(null);
          setStatus(null);
        }, 5000);
      });
    }
  };

  const handleDelete = (id) => {
    const name = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${name.name}?`)) {
      people.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const peopleToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
      <Filter onChange={(e) => setFilter(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
