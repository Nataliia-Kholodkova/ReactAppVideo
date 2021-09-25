import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const updatePhoto = (user, photo) => {
  if (photo) {
    const ext = photo.name.split('.').pop();
    const storageRef = ref(getStorage(), `userProfile/${user.uid}.${ext}`);
    uploadBytes(storageRef, photo)
      .then(() => {
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        return updateProfile(user, {
          photoURL: url
        });
      });
  }
};

const createInitials = (firstName, lastName) => `${firstName ? `${firstName[0].toUpperCase()}` : ''}${lastName ? `${lastName[0].toUpperCase()}` : ''}`;

const constructFields = (firstName, lastName, gender) => {
  const fields = {};
  if (firstName) {
    fields.firstName = firstName;
  }
  if (lastName) {
    fields.lastName = lastName;
  }
  if (gender) {
    fields.gender = gender;
  }
  return fields;
};

export { updatePhoto, createInitials, constructFields };
