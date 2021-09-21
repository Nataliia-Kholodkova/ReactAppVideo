import React from 'react';
import ActorSmall from '../ActorSmall/ActorSmall';

const Actors = ({ actors, isLoad }) => {
  return (
    <>
      {actors.map((actor) => <ActorSmall actor={actor} key={actor.id} />)}
    </>
  );
};

export default Actors;
