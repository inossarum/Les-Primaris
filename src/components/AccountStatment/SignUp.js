import React, {useEffect, useState} from "react";
import {useRef} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
  getUsers,
} from "../../feature/user.slice";

import {doc, setDoc} from "firebase/firestore";

const SignUp = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  const windowSetNotActiveState = () => {
    return dispatch(windowToggleActive(false));
  };

  // Na pas changer, la fonction est opérante.
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      createUserWithEmailAndPassword(
        auth,
        registerEmail.current.value,
        registerPassword.current.value
      )
        .then(async (userCredential) => {
          sendEmailVerification(auth.currentUser);
          updateProfile(userCredential.user, {
            displayName: `${displayName}`,
          });
          dispatch(getUser(displayName));
          windowSetNotActiveState();
          const createUserDB = async () => {
            const userData = {
              pseudo: displayName,
              RPName: "",
              email: userCredential.user.email,
              photo: "",
              factionPart: "none",
              factionRank: "invité",
              webSiteRole: "invité",
              department: "none",
              notifications: [],
              id: auth.currentUser.uid,
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
            if (userData !== "") {
              await setDoc(
                doc(db, "users", `${userCredential.user.uid}`),
                userData
              );

              dispatch(getUsers());
              dispatch(getUserRPName(userData?.RPName));
              dispatch(getUserId(userData.id));
              dispatch(getUserFactionPart(userData.factionPart));
              dispatch(getUserFactionRank(userData.factionRank));
              dispatch(getUserWebSiteRole(userData.webSiteRole));
              dispatch(getUserDepartment(userData.department));
              dispatch(getUserPhoto(userData.photo));
            }
          };
          await createUserDB();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(getUser(currentUser ? currentUser.displayName : null));
    });
  }, [dispatch]);

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
              type="text"
              onChange={(e) => e.target.value}
              required
              ref={registerPassword}
            />
          </div>
        </div>
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
