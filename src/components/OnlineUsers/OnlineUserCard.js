import {Avatar} from "@mui/material";
import React from "react";

const OnlineUserCard = ({onlineUser}) => {
  return (
    <div className="online-user-card">
      <Avatar src={onlineUser.photo} />
      <h3 className="user-pseudo">{onlineUser.pseudo}</h3>
      <span className={`web-site-role-circle ${onlineUser.webSiteRole}`}></span>
    </div>
  );
};

export default OnlineUserCard;
