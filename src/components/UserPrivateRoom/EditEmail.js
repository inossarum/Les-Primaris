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
    if (editedEmail.current.value === "" || null || undefined) {
      setErrorMessage(" Vous devez entrer une adresse mail valide !");
    } else {
      try {
        await updateEmail(auth.currentUser, editedEmail.current.value);
        await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
          email: `${editedEmail.current.value}`,
        });
        await updateDoc(doc(db, "onlineUsers", `${auth.currentUser.uid}`), {
          email: `${editedEmail.current.value}`,
        });
        dispatch(getUserEmail(editedEmail.current.value));
        setIsEditingEmail(false);
      } catch (err) {
        console.log(err);
      }
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
