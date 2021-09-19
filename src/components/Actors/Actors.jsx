import React from 'react';
import ActorSmall from '../ActorSmall/ActorSmall';

// const a = {
//   score: 0.5,
//   person: {
//     id: 5308,
//     url: 'https://www.tvmaze.com/people/5308/val-lauren',
//     name: 'Val Lauren',
//     country: {
//       name: 'United States',
//       code: 'US',
//       timezone: 'America/New_York'
//     },
//     birthday: null,
//     deathday: null,
//     gender: 'Male',
//     image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/191/479296.jpg', original: 'https://static.tvmaze.com/uploads/images/original_untouched/191/479296.jpg' },
//     _links: { self: { href: 'https://api.tvmaze.com/people/5308' } }
//   }
// };

const Actors = ({ actors, isLoad }) => {
  return (
    <section>
      {actors.map((actor) => <ActorSmall actor={actor} key={actor.id} />)}
    </section>
  );
};

export default Actors;
