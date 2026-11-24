import React, {useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import {useDispatch, useSelector} from "react-redux";
import {windowToggleActive} from "../../feature/window.slice";
import AccountStatment from "./AccountStatment";

const ConnectModal = ({factionPart, pageActive}) => {
  const [activeBtn, setActiveBtn] = useState("login");
  const windowIsActive = useSelector((state) => state.windowActive);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const windowSetNotActiveState = async () => {
    return dispatch(windowToggleActive(false));
  };

  return (
    <>
      {user ? (
        <div
          className={
            windowIsActive.windowActive.payload === true
              ? "connect-modal-container deployed"
              : "connect-modal-container retracted"
          }
        >
          <button
            className="go-back-btn"
            onClick={() => windowSetNotActiveState()}
          >
            <i className="fa-sharp fa-solid fa-chevron-left"></i>
            <span>BACK</span>
          </button>
          <div className="enlist-root">
            <AccountStatment
              user={user}
              factionPart={factionPart}
              pageActive={pageActive}
            />
          </div>
        </div>
      ) : (
        <div
          className={
            windowIsActive.windowActive.payload === true
              ? "connect-modal-container deployed"
              : "connect-modal-container retracted"
          }
        >
          <button
            className="go-back-btn"
            onClick={() => windowSetNotActiveState()}
          >
            <i className="fa-sharp fa-solid fa-chevron-left"></i>
            <span>BACK</span>
          </button>
          <div className="enlist-root">
            {activeBtn === "login" ? (
              <h2>Se connecter à l'EMGP</h2>
            ) : (
              <h2>S'inscrire chez les Primaris</h2>
            )}

            {activeBtn === "login" ? <Login /> : ""}
            {activeBtn === "signUp" ? <SignUp /> : ""}
            {activeBtn === "login" ? (
              <h4
                className="sign-in"
                onClick={() => {
                  setActiveBtn("signUp");
                }}
              >
                S'inscrire
              </h4>
            ) : (
              <h4
                className="login"
                onClick={() => {
                  setActiveBtn("login");
                }}
              >
                Se connecter
              </h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectModal;
