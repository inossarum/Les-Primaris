import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, db} from "../../utils/firebase.config";
import {doc, updateDoc} from "firebase/firestore";
import {Edit} from "@mui/icons-material";
import {getUserRPName} from "../../feature/user.slice";

const EditRPName = () => {
  const user = useSelector((state) => state.user.RPName);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditingRPName, setIsEditingRPName] = useState("");
  const dispatch = useDispatch();
  const editedRPName = useRef();

  const editAuthRPName = async (e) => {
    e.preventDefault();
    const nextRPName = editedRPName.current?.value?.trim();
    if (!nextRPName) {
      setErrorMessage(" Vous devez entrer un nom valide !");
      return;
    }
    if (!auth.currentUser) return;

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        RPName: nextRPName,
      });
      dispatch(getUserRPName(nextRPName));
      setErrorMessage("");
      setIsEditingRPName(false);
    } catch (error) {
      setErrorMessage("La mise à jour du nom RP a échoué.");
      console.error("Unable to update roleplay name:", error);
    }
  };

  return (
    <div>
      {isEditingRPName ? (
        <>
          <div className="info">
            <textarea defaultValue={user} ref={editedRPName}></textarea>
            <div className="button-container">
              <Edit onClick={() => setIsEditingRPName(!isEditingRPName)} />
              <span className="label">Editer le nom RP</span>
            </div>
            <button onClick={(e) => editAuthRPName(e)} type="submit">
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
            onClick={() => setIsEditingRPName(!isEditingRPName)}
          >
            <Edit className="edit-logo" />
            <span className="label">Editer le nom RP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRPName;
