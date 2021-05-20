import React, { useState } from 'react';
import SpecificCountry from './SpecificCountry';

const Countries = ({ countries, filter }) => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState();
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filter && countriesToShow.length > 10 ? (
        'Too many matches, specify another filter'
      ) : countriesToShow.length === 1 ? (
        <SpecificCountry country={countriesToShow[0]} />
      ) : (
        countriesToShow.map((country, i) => {
          return (
            <div key={country.alpha3Code}>
              <p>{country.name}</p>
              <button
                onClick={() => {
                  setShow(!show);
                  setIndex(i);
                }}
              >
                show
              </button>
            </div>
          );
        })
      )}
      {show && <SpecificCountry country={countriesToShow[index]} />}
    </div>
  );
};

export default Countries;
