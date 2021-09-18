import React from 'react';
import { connect } from 'react-redux';
import { useSortedAndSelectedShows } from '../../utils/filterShows';

// const a = {
//   id: 1,
//   url: 'https://www.tvmaze.com/shows/1/under-the-dome',
//   name: 'Under the Dome',
//   type: 'Scripted',
//   language: 'English',
//   genres: ['Drama', 'Science-Fiction', 'Thriller'],
//   status: 'Ended',
//   runtime: 60,
//   averageRuntime: 60,
//   premiered: '2013-06-24',
//   officialSite: 'http://www.cbs.com/shows/under-the-dome/',
//   schedule: { time: '22:00', days: ['Thursday'] },
//   rating: { average: 6.5 },
//   weight: 96,
//   network: {
//     id: 2,
//     name: 'CBS',
//     country: {
//       name: 'United States',
//       code: 'US',
//       timezone: 'America/New_York'
//     }
//   },
//   webChannel: null,
//   dvdCountry: null,
//   externals: {
//     tvrage: 25988,
//     thetvdb: 264492,
//     imdb: 'tt1553656'
//   },
//   image: {
//     medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
//     original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
//   },
//   summary: "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
//   updated: 1631010933,
//   _links: {
//     self: {
//       href: 'https://api.tvmaze.com/shows/1'
//     },
//     previousepisode: {
//       href: 'https://api.tvmaze.com/episodes/185054'
//     }
//   }
// };

const Shows = ({ shows, isLoad, genres, rating, premierDate }) => {
  const Template = ({ show }) => (
    <div>
      <h1>{show.name}</h1>
      <img src={show.image?.medium ?? ''} alt={show.name} />
      <img src={show.image?.original ?? ''} alt={show.name} />
      {show.genres.map((genre) => <p key={genre}>{genre}</p>)}
      <p>{show.rating.average}</p>
      <p>{show.premiered}</p>
    </div>
  );

  const newShows = useSortedAndSelectedShows(shows, genres, rating, premierDate);

  return (
    <>
      {newShows.map((show) => <Template show={show} key={show.id} />)}
    </>
  );
};

const mapStateToProps = (state) => {
  const { genres, rating, premierDate } = state.filters;
  return { genres, rating, premierDate };
};

export default connect(mapStateToProps)(Shows);
