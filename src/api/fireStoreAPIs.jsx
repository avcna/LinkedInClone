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
  and,
} from "firebase/firestore";
import { toast } from "react-toastify";
import getUniqeId from "../helpers/getUniqeId";

const dbRef = collection(firestore, "post");
const userRef = collection(firestore, "user");
const likeRef = collection(firestore, "like");
const commentRef = collection(firestore, "comment");
const connectionRef = collection(firestore, "connections");

export const PostStatusAPI = (status, currentUser) => {
  const data = {
    status: status,
    timeStamp: serverTimestamp(),
    userEmail: localStorage.getItem("userEmail"),
    postId: getUniqeId(),
    currentUser: currentUser.name,
    postUserId: currentUser.UserId,
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
      })
    );
  });
};

export const getPostStatusByEmail = (setAllStatus, email) => {
  const q = query(dbRef, where("userEmail", "==", email));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const editStatus = (postId, payload) => {
  let docToEdit = doc(dbRef, postId);
  try {
    updateDoc(docToEdit, {
      status: payload,
      timeStamp: serverTimestamp(),
    }).then(() => {
      toast.success("Data updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStatus = (id) => {
  let docToEdit = doc(dbRef, id);
  try {
    deleteDoc(docToEdit).then(() => {
      toast.success("Data deleted successfully");
    });
  } catch (error) {
    console.log(error);
  }
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
      })
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  const q = query(userRef, orderBy("name", "asc"));
  onSnapshot(q, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const editProfile = (userId, payload) => {
  let userToEdit = doc(userRef, userId);
  const q = query(
    dbRef,
    where("userEmail", "==", localStorage.getItem("userEmail"))
  );

  const qc = query(
    commentRef,
    where("userEmail", "==", localStorage.getItem("userEmail"))
  );

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Data updated successfully");

      getDocs(q).then((querySnapshot) => {
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
      });

      getDocs(qc)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Update each document here
            const documentReference = doc.ref;
            const dataToUpdate = {
              name: payload.name,
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

export const postComment = (postId, comment, name) => {
  try {
    addDoc(commentRef, {
      name,
      postId,
      comment,
      timeStamp: serverTimestamp(),
      userEmail: localStorage.getItem("userEmail"),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getComment = (postId, setComments) => {
  try {
    let comments = query(
      commentRef,
      where("postId", "==", postId)
      // orderBy("timeStamp", "desc")
    );
    onSnapshot(comments, (response) => {
      setComments(response.docs.map((doc) => doc.data()));
    });
  } catch (error) {
    console.log(error);
  }
};

export const addConnection = (currUser, target) => {
  try {
    let connectionToAdd = doc(connectionRef, `${currUser}_${target}`);
    setDoc(connectionToAdd, { currUser, target });
    toast.success("Connection Added!");
  } catch (error) {
    console.log(error);
  }
};

export const getConnection = (currUser, target) => {
  try {
    let connectionsRef = query(connectionRef, where("target", "==", target));
    onSnapshot(connectionsRef, (response) => {
      let connection = response.docs.map((doc) => doc.data());
      const isConnected = connection.some((con) => con.currUser === currUser);
      console.log(isConnected);
    });
  } catch (error) {
    console.log(error);
  }
};
