import React, {useState} from "react";
import {useRef} from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {auth, db} from "../../utils/firebase.config";
import {useDispatch} from "react-redux";
import {windowToggleActive} from "../../feature/window.slice";
import {
  getUser,
  getUserDepartment,
  getUserFactionPart,
  getUserFactionRank,
  getUserId,
  getUserPhoto,
  getUserRPName,
  getUserWebSiteRole,
} from "../../feature/user.slice";

import {doc, setDoc} from "firebase/firestore";

const SignUp = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const windowSetNotActiveState = () => {
    return dispatch(windowToggleActive(false));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail.current.value.trim(),
        registerPassword.current.value
      );
      const user = userCredential.user;

      await updateProfile(user, {displayName: displayName.trim()});

      const userData = {
        pseudo: displayName.trim(),
        RPName: "",
        email: user.email,
        photo: "",
        factionPart: "none",
        factionRank: "invité",
        webSiteRole: "invité",
        department: "none",
        notifications: [],
        id: user.uid,
        trainings: 0,
        rankOrder: null,
        missions: 0,
        postulant: "non",
        employed: "non",
        assignment: "none",
        assignmentUnit: "none",
        job: "none",
        promotedAt: "",
        officerRecommandation: [],
        civilianDiplomasEarned: [],
        militaryDiplomasEarned: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);
      await sendEmailVerification(user).catch((verificationError) => {
        console.error("Unable to send verification email:", verificationError);
      });

      dispatch(getUser(userData.pseudo));
      dispatch(getUserId(user.uid));
      dispatch(getUserFactionPart(userData.factionPart));
      dispatch(getUserFactionRank(userData.factionRank));
      dispatch(getUserWebSiteRole(userData.webSiteRole));
      dispatch(getUserDepartment(userData.department));
      dispatch(getUserPhoto(userData.photo));
      dispatch(getUserRPName(userData.RPName));
      windowSetNotActiveState();
    } catch (registrationError) {
      console.error("Unable to register user:", registrationError);
      setError("La création du compte a échoué. Vérifiez vos informations puis réessayez.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={(e) => handleRegister(e)}>
        <div className="mail">
          <label>Email</label>
          <div className="input-wrapper">
            <input
              type="text"
              onChange={(e) => e.target.value}
              required
              ref={registerEmail}
            />
          </div>
        </div>
        <div className="pseudo">
          <label>Pseudo</label>
          <div className="input-wrapper">
            <input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="password">
          <label>Mot de passe</label>
          <div className="password-input">
            <input
              type="password"
              required
              ref={registerPassword}
            />
          </div>
        </div>
        {error && <p role="alert">{error}</p>}
        <div className="submit-btn">
          <button type="submit" className="submit-form">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
