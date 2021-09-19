import React from 'react';
import { NavLink } from 'react-router-dom';

const Line = ({ shows, genre, setGenre }) => (<section>
  <NavLink to={`/shows/${genre}`} onClick={() => setGenre([genre])}>{genre}</NavLink>
  {shows.map((show) => <NavLink key={show.id} to={`/shows/show/${show.id}`} >
    <img src={show.image.medium} />
  </NavLink>)}
</section>);

export default Line;
