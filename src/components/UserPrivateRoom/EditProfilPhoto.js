import {Edit} from "@mui/icons-material";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, db, storage} from "../../utils/firebase.config";
import {getUserPhoto} from "../../feature/user.slice";
import {doc, updateDoc} from "firebase/firestore";

const EditProfilPhoto = () => {
  const dispatch = useDispatch();
  const filePicker = useRef();
  const [fileWeightTooHeavyMessage, setFileWeightTooHeavyMessage] =
    useState("");
  const userUploadedImagesList = useSelector(
    (state) => state.user.uploadedImagesList
  );

  const photoDisplayer = async (e) => {
    const imageRef = ref(
      storage,
      `images/usersProfilePhoto/${auth.currentUser.uid}/${e.target.files[0].name} `
    );

    if (
      filePicker.current.files[0].name !== undefined &&
      filePicker.current.files[0].size <= 5000000
    ) {
      try {
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(
            (url) =>
              (dispatch(getUserPhoto(url)),
              updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
                photo: `${url}`,
                photoRef: `${imageRef}`,
                uploadedImagesList: [...userUploadedImagesList, url],
              })
            )
          );
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setFileWeightTooHeavyMessage(
        "La taille maximale de l'image ne doit pas dépasser 5 Mo"
      );
      setTimeout(() => setFileWeightTooHeavyMessage(""), 5000);
    }
  };

  return (
    <>
      <div className="profil-photo-edition-container">
        <input
          type="file"
          accept=".png,.webp,.jpeg,.webp"
          hidden
          ref={filePicker}
          onChange={(e) => photoDisplayer(e)}
        />
        <Edit onClick={() => filePicker.current.click()} />
      </div>
      <span className="info-red-uppercase">{fileWeightTooHeavyMessage}</span>
    </>
  );
};

export default EditProfilPhoto;
