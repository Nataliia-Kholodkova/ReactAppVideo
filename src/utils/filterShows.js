import { useMemo } from 'react';
const useSortByRatingShows = (shows, order) =>
  useMemo(() => {
    const newShows = [...shows];
    switch (order) {
      case 'asc':
        newShows.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case 'desc':
        newShows.sort((a, b) => a.rating.average - b.rating.average);
        break;
      default:
        break;
    }
    return newShows;
  }, [shows, order]);

const useSortByPremierDateShows = (shows, order) =>
  useMemo(() => {
    const newShows = [...shows];
    switch (order) {
      case 'asc':
        newShows.sort(
          (a, b) =>
            new Date(b.premiered).getTime() -
                        new Date(a.premiered).getTime()
        );
        break;
      case 'desc':
        newShows.sort(
          (a, b) =>
            new Date(a.premiered).getTime() -
                        new Date(b.premiered).getTime()
        );
        break;
      default:
        break;
    }
    return newShows;
  }, [shows, order]);

const useFilteredByGenreShows = (shows, genres) => {
  return useMemo(
    () => {
      if (genres.length === 0) {
        return shows;
      };
      return shows.filter((show) => genres.some((genre) => show.genres.includes(genre)));
    },
    [shows, ...[genres]]
  );
};

const useSortedAndSelectedShows = (shows, genres, ratingOrder, dateOrder) => {
  const sortedShows = useSortByRatingShows(useSortByPremierDateShows(shows, dateOrder), ratingOrder);
  const selectedShows = useFilteredByGenreShows(sortedShows, genres);
  return selectedShows;
};

export { useSortedAndSelectedShows, useFilteredByGenreShows, useSortByPremierDateShows, useSortByRatingShows };
