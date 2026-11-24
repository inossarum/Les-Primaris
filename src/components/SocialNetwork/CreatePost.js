import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {auth, db, storage} from "../../utils/firebase.config";
import {CameraAlt} from "@mui/icons-material";
import PostHeader from "./PostHeader";

import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {getPostSelectedPhotoPreview} from "../../feature/post.slice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const filePicker = useRef();
  const message = useRef();
  const user = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const userWebSiteRole = useSelector((state) => state.user.webSiteRole);
  const userFactionRank = useSelector((state) => state.user.factionRank);
  const userFactionPart = useSelector((state) => state.user.factionPart);
  const userPhoto = useSelector((state) => state.user.photo);
  const userId = useSelector((state) => state.user.userId);
  const [imageDataRef, setImageDataRef] = useState("");
  const [error, setError] = useState("");
  const [imageToDownload, setImageToDownload] = useState("");

  const photoDisplayer = async (e) => {
    const imageRef = ref(
      storage,
      `images/usersPosts/${auth.currentUser.uid}/${e.target.files[0].name} `
    );

    if (e.target.files[0].name !== "" || e.target.files[0].name !== undefined) {
      uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) =>
          setImageToDownload((prev) => [...prev, url])
        );
      });

      setImageDataRef(
        `images/usersPosts/${auth.currentUser.uid}/${e.target.files[0].name} `
      );
    } else {
      setImageDataRef("");
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const data = {
      author: user,
      authorId: userId,
      message: message.current.value,
      authorFactionRank: userFactionRank,
      authorFactionPart: userFactionPart,
      authorWebSiteRole: userWebSiteRole,
      authorPhoto: userPhoto,
      image: imageToDownload,
      imageRef: imageDataRef,
      likers: [],
      createdAt: Date.now(),
      notificationId: Date.now() + Math.random(),
    };

    if (data.message !== "" || data.image !== "") {
      await addDoc(collection(db, "posts"), data);

      const notificationDatas = {
        type: "nouveau post",
        postAuthor: user,
        postContent: data.message,
        createdAt: Date.now(),
        associatedPost: data.notificationId,
      };

      users &&
        [...users]
          .filter((user) => user.id !== data.authorId)
          .map((user) => {
            const userNotifications = user.notifications;
            updateDoc(doc(db, "users", user.id), {
              notifications: [...userNotifications, notificationDatas],
            });
          });

      message.current.value = null;
    } else {
      setError("Vous ne pouvez pas envoyer un contenu vide !");
      setTimeout(() => setError(""), 3000);
    }

    setImageToDownload("");
    dispatch(getPostSelectedPhotoPreview(""));
  };

  return (
    <div className="new-post-modal">
      <div className="new-post-header">
        <div className="new-post-author-infos-container">
          <PostHeader
            author={user}
            webSiteRole={userWebSiteRole}
            factionRank={userFactionRank}
            factionPart={userFactionPart}
            photo={userPhoto ? userPhoto : ""}
          />
        </div>
        <CameraAlt
          className="upload-image-button"
          onClick={() => filePicker.current.click()}
        />
        <input
          type="file"
          accept=".png,.webp,.jpeg,.webp"
          ref={filePicker}
          onChange={(e) => photoDisplayer(e)}
          hidden
        />
      </div>

      <form onSubmit={(e) => handlePost(e)}>
        <div className="selected-photo-container">
          {imageToDownload ? (
            <img src={imageToDownload} alt={imageToDownload} />
          ) : null}
        </div>
        <textarea
          className="create-post-textarea"
          placeholder="Message..."
          ref={message}
        ></textarea>
        <div className="input-container">
          {error ? <span className="error-displayer">{error}</span> : ""}

          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
