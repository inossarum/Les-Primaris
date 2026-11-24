import React, {useEffect} from "react";
import Banner from "../components/UserPrivateRoom/Banner";
import UserInformations from "../components/UserPrivateRoom/UserInformations";
import ImgLibrary from "../components/UserPrivateRoom/ImgLibrary";
import {useDispatch} from "react-redux";
import {windowToggleActive} from "../feature/window.slice";
import NavBar from "../components/Navbar/NavBar";

const UserPrivateRoom = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(windowToggleActive(false));
  }, [dispatch]);

  return (
    <div className="user-private-room-body">
      <NavBar factionPart="civilian" pageActive={"userPrivateRoom"} />
      <div className="user-private-room-main-container">
        <Banner />
        <UserInformations />
        <ImgLibrary />
      </div>
    </div>
  );
};

export default UserPrivateRoom;
