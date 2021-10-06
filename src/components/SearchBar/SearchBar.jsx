import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleSearchChange = evt => {
    setSearch(evt.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(search);
    history.push({ ...location, search: `query=${search}` });

    // if (location.search !== '') {

    // }
    // console.log(search, `daaa`)
    // if (search.trim() === '') {

    setSearch('');

    //     return;

    // }
  };

  return (
    <div className="form-wrap">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          value={search}
          autoComplete="off"
          onChange={handleSearchChange}
          autoFocus
          placeholder="Search images and photos"
        />
        <button className="form-btn" type="submit" aria-label="Search">
          Search
        </button>
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  search: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
