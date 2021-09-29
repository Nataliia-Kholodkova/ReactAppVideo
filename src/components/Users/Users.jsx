import React from 'react';
import UserSmall from '../UserSmall/UserSmall';
import { updateFriends } from '../../firebaseConf/profileUpdate';

const Users = ({ users, isLoad, currentUserFriendIds, currentUser }) => {
  return (
    <>
      {users && users.map((user) => <UserSmall user={user} key={user.uid} followed={currentUserFriendIds.includes(user.uid)} updateFollowedList={updateFriends} currentUser={currentUser} currentUserFriendIds={currentUserFriendIds} />)}
    </>
  );
};

export default Users;
