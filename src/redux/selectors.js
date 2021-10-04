import { createSelector } from 'reselect';

export const getActorSelector = createSelector(
  (state) => state.actor,
  (actor) => actor
);

export const getSearchedShowsSelector = createSelector(
  (state) => state.searchedShows,
  (shows) => shows
);

export const getSearchedQuerySelector = createSelector(
  (state) => state.filters.searchQuery,
  (query) => query
);

export const getCurrentShowsSelector = createSelector(
  (state) => state.currentShows,
  (data) => ({ ...data, shows: data.shows.filter((show) => show.image) })
);

export const getShowSelector = createSelector(
  (state) => state.show,
  (show) => show,
);

export const getShowsSelector = createSelector(
  (state) => state.shows,
  (shows) => shows
);

export const getFiltersSelector = createSelector(
  (state) => state.filters,
  (filters) => filters,
);

// export const getShowsSelector = createSelector(
//   (state) => state.shows,
//   (state) => state.filters,
//   (shows, filters) => {
//     const { genres, rating, premierDate } = filters;
//     const filteredShows = useSortedAndSelectedShows(shows.shows, genres, rating, premierDate);
//     return { ...shows, shows: filteredShows };
//   }
// );
