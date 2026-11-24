import React from "react";
import {useState} from "react";
import CommentPosts from "./CommentPosts";
import {useDispatch, useSelector} from "react-redux";
import {editPost} from "../../feature/post.slice";
import LikePost from "./LikePost";
import DeletePost from "./DeletePost";
import {doc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../utils/firebase.config";
import {Edit} from "@mui/icons-material";
import PostHeader from "./PostHeader";

const Post = ({post}) => {
  const user = useSelector((state) => state.user);
  const userWebSiteRole = useSelector((state) => state.user.webSiteRole);
  const associatedNotification = user.notifications.find(
    (notification) => notification?.associatedPost === post?.notificationId
  );
  const [edit, setEdit] = useState(false);
  const [editMess, setEditMess] = useState("");
  const dispatch = useDispatch();

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

  const handleRemoveAssociatedNotification = async (e) => {
    e.preventDefault();
    const userNotificationsAfterRemoval = user.notifications.filter(
      (notification) => notification.associatedPost !== post.notificationId
    );

    await updateDoc(doc(db, "users", user.userId), {
      notifications: userNotificationsAfterRemoval,
    });
  };

  const handleEdit = async () => {
    const nextMessage = editMess.trim();
    if (!nextMessage) return;

    try {
      await updateDoc(doc(db, "posts", post.id), {
        message: nextMessage,
      });
      dispatch(editPost([nextMessage, post.id]));
      setEdit(false);
    } catch (error) {
      console.error("Unable to edit post:", error);
    }
  };

  return (
    <div
      id={post._id}
      className="post-card-container"
      onMouseEnter={
        associatedNotification
          ? (e) => handleRemoveAssociatedNotification(e)
          : () => ""
      }
    >
      <div className="card-header">
        <div className="user-container">
          <PostHeader author={post.author} />
        </div>

        {(post.authorId === auth.currentUser?.uid ||
          userWebSiteRole === "administrateur") && (
          <div className="post-actions-container">
            <span
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <Edit />
            </span>
            <DeletePost post={post} imageRef={post.imageRef} />
          </div>
        )}
        {edit ? (
          <span className="editing-post-mention-displayer">
            Edition du post en cours
          </span>
        ) : (
          ""
        )}
      </div>

      <div className="publication-time-container">
        <p className="posted-time">Posté le {dateFormater(post.createdAt)}</p>
        {user &&
        [...user?.notifications].find(
          (notification) =>
            notification.associatedPost === post.notificationId &&
            notification?.type === "nouveau post"
        ) ? (
          <div className="new-post">NOUVEAU</div>
        ) : (
          ""
        )}
      </div>

      <div className="post-content">
        <div className="post-image-container">
          {post?.image ? <img src={post.image} alt={post.image}></img> : ""}
        </div>
        {post?.message !== "" ? (
          <>
            {edit ? (
              <>
                <textarea
                  className="edit-post-content-textarea"
                  autoFocus
                  value={editMess ? editMess : post.message}
                  onChange={(e) => setEditMess(e.target.value)}
                >
                  {editMess}
                </textarea>
                <span
                  className="validate-edit-btn"
                  onClick={() => handleEdit()}
                >
                  Modifier message
                </span>
              </>
            ) : (
              <p className="message">{editMess ? editMess : post.message}</p>
            )}{" "}
          </>
        ) : (
          ""
        )}

        <div className="icons-part">
          <LikePost post={post} />
        </div>
        <CommentPosts post={post} user={user.currentUser} />
      </div>
    </div>
  );
};

export default Post;
