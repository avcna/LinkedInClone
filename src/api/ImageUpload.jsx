import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./fireStoreAPIs";

export const ImageUpload = (file, id) => {
  const profilePicsRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);
  uploadTask.on(
    "state changed",
    (snapshot) => {
      const progress =
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      console.error(error);
    },
    () =>
      getDownloadURL(uploadTask.snapshot.ref).then((response) =>
        editProfile(id, { imageLink: response })
      )
  );
};
