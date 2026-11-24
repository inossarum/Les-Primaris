import {onAuthStateChanged} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CreatePost from "../components/SocialNetwork/CreatePost";
import Post from "../components/SocialNetwork/Post";
import {getUser} from "../feature/user.slice";
import {auth, db} from "../utils/firebase.config";
import {getPosts} from "../feature/post.slice";
import {collection, onSnapshot} from "firebase/firestore";
import {getComments} from "../feature/comment.slice";
import NavBar from "../components/Navbar/NavBar";

const SocialNetwork = () => {
  const [user, setUser] = useState(null);
  const posts = useSelector((state) => state.posts.postsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth !== null)
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        dispatch(getUser(currentUser ? currentUser.displayName : null));
      });

    // Real time updating posts and dispatch with Redux
    onSnapshot(collection(db, "posts"), (snapshot) => {
      let postsData = [];
      snapshot.docs.forEach((doc) => {
        postsData.push({...doc.data(), id: doc.id});
      });
      dispatch(getPosts(postsData));
    });
    onSnapshot(collection(db, "comments"), (snapshot) => {
      let commentsData = [];
      snapshot.docs.forEach((doc) => {
        commentsData.push({...doc.data(), id: doc.id});
      });
      dispatch(getComments(commentsData));
    });

    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="social-network-body">
      <NavBar factionPart="civilian" pageActive={"socialNetwork"} />

      <div className="social-network-title-container">
        <h2>centre de communication Primaris</h2>
      </div>
      <div className="chat-container">
        {user ? <CreatePost uid={user?.uid} /> : ""}
      </div>
      <div className="posts-container">
        {posts &&
          [...posts]
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((post) => <Post post={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default SocialNetwork;
