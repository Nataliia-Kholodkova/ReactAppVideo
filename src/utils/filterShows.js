import { useMemo } from 'react';
const useSortShows = (shows, order) => (
  useMemo(() => {
  const newShows = [...shows];
    switch (order) {
      case 'asc':
        newShows.sort(
          (a, b) => b.rating.average - a.rating.average);
          break;
      case 'desc':
          newShows.sort((a, b) => a.rating.average - b.rating.average);
          break;
      default:
          break;
  }
  return newShows;
  }, [shows, order])
);

const useFilteredByGenreShows = (shows, genre) => {
  return useMemo(() => shows.filter(
    (show) => show.genres.filter((showGenre) => showGenre.toLowerCase().includes(genre.toLowerCase())).length > 0
  ), [shows, genre])
};

const useSortedAndSelectedShows = (shows, genre, order) => {
  const sortedShows = useSortShows(shows, order);
  const selectedShows = useFilteredByGenreShows(sortedShows, genre);
  return selectedShows;
  };

  export default useSortedAndSelectedShows;
