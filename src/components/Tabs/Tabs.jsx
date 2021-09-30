import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Users from '../Users/Users';
import Shows from '../Shows/Shows';
import styles from './Tabs.module.css';

const Tabs = ({ shows, showsLoad, friends, friendsLoad, currentUserProfile, friendsId, showsError, friendsError }) => {
  const [friendsTabOpened, setFriendsTabOpened] = useState(false);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.buttonTabs}>
        <Button type="button" text="My shows" onClick={() => { setFriendsTabOpened(false); }} className={`tab${friendsTabOpened ? '' : 'Active'}`} />
        <Button type="button" text="My friends" onClick={() => { setFriendsTabOpened(true); }} className={`tab${friendsTabOpened ? 'Active' : ''}`} />
      </div>
      {(!friendsTabOpened && !showsError) && <div className={styles.contentContainer}>
        {shows.length === 0 && !showsLoad && <h2 className={styles.title}>You don&apos;t have favourite shows yet</h2>}
        <Shows shows={shows} isLoad={showsLoad} />
      </div>}
      {(friendsTabOpened && !friendsError) && <div className={styles.contentContainer}>
        {friends.length === 0 && !friendsLoad && <h2 className={styles.title}>You don&apos;t have friends yet</h2>}
        <Users users={friends} currentUserFriendIds={friendsId} currentUser={currentUserProfile} />
      </div>}
    </div>
  );
};

export default Tabs;
