import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/userAuthContext';
import Users from '../../Users/Users';
import Error from '../Error/Error';
import { getUsers } from '../../../utils/getDataFromServer';

const UsersPage = () => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const { friends } = currentUserProfile || {};
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    setIsLoad(true);
    getUsers()
      .then((users) => setUsers(users.filter(({ uid }) => uid !== currentUser?.uid)))
      .catch((error) => setLoadError(`Server error: ${error.message}`))
      .finally(() => setIsLoad(false));
  }, []);

  return (
    <>
      {loadError && <Error error={loadError} />}
      <main className="main mainAside">
        {!loadError && <Users users={users} isLoad={isLoad} currentUserFriendIds={friends || []} currentUser={currentUser} />}
      </main>
    </>
  );
};

export default UsersPage;
