import React from "react";
import Avatar from "./Avatar";
import {useSelector} from "react-redux";

const PostHeader = ({author}) => {
  const user = useSelector((state) =>
    state.user.users.find((user) => user.pseudo === author)
  );

  return (
    <div className="user-infos-container">
      <Avatar src={user?.photo} />
      <h3 className="author-identity">{author}</h3>
      {
        <div className="role-container">
          <span className={`role-circle ${user?.webSiteRole}`}></span>
          <h5 className="user-role">{user?.webSiteRole}</h5>
        </div>
      }
      <div className="role-container">
        <span className={`role-circle ${user?.factionPart}`}></span>
        <h5 className="user-role">{user?.factionPart}</h5>
      </div>
      <div className="role-container">
        {user?.factionPart === "militaire" ||
        user?.factionPart === "civil-militaire" ? (
          <div className="role-logo">
            <img
              src={
                "./assets/img/departments/military-ranks/" +
                user?.factionRank +
                ".webp"
              }
              alt={
                "./assets/img/departments/military-ranks/" +
                user?.factionRank +
                ".webp"
              }
            />
          </div>
        ) : (
          <span className={`role-circle ${user?.factionRank}`}></span>
        )}
        <h5 className="user-role">{user?.factionRank}</h5>
      </div>
    </div>
  );
};

export default PostHeader;
