import React, {useState} from "react";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import CommentCard from "./CommentCard";
import {getPostAuthorDatas} from "../../feature/post.slice";
import {addDoc, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const CommentPosts = ({post}) => {
  const user = useSelector((state) => state.user.currentUser);
  const userWebSiteRole = useSelector((state) => state.user.webSiteRole);
  const userFactionRank = useSelector((state) => state.user.factionRank);
  const userFactionPart = useSelector((state) => state.user.factionPart);
  const userPhoto = useSelector((state) => state.user.photo);
  const userId = useSelector((state) => state.user.userId);
  const users = useSelector((state) => state.user.users);
  const comments = useSelector((state) => state.comments.commentsData);
  const commentContent = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    const message = commentContent.current?.value?.trim() ?? "";
    if (!message) {
      setError("Vous ne pouvez pas envoyer un contenu vide !");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const comment = {
      uid: post.id,
      postAuthorId: post.authorId,
      author: user,
      authorId: userId,
      message,
      authorFactionRank: userFactionRank,
      authorFactionPart: userFactionPart,
      authorWebSiteRole: userWebSiteRole,
      authorPhoto: userPhoto,
      likers: [],
      createdAt: new Date().toISOString(),
      notificationId: Date.now() + Math.random(),
    };

    try {
      await addDoc(collection(db, "comments"), comment);

      if (userId !== post.authorId) {
        const notificationData = {
          type: "commentaire à un post",
          postAuthor: post.author,
          postId: post.id,
          commentAuthor: user,
          commentContent: message,
          postContent: post.message,
          createdAt: Date.now(),
          associatedComment: comment.notificationId,
        };

        const postAuthor = (users ?? []).find(
          (user) => user.id === post.authorId
        );
        if (postAuthor) {
          await updateDoc(doc(db, "users", post.authorId), {
            notifications: [
              ...(postAuthor.notifications ?? []),
              notificationData,
            ],
          });
        }
      }

      commentContent.current.value = "";
      setError("");
    } catch (error) {
      setError("Le commentaire n'a pas pu être envoyé.");
      console.error("Unable to create comment:", error);
    }
  };

  return (
    <div className="comment-container">
      <h5 className="comment-title">Commentaires</h5>
      {comments &&
        [...comments]
          .filter((comment) => comment.uid === post.id)
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .map((comment) => (
            <CommentCard
              key={comment.id ?? comment.notificationId}
              comment={comment}
              post={post}
            />
          ))}

      {user ? (
        <form
          className="comment-redaction-container"
          onSubmit={(e) => handleComment(e)}
        >
          <textarea
            className="comment-textarea"
            autoFocus
            placeholder="Envoyer un commentaire..."
            ref={commentContent}
            onClick={() =>
              getDoc(doc(db, "users", post.authorId)).then((res) =>
                dispatch(getPostAuthorDatas({...res.data()}))
              )
            }
          ></textarea>
          <div className="input-container">
            <input type="submit" value="Envoyer" />
            {error ? <span className="error-displayer">{error}</span> : ""}
          </div>
        </form>
      ) : (
        <div className="comment-redaction-container">
          <p>Vous devez être connecté pour rédiger un commentaire</p>
        </div>
      )}
    </div>
  );
};

export default CommentPosts;
