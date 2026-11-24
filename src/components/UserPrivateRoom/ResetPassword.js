import React, {useState} from "react";
import {auth} from "../../utils/firebase.config";
import {sendPasswordResetEmail} from "firebase/auth";
import {Mail} from "@mui/icons-material";
import {useSelector} from "react-redux";

const ResetPassword = () => {
  const userEmail = useSelector((state) => state.user.userEmail);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetPassword = async () => {
    if (!userEmail) {
      setErrorMessage("Aucune adresse e-mail n’est associée à ce compte.");
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");
    try {
      await sendPasswordResetEmail(auth, userEmail);
      setSuccessMessage(`Mail envoyé à l'adresse ${userEmail}`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Échec de l’envoi du lien de réinitialisation :", error);
      setErrorMessage("Une erreur s'est produite. Vérifiez l'adresse e-mail.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div>
      <div className="info">
        <h3 className="email">------------------------</h3>
        <div className="button-container" onClick={() => resetPassword()}>
          <Mail className="edit-logo" />
          <span className="label">Réinitialiser le mot de passe</span>
          <div className="message-displayer-container">
            <span className="success-message-displayer">{successMessage}</span>
            <span className="error-message-displayer">{errorMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
