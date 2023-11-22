import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import getUniqeId from "../helpers/getUniqeId";

const dbRef = collection(firestore, "post");
const userRef = collection(firestore, "user");
const likeRef = collection(firestore, "like");

export const PostStatusAPI = (status, currentUser) => {
  const data = {
    status: status,
    timeStamp: serverTimestamp(),
    userEmail: localStorage.getItem("userEmail"),
    postId: getUniqeId(),
    currentUser: currentUser.name,
  };

  addDoc(dbRef, data)
    .then(() => {
      toast.success("Post added successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPostStatus = (setAllStatus) => {
  const q = query(dbRef, orderBy("timeStamp", "desc"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      }),
    );
  });
};

export const getPostStatusByEmail = (setAllStatus, email) => {
  const q = query(dbRef, where("userEmail", "==", email));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      }),
    );
  });
};

export const postUserData = (data) => {
  addDoc(userRef, data)
    .then(() => {
      toast.success("Data added successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserByEmail = (setCurrentUser, email) => {
  const q = query(userRef, where("email", "==", email));
  onSnapshot(q, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), UserId: docs.id };
      }),
    );
  });
};

export const editProfile = (userId, payload) => {
  let userToEdit = doc(userRef, userId);
  const q = query(
    dbRef,
    where("userEmail", "==", localStorage.getItem("userEmail")),
  );

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Data updated successfully");

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Update each document here
            const documentReference = doc.ref;
            const dataToUpdate = {
              currentUser: payload.name,
            };

            // Update the document
            updateDoc(documentReference, dataToUpdate)
              .then(() => {
                console.log("Document successfully updated");
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error fetching documents: ", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const likePost = (userId, postId, isLiked) => {
  try {
    const docToLike = doc(likeRef, `${userId}_${postId}`);
    if (isLiked) {
      deleteDoc(docToLike);
    } else {
      let docToLike = doc(likeRef, `${userId}_${postId}`);
      setDoc(docToLike, { userId, postId });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLikesByUser = (userId, postId, setLikesCount, setIsLiked) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));
    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      const isLiked = likes.some((like) => like.userId === userId);
      setLikesCount(likes.length);
      setIsLiked(isLiked);
    });
  } catch (error) {
    console.log(error);
  }
};
