import {AccountCircle} from "@mui/icons-material";
import React from "react";

const Avatar = ({src}) => {
  return (
    <>
      {src ? (
        <div className="profil-img-container">
          <img src={src} alt="photo de profil" />
        </div>
      ) : (
        <AccountCircle />
      )}
    </>
  );
};

export default Avatar;
