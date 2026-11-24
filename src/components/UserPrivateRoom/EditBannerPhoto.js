import {Edit} from "@mui/icons-material";
import {doc, updateDoc} from "firebase/firestore";
import React, {useRef, useState} from "react";
import {auth, db, storage} from "../../utils/firebase.config";
import {getUserBanner} from "../../feature/user.slice";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";

const EditBannerPhoto = () => {
  const [fileWeightTooHeavyMessage, setFileWeightTooHeavyMessage] =
    useState("");
  const dispatch = useDispatch();
  const filePicker = useRef();
  const userUploadedBannersList = useSelector(
    (state) => state.user.uploadedBannersList
  );

  const photoDisplayer = async (e) => {
    const imageRef = ref(
      storage,
      `images/usersBannerPhoto/${auth.currentUser.uid}/${e.target.files[0].name} `
    );

    if (
      filePicker.current.files[0].name !== undefined &&
      filePicker.current.files[0].size <= 5000000
    ) {
      try {
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(
            (url) =>
              (dispatch(getUserBanner(url)),
              updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
                banner: `${url}`,
                bannerRef: `${imageRef}`,
                uploadedBannersList: [...userUploadedBannersList, url],
              })
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
    <div className="banner-edition-container">
      <>
        <input
          type="file"
          accept=".png,.webp,.jpeg,.webp"
          hidden
          ref={filePicker}
          onChange={(e) => photoDisplayer(e)}
        />
        <Edit onClick={() => filePicker.current.click()} />
      </>
    </div>
  );
};

export default EditBannerPhoto;
