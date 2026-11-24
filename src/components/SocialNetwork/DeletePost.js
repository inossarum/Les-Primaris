import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../../feature/post.slice";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db, storage} from "../../utils/firebase.config";
import {Delete} from "@mui/icons-material";
import {deleteObject, ref} from "firebase/storage";

const DeletePost = ({post, imageRef}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const comments = useSelector((state) => state.comments.commentsData);

  const handleDelete = () => {
    deleteDoc(doc(db, "posts", post.id));
    users &&
      [...users]
        .filter((user) => user.id !== post.authorId)
        .map((user) => {
          const userNotificationsAfterRemoval = user.notifications.filter(
            (notification) =>
              notification?.associatedPost !== post?.notificationId
          );
          updateDoc(doc(db, "users", user.id), {
            notifications: userNotificationsAfterRemoval,
          });
        });

    let i;
    for (i = 0; i < comments.length; i++) {
      if (comments[i].uid === post.id) {
        deleteDoc(doc(db, "comments", comments[i].id));
      }
    }
    if (imageRef !== undefined || imageRef !== "" || imageRef !== null) {
      deleteObject(ref(storage, imageRef));
    }

    dispatch(deletePost(post.id));
  };

  return (
    <span onClick={() => handleDelete()}>
      <Delete />
    </span>
  );
};

export default DeletePost;
