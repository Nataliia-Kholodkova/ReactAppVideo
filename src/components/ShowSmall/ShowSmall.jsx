import React from 'react';
import { useHistory } from 'react-router-dom';

const ShowSmall = ({ show }) => {
  const hist = useHistory();
  return (
    <div onClick={() => hist.push(`/shows/${show.id}}`)}>
      <h1>{show.name}</h1>
      <img src={show.image?.medium ?? ''} alt={show.name} />
      <img src={show.image?.original ?? ''} alt={show.name} />
      {show.genres.map((genre) => <p key={genre}>{genre}</p>)}
      <p>{show.rating.average}</p>
      <p>{show.premiered}</p>
    </div>
  );
};

export default ShowSmall;
