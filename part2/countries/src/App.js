import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const URL = 'https://restcountries.eu/rest/v2/all';

  useEffect(() => {
    axios.get(URL).then((info) => {
      setCountries(info.data);
    });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <p>
        Find countries <input type="text" onChange={handleChange} />
      </p>
      <Countries countries={countries} filter={filter} />
    </div>
  );
}

export default App;
