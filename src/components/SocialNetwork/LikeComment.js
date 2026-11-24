import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLike, disLike} from "../../feature/comment.slice";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const LikeComment = ({comment}) => {
  const dispatch = useDispatch();
  const [userLiked, setUserLiked] = useState(false);

  const liker = useSelector((state) => state.user.userId);

  const likePost = async () => {
    if (!liker || !comment?.id) return;
    try {
      await updateDoc(doc(db, "comments", comment.id), {
        likers: arrayUnion(liker),
      });
      dispatch(addLike([liker, comment.id]));
      setUserLiked(true);
    } catch (error) {
      console.error("Unable to like comment:", error);
    }
  };

  const disLikePost = async () => {
    if (!liker || !comment?.id) return;
    try {
      await updateDoc(doc(db, "comments", comment.id), {
        likers: arrayRemove(liker),
      });
      dispatch(disLike([liker, comment.id]));
      setUserLiked(false);
    } catch (error) {
      console.error("Unable to remove comment like:", error);
    }
  };

  useEffect(() => {
    setUserLiked(Boolean(comment.likers?.includes(liker)));
  }, [comment.likers, liker]);

  return (
    <div className="like-icon">
      <p>{comment.likers ? comment.likers.length : 0}</p>
      {userLiked ? (
        <span id="disliked-btn" onClick={() => disLikePost()}>
          &#9829;
        </span>
      ) : (
        <span id="liked-btn" onClick={() => likePost()}>
          &#9829;
        </span>
      )}
    </div>
  );
};

export default LikeComment;
