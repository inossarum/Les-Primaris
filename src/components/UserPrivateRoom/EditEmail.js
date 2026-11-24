import {updateEmail} from "firebase/auth";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, db} from "../../utils/firebase.config";
import {doc, updateDoc} from "firebase/firestore";
import {getUserEmail} from "../../feature/user.slice";
import {Edit} from "@mui/icons-material";

const EditEmail = () => {
  const email = useSelector((state) => state.user.userEmail);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState("");
  const dispatch = useDispatch();
  const editedEmail = useRef();

  const editAuthEmail = async (e) => {
    e.preventDefault();
    const nextEmail = editedEmail.current?.value?.trim();
    if (!nextEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setErrorMessage(" Vous devez entrer une adresse mail valide !");
      return;
    }

    if (!auth.currentUser) return;

    try {
      await updateEmail(auth.currentUser, nextEmail);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        email: nextEmail,
      });
      await updateDoc(doc(db, "onlineUsers", auth.currentUser.uid), {
        email: nextEmail,
      });
      dispatch(getUserEmail(nextEmail));
      setErrorMessage("");
      setIsEditingEmail(false);
    } catch (error) {
      setErrorMessage("La mise à jour de l’adresse e-mail a échoué.");
      console.error("Unable to update email:", error);
    }
  };

  return (
    <>
      {isEditingEmail ? (
        <>
          <div className="info">
            <div className="button-container">
              <Edit onClick={() => setIsEditingEmail(!isEditingEmail)} />
              <span className="label">Editer l'email'</span>
            </div>
            <textarea defaultValue={email} ref={editedEmail}></textarea>
            <button onClick={(e) => editAuthEmail(e)} type="submit">
              Valider
            </button>
            <span>{errorMessage}</span>
          </div>
        </>
      ) : (
        <div className="info">
          <h3 className="email">{email ? email : ""}</h3>
          <div
            className="button-container"
            onClick={() => setIsEditingEmail(!isEditingEmail)}
          >
            <Edit className="edit-logo" />
            <span className="label">Editer l'email</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEmail;
