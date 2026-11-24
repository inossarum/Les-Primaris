import React from "react";

import {useDispatch} from "react-redux";
import {deleteDoc, doc} from "firebase/firestore";
import {deleteUser} from "firebase/auth";
import {db} from "../../../utils/firebase.config";

const DeleteUser = ({uid}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteUser(uid);
    deleteDoc(doc(db, "users", uid));
    dispatch(deleteUser(uid));
  };

  return (
    <div className="edit-btn" onClick={(e) => handleDelete(e)}>
      supprimer l'utilisateur
    </div>
  );
};

export default DeleteUser;
