import React from 'react';

import { AppBarLink, Navigation } from './AppBar.styled.';

export default function AppBar() {
  return (
    <Navigation>
      <nav>
        <AppBarLink exact to="/" activeClassName="activelink">
          Home
        </AppBarLink>
        <AppBarLink to="/movies" activeClassName="activelink">
          Movies
        </AppBarLink>
      </nav>
    </Navigation>
  );
}
