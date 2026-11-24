import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth, db} from "../../utils/firebase.config";
import {doc, updateDoc} from "firebase/firestore";
import {Edit} from "@mui/icons-material";

const EditRPName = () => {
  const user = useSelector((state) => state.user.RPName);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditingRPName, setIsEditingRPName] = useState("");
  const dispatch = useDispatch();
  const editedRPName = useRef();

  const editAuthRPName = async (e) => {
    e.preventDefault();
    if (editedRPName.current.value === "" || null || undefined) {
      setErrorMessage(" Vous devez entrer un nom valide !");
    } else {
      try {
        await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
          RPName: `${editedRPName.current.value}`,
        });
        setIsEditingRPName(false);
      } catch (err) {
        console.log(err);
      }
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
