import React from 'react';
import { NavLink } from 'react-router-dom';

const ActorBig = ({ actor, cast }) => {
  if (Object.keys(actor).length === 0) {
    return null;
  }
  const { image, name, country: { name: country }, birthday, deathday } = actor;
  if (cast.length === 0) {
    return null;
  }
  return (
    <section>
      <h1>{name}</h1>
      <img src={image.original || image.medium} />
      <p>{country}</p>
      <p>{birthday ?? ''}</p>
      <p>{deathday ?? ''}</p>
      {cast.map((show) => <NavLink key={show.id} to={`/shows/show/${show.id}`} >
    <img src={show.image.medium} />
  </NavLink>)}

    </section>
  );
};

export default ActorBig;
