import React from "react";

import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../../utils/firebase.config";

const DeleteUser = ({uid}) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    if (!uid) return;
    if (
      !window.confirm(
        "Supprimer la fiche utilisateur ? Le compte de connexion ne sera pas supprimé."
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "users", uid));
    } catch (error) {
      console.error("Unable to delete user profile:", error);
      window.alert("La fiche utilisateur n'a pas pu être supprimée.");
    }
  };

  return (
    <button
      className="edit-btn"
      type="button"
      onClick={handleDelete}
      disabled={!uid}
    >
      Supprimer la fiche utilisateur
    </button>
  );
};

export default DeleteUser;
