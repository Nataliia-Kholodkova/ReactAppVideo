import * as axios from 'axios';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { ref, getStorage, getDownloadURL } from '@firebase/storage';
import { firebaseFirestore } from '../firebaseConf/firebaseConf';

const HTTP_AXIOS = axios.create({
  baseURL: 'https://api.tvmaze.com/'
});

const getShows = (page) => {
  return HTTP_AXIOS.get(`shows?page=${page}`)
    .then(data => data.data);
};

const getCurrentShows = (date) => {
  return Promise.all([
    HTTP_AXIOS.get(`schedule/web?date=${date}&country=`)
      .then(data => data.data)
      .then(data => data.map((item) => item._embedded.show)),
    HTTP_AXIOS.get('schedule')
      .then(data => data.data)
      .then(data => data.map((item) => item.show))
  ])
    .then((data) => [...data[0], ...data[1]])
    .then((data) => {
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

const getActorbyId = (actorId) => {
  return HTTP_AXIOS.get(`people/${actorId}`)
    .then(data => data.data);
};

const getActorCast = (actorId) => {
  return HTTP_AXIOS.get(`people/${actorId}/castcredits?embed=show`)
    .then(data => data.data)
    .then((data) => data.map((item) => item._embedded.show));
};

const getUserById = (id) => {
  const docRef = doc(firebaseFirestore, 'users', id);
  return getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    });
};

const getUsers = () => {
  return getDocs(collection(firebaseFirestore, 'users'))
    .then((data) => {
      const users = [];
      data.forEach((item) => users.push(item.data()));
      return users;
    });
};

const getUserPhoto = (uid) => {
  const storageRef = ref(getStorage(), `userProfile/${uid}`);
  return getDownloadURL(storageRef);
};

export { getActorbyId, getShowById, getShows, getShowByQuery, getActorCast, getCurrentShows, getUserById, getUsers, getUserPhoto };
