import React, {useState} from "react";
import {useSelector} from "react-redux";
import OnlineUserCard from "./OnlineUserCard";

const OnlineUsersMenu = () => {
  const onlineUsersData = useSelector((state) => state.onlineUsers.onlineUsers);
  const [navbarState, setNavbarState] = useState(true);

  return (
    <div
      className={
        navbarState
          ? `online-users-menu-navbar online-user-navbar-retracted`
          : `online-users-menu-navbar online-user-navbar-deployed`
      }
    >
      <div className="online-users-menu-wrapper">
        <div className="online-users-cards-container">
          {onlineUsersData &&
            [...onlineUsersData]
              .sort((a, b) => a.pseudo.localeCompare(b.pseudo))
              .map((onlineUser) => (
                <OnlineUserCard key={onlineUser.id} onlineUser={onlineUser} />
              ))}
        </div>
      </div>
      <div
        className="navbar-menu-trigger"
        onClick={() => setNavbarState(!navbarState)}
      >
        <span
          className={navbarState ? "first-bar " : "first-bar rotated-left"}
        ></span>
        <span
          className={navbarState ? "second-bar visible" : "second-bar hidded"}
        ></span>
        <span
          className={navbarState ? "third-bar " : "third-bar rotated-right"}
        ></span>
      </div>
    </div>
  );
};

export default OnlineUsersMenu;
