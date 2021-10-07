import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Wrapper, Input, ButtonForm } from './SearchBar.styled.jsx';

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
    setSearch('');
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          value={search}
          autoComplete="off"
          onChange={handleSearchChange}
          autoFocus
          placeholder="Search images and photos"
        />
        <ButtonForm className="form-btn" type="submit" aria-label="Search">
          Search
        </ButtonForm>
      </form>
    </Wrapper>
  );
}

Searchbar.propTypes = {
  search: PropTypes.string,
  onSubmit: PropTypes.func,
};
