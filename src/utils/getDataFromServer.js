import * as axios from 'axios';

const HTTP_AXIOS = axios.create({
  baseURL: 'https://api.tvmaze.com/',
});

const getShows = (page) => {
  return HTTP_AXIOS.get(`shows?page=${page}`).then(data => data.data);
};

const getShowById = (showId) => {
  return HTTP_AXIOS.get(`shows/${showId}?embed=cast`).then(data => data.data);
};

const getShowByQuery = (query) => {
  // return HTTP_AXIOS.get(`singlesearch/shows?q=${query}&embed=cast`).then(data => data.data);
  return HTTP_AXIOS.get(`search/shows?q=${query}&embed=cast`).then(data => data.data).then((data) => data.map((item) => item.show));
};

const getActors = (query) => {
  return HTTP_AXIOS.get(`search/people?q=${query}`).then(data => data.data);
};

const getActorbyId = (actorId) => {
  return HTTP_AXIOS.get(`people/${actorId}?embed=castcredits`).then(data => data.data);
};

export { getActorbyId, getActors, getShowById, getShows, getShowByQuery };
