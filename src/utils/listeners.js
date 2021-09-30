import { updateFavouriteShows, updateFriends } from '../firebaseConf/profileUpdate';

const heartOnClick = (currentUser, show, isFavourite, likedShows) => {
  const newShows = isFavourite
    ? likedShows.filter((id) => id !== show.id)
    : likedShows.concat([show.id]);
  return updateFavouriteShows(currentUser, newShows);
};

const updateFriendsOnClick = (followed, friends, user, currentUser) => {
  const newUsers = followed
    ? friends.filter((id) => id !== user.uid)
    : friends.concat([user.uid]);
  return updateFriends(currentUser, newUsers);
};

export { heartOnClick, updateFriendsOnClick };
