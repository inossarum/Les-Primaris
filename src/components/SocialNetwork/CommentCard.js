import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DeleteComment from "./DeleteComment";
import {doc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../utils/firebase.config";
import {Edit} from "@mui/icons-material";
import {editComment} from "../../feature/comment.slice";
import PostHeader from "./PostHeader";
import LikeComment from "./LikeComment";

const CommentCard = ({comment, post}) => {
  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(null);
  const modifiedComment = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userWebSiteRole = useSelector((state) => state.user.webSiteRole);
  const userId = useSelector((state) => state.user.userId);
  const associatedNotification = useSelector((state) =>
    state.user.notifications.find(
      (notification) =>
        notification?.associatedComment === comment?.notificationId
    )
  );

  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  const handleRemoveNotification = async (e) => {
    const userNotificationsAfterRemoval = (user?.users
      .find((user) => user.id === post.authorId)
      ?.notifications ?? []).filter(
        (notification) =>
          notification?.associatedComment !== comment?.notificationId
      );

    e.preventDefault();

    if (post.authorId === userId) {
      try {
        await updateDoc(doc(db, "users", post.authorId), {
          notifications: userNotificationsAfterRemoval,
        });
      } catch (err) {
        console.error("Unable to update comment:", err?.code || err?.name);
      }
    }
  };

  const handleEditComment = async () => {
    const nextMessage = editedComment?.trim();
    if (!nextMessage) return;

    try {
      await updateDoc(doc(db, "comments", comment.id), {
        message: nextMessage,
      });
      dispatch(editComment([nextMessage, comment.id]));
      setEdit(false);
    } catch (error) {
      console.error("Unable to edit comment:", error);
    }
  };

  return (
    <div
      id={`#${comment.id}`}
      onMouseEnter={
        associatedNotification ? (e) => handleRemoveNotification(e) : () => ""
      }
      className={
        edit ? "comment-card-container edited" : "comment-card-container"
      }
    >
      <div className="comment-card-title-container">
        <div className="user-container">
          <PostHeader
            author={comment.author}
            webSiteRole={comment.authorWebSiteRole}
            factionRank={comment.authorFactionRank}
            factionPart={comment.authorFactionPart}
            photo={
              comment.authorId === userId ? user.photo : comment.authorPhoto
            }
          />

          {edit ? (
            <span className="editing-mention-displayer">
              Edition du commentaire en cours
            </span>
          ) : (
            ""
          )}
        </div>
        {(comment.authorId === auth.currentUser?.uid ||
          userWebSiteRole === "administrateur") && (
          <div className="comment-actions-container">
            <span
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <Edit />
            </span>
            <DeleteComment comment={comment} />
          </div>
        )}
      </div>
      <div className="publication-time-container">
        <p className="posted-time">
          Posté le {dateFormater(comment.createdAt)}
        </p>
        {user &&
        [...user?.notifications].find(
          (notification) =>
            notification?.associatedComment === comment?.notificationId
        ) ? (
          <div className="new-comment">NOUVEAU</div>
        ) : (
          ""
        )}
      </div>

      <div className="comment-content">
        {edit ? (
          <>
            <textarea
              className="edit-comment-message"
              autoFocus
              value={editedComment ? editedComment : comment.message}
              onChange={(e) => setEditedComment(e.target.value)}
              ref={modifiedComment}
            >
              {editedComment}
            </textarea>
            <span onClick={(e) => handleEditComment(e)}>
              Modifier le commentaire
            </span>
          </>
        ) : (
          <p className="comment">
            {editedComment ? editedComment : comment.message}
          </p>
        )}
      </div>
      <div className="icons-part">
        <LikeComment comment={comment} />
      </div>
    </div>
  );
};

export default CommentCard;
