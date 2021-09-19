import React from 'react';
import { useHistory } from 'react-router-dom';

const ActorSmall = ({ actor }) => {
  const hist = useHistory();
  if (Object.keys(actor).length === 0) {
    return null;
  }
  const { name, country, image, id } = actor;
  return (
    <div onClick={() => hist.push(`/actors/${id}`)}>
      <h1>{name}</h1>
      <img src={image
        ? image.medium ?? ''
        : ''} alt={name} />
      <p>{country?.name ?? ''}</p>
    </div>
  );
};

export default ActorSmall;
