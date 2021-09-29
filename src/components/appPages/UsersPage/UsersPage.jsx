import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/userAuthContext';
import Users from '../../Users/Users';
import { getUsers } from '../../../utils/getDataFromServer';

const UsersPage = () => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const { friends } = currentUserProfile || {};

  useEffect(() => {
    setIsLoad(true);
    getUsers()
      .then((users) => setUsers(users))
      .finally(() => setIsLoad(false));
  }, []);

  return (
    <>
      <main className="main mainAside">
        <Users users={users} isLoad={isLoad} currentUserFriendIds={friends || []} currentUser={currentUser} />
      </main>
    </>
  );
};

export default UsersPage;
