import React from 'react';
import UserSmall from '../UserSmall/UserSmall';

const Users = ({ users, currentUserFriendIds, currentUser }) => {
  return (
    <>
      {users && users.map((user) => <UserSmall user={user} key={user.uid} followed={currentUserFriendIds.includes(user.uid)} currentUser={currentUser} currentUserFriendIds={currentUserFriendIds} />)}
    </>
  );
};

export default Users;
