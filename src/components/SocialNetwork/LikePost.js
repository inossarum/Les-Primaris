import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLike, disLike} from "../../feature/post.slice";
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const LikePost = ({post}) => {
  const dispatch = useDispatch();
  const [userLiked, setUserLiked] = useState(false);

  const liker = useSelector((state) => state.user.userId);

  const likePost = () => {
    updateDoc(doc(db, "posts", post.id), {
      likers: arrayUnion(liker),
    });
    dispatch(addLike([liker, post.id]));
    setUserLiked(true);
  };

  const disLikePost = () => {
    updateDoc(doc(db, "posts", post.id), {
      likers: arrayRemove(liker),
    });
    dispatch(disLike([liker, post.id]));

    setUserLiked(false);
  };

  useEffect(() => {
    if (post.likers) {
      if (post.likers.includes(liker)) {
        setUserLiked(true);
      }
    } else {
      setUserLiked(false);
    }
  }, [post.likers, liker]);

  return (
    <div className="like-icon">
      <p>{post.likers ? post.likers.length : 0}</p>
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

export default LikePost;
