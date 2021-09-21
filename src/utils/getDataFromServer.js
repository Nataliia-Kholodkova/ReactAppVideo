import * as axios from 'axios';

const HTTP_AXIOS = axios.create({
  baseURL: 'https://api.tvmaze.com/'
});

const getShows = (page) => {
  return HTTP_AXIOS.get(`shows?page=${page}`)
    .then(data => data.data);
};

const getCurrentShows = (date) => {
  return HTTP_AXIOS.get(`schedule/web?date=${date}&country=`)
    .then(data => data.data)
    .then(data => data.map((item) => item._embedded.show))
    .then(data => {
      const ids = data.map(show => show.id);
      return data.filter((show, idx) => ids.indexOf(show.id) === idx);
    });
};

const getShowById = (showId) => {
  return HTTP_AXIOS.get(`shows/${showId}?embed=cast`)
    .then(data => data.data);
};

const getShowByQuery = (query) => {
  return HTTP_AXIOS.get(`search/shows?q=${query}&embed=cast`)
    .then(data => data.data)
    .then((data) => data.map((item) => item.show));
};

const getActors = (query) => {
  return HTTP_AXIOS.get(`search/people?q=${query}`)
    .then(data => data.data)
    .then((data) => data.map((item) => item.person));
};

const getActorbyId = (actorId) => {
  return HTTP_AXIOS.get(`people/${actorId}`)
    .then(data => data.data);
};

const getActorCast = (actorId) => {
  return HTTP_AXIOS.get(`people/${actorId}/castcredits?embed=show`)
    .then(data => data.data)
    .then((data) => data.map((item) => item._embedded.show));
};

export { getActorbyId, getActors, getShowById, getShows, getShowByQuery, getActorCast, getCurrentShows };
