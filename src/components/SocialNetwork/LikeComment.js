import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLike, disLike} from "../../feature/comment.slice";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const LikeComment = ({comment}) => {
  const dispatch = useDispatch();
  const [userLiked, setUserLiked] = useState(false);

  const liker = useSelector((state) => state.user.userId);

  const likePost = () => {
    updateDoc(doc(db, "comments", comment.id), {
      likers: arrayUnion(liker),
    });
    dispatch(addLike([liker, comment.id]));
    setUserLiked(true);
  };

  const disLikePost = () => {
    updateDoc(doc(db, "comments", comment.id), {
      likers: arrayRemove(liker),
    });
    dispatch(disLike([liker, comment.id]));

    setUserLiked(false);
  };

  useEffect(() => {
    if (comment.likers) {
      if (comment.likers.includes(liker)) {
        setUserLiked(true);
      }
    } else {
      setUserLiked(false);
    }
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
