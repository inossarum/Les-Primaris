import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {windowToggleActive} from "../../feature/window.slice";

const AccountBtn = ({factionPart}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.user.notifications);
  const [active, setActive] = useState(false);
  let btnClasseName = "";

  switch (factionPart) {
    case "civilian":
      btnClasseName = "civilian-btn";
      break;
    case "military":
      btnClasseName = "military-btn";
      break;
    case "battlefield":
      btnClasseName = "bf2042-btn";
      break;
    case "primarisIngameShop":
      btnClasseName = "primaris-ingame-shop-btn";
      break;
    case "administration":
      btnClasseName = "administration-btn";
      break;
    case "diabloIV":
      btnClasseName = "diabloIV-btn";
      break;
    default:
  }

  const sideBarActive = useSelector(
    (state) => state.windowActive.windowActive.payload
  );

  if (active === true && sideBarActive === false) {
    setActive(false);
  }

  const windowSetActiveState = () => {
    return dispatch(windowToggleActive(!active));
  };

  return (
    <div
      className={btnClasseName}
      onClick={() => setActive(!active) & windowSetActiveState()}
    >
      <div className="notification-counter">
        {notifications === undefined || notifications?.length === 0 ? (
          ""
        ) : (
          <span>{notifications?.length}</span>
        )}
      </div>
      {user.currentUser ? "Compte" : "Connexion"}
      <span
        className={
          user.currentUser ? "user-active-green-dot" : "user-inactive-red-dot"
        }
      ></span>
    </div>
  );
};

export default AccountBtn;
