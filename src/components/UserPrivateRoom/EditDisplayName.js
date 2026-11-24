import {updateProfile} from "firebase/auth";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, db} from "../../utils/firebase.config";
import {doc, updateDoc} from "firebase/firestore";
import {getUser} from "../../feature/user.slice";
import {Edit} from "@mui/icons-material";

const EditDisplayName = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const dispatch = useDispatch();
  const editedDisplayName = useRef();

  const editAuthDisplayName = async (e) => {
    e.preventDefault();
    const nextDisplayName = editedDisplayName.current?.value?.trim();
    if (!nextDisplayName) {
      setErrorMessage(" Vous devez entrer un pseudo valide !");
      return;
    }
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, {displayName: nextDisplayName});
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        pseudo: nextDisplayName,
      });
      dispatch(getUser(nextDisplayName));
      setErrorMessage("");
      setIsEditingDisplayName(false);
    } catch (error) {
      setErrorMessage("La mise à jour du pseudo a échoué.");
      console.error("Unable to update display name:", error);
    }
  };

  return (
    <div>
      {isEditingDisplayName ? (
        <>
          <div className="info">
            <textarea defaultValue={user} ref={editedDisplayName}></textarea>
            <div className="button-container">
              <Edit
                onClick={() => setIsEditingDisplayName(!isEditingDisplayName)}
              />
              <span className="label">Editer le pseudo</span>
            </div>
            <button onClick={(e) => editAuthDisplayName(e)} type="submit">
              Valider
            </button>
            <span>{errorMessage}</span>
          </div>
        </>
      ) : (
        <div className="info">
          <h3 className="pseudo">{user ? user : ""}</h3>
          <div
            className="button-container"
            onClick={() => setIsEditingDisplayName(!isEditingDisplayName)}
          >
            <Edit className="edit-logo" />
            <span className="label">Editer le pseudo</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDisplayName;
