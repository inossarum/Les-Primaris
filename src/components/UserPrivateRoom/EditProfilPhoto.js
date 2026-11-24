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
    const file = e.target.files?.[0];
    const userId = auth.currentUser?.uid;
    if (!file) return;
    if (!userId) {
      setFileWeightTooHeavyMessage("Connectez-vous avant de modifier cette image.");
      return;
    }
    if (!file.type.startsWith("image/") || file.size > 5000000) {
      setFileWeightTooHeavyMessage("Choisissez une image de 5 Mo maximum.");
      setTimeout(() => setFileWeightTooHeavyMessage(""), 5000);
      e.target.value = "";
      return;
    }

    const storagePath = `images/usersProfilePhoto/${userId}/${Date.now()}-${file.name}`;
    try {
      const imageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(db, "users", userId), {
        photo: url,
        photoRef: storagePath,
        uploadedImagesList: [
          ...(Array.isArray(userUploadedImagesList) ? userUploadedImagesList : []),
          url,
        ],
      });
      dispatch(getUserPhoto(url));
      setFileWeightTooHeavyMessage("");
    } catch (error) {
      console.error("Échec du téléversement de l’image :", error);
      setFileWeightTooHeavyMessage("L’image n’a pas pu être enregistrée. Réessayez.");
      setTimeout(() => setFileWeightTooHeavyMessage(""), 5000);
    } finally {
      e.target.value = "";
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
        <Edit onClick={() => filePicker.current?.click()} />
      </div>
      <span className="info-red-uppercase">{fileWeightTooHeavyMessage}</span>
    </>
  );
};

export default EditProfilPhoto;
