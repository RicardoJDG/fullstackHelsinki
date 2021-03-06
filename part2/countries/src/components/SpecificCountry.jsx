import React from 'react';
import Weather from './Weather';

const SpecificCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.nativeName}>{language.name}</li>;
        })}
      </ul>
      <img
        src={country.flag}
        alt={country.name}
        style={{ maxWidth: '500px' }}
      />
      <Weather country={country.name} />
    </div>
  );
};

export default SpecificCountry;
