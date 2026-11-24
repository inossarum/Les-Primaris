import React, {useState} from "react";
import {auth} from "../../utils/firebase.config";
import {sendPasswordResetEmail} from "firebase/auth";
import {Mail} from "@mui/icons-material";
import {useSelector} from "react-redux";

const ResetPassword = () => {
  const userEmail = useSelector((state) => state.user.userEmail);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(
        (res) =>
          console.log(res) &
          setSuccessMessage(`mail envoyé à l'adresse ${userEmail}`) &
          setTimeout(() => setSuccessMessage(""), 3000)
      )
      .catch(
        (err) =>
          console.log(err) &
          setErrorMessage("Une erreur s'est produite") &
          setTimeout(() => setErrorMessage(""), 3000)
      );
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
