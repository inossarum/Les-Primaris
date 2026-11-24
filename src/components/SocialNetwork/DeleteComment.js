import React from "react";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment} from "../../feature/comment.slice";

const DeleteComment = ({comment}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === comment.postAuthorId)
  );
  const userNotificationsToRemove = useSelector((state) =>
    state.user.users
      .find((user) => user?.id === comment?.postAuthorId)
      ?.notifications.filter(
        (notification) =>
          notification?.associatedComment !== comment?.notificationId
      )
  );

  const handleDelete = () => {
    deleteDoc(doc(db, "comments", comment.id));
    dispatch(deleteComment(comment.id));

    updateDoc(doc(db, "users", user.id), {
      notifications: userNotificationsToRemove,
    });
  };

  return (
    <span onClick={() => handleDelete()}>
      <Delete />
    </span>
  );
};

export default DeleteComment;
