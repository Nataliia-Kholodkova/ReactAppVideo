import { doc, updateDoc } from 'firebase/firestore';
import { firebaseFirestore } from './firebaseConf';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const updateProfilePhoto = (user, photo) => {
  if (photo) {
    const storageRef = ref(getStorage(), `userProfile/${user.uid}`);
    return uploadBytes(storageRef, photo)
      .then(() => {
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        return updateProfile(user, {
          photoURL: url
        });
      });
  }
  return Promise.resolve();
};

const createInitials = (firstName, lastName) => `${firstName ? `${firstName[0].toUpperCase()}` : ''}${lastName ? `${lastName[0].toUpperCase()}` : ''}`;

const constructFields = (firstName, lastName, gender, country, city, phone, uid) => {
  const fields = { uid };
  if (firstName) {
    fields.firstName = firstName;
  }
  if (lastName) {
    fields.lastName = lastName;
  }
  if (gender) {
    fields.gender = gender;
  }
  if (country) {
    fields.country = country;
  }
  if (city) {
    fields.city = city;
  }
  if (phone) {
    fields.phone = phone;
  }
  return fields;
};

const updateProfileInitials = (firstName, lastName, user) => {
  const initials = createInitials(firstName, lastName);
  if (initials) {
    return updateProfile(user, {
      displayName: initials,
    });
  }
  return Promise.resolve();
};

const updateUserProfileData = (user, firstName, lastName, gender, country, city, phone) => {
  const updateFields = constructFields(firstName, lastName, gender, country, city, phone, user.uid);
  if (Object.keys(updateFields).length > 0) {
    const usersCollection = doc(firebaseFirestore, 'users', user.uid);
    return updateDoc(usersCollection, updateFields);
  };
  return Promise.resolve();
};

const updateFavouriteShows = (user, shows) => {
  const usersCollection = doc(firebaseFirestore, 'users', user.uid);
  return updateDoc(usersCollection, { likedShows: shows });
};

const updateFriends = (user, friends) => {
  const usersCollection = doc(firebaseFirestore, 'users', user.uid);
  return updateDoc(usersCollection, { friends: friends });
};

export {
  updateProfilePhoto, updateProfileInitials, updateUserProfileData, updateFavouriteShows, updateFriends
};
