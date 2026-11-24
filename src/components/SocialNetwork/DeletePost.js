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

  const handleDelete = async () => {
    await Promise.all([
      deleteDoc(doc(db, "posts", post.id)),
      ...(users ?? [])
        .filter((user) => user.id !== post.authorId)
        .map((user) => {
          const notifications = (user.notifications ?? []).filter(
            (notification) =>
              notification?.associatedPost !== post?.notificationId
          );
          return updateDoc(doc(db, "users", user.id), {notifications});
        }),
      ...(comments ?? [])
        .filter((comment) => comment.uid === post.id)
        .map((comment) => deleteDoc(doc(db, "comments", comment.id))),
      ...(typeof imageRef === "string" && imageRef.trim() !== ""
        ? [deleteObject(ref(storage, imageRef))]
        : []),
    ]);
    dispatch(deletePost(post.id));
  };

  return (
    <span onClick={() => handleDelete()}>
      <Delete />
    </span>
  );
};

export default DeletePost;
