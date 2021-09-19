import React from 'react';
import { useHistory } from 'react-router-dom';

const ShowBig = ({ show }) => {
  const hist = useHistory();
  if (Object.keys(show).length === 0) {
    return null;
  }
  const { image, name, rating: { average }, premiered, genres, status, schedule: { time, days }, summary, _embedded: { cast } } = show;
  return (
    <section>
      <h1>{name}</h1>
      <img src={image.original || image.medium} />
      <p>{average}</p>
      <p>{premiered}</p>
      {genres.map((genre) => <p key={genre}>{genre}</p>)}
      {status === 'Ended'
        ? <p>{status}</p>
        : <p>{time}, {days.map((day) => <span key={day}>{day}</span>)}</p>
      }
      {summary}
      {cast.map(
        (item) => (
          <div key={item.person.id} onClick={() => {
            hist.push(`/actors/${item.person.id}`);
          }}>
            <img src={item.person.image.medium}></img>
            <p>{item.person.name}</p>
          </div>
        )
      )
      }

    </section>
  );
};

export default ShowBig;
