import React from "react";
import {useSelector} from "react-redux";

const ThreadHeader = () => {
  const currentUser = useSelector((state) => state.user);
  const currentUserShortenedMilitaryRanks = useSelector(
    (state) =>
      state.militaryRanks.militaryRanks.find(
        (rank) => rank.rank === currentUser.factionRank
      )?.shortenedRank
  );
  return (
    <div className="thread-header-body">
      <div className="thread-header-user-photo-wrapper">
        <img
          src={currentUser?.photo}
          alt={currentUser?.photo}
          style={{height: "50px"}}
        />
      </div>
      <div className="thread-header-user-id">
        {currentUser?.factionPart === "militaire" ||
        (currentUser?.factionPart === "civil-militaire" &&
          (currentUser?.factionRank === "primarque" ||
            currentUser?.factionRank === "reserviste"))
          ? currentUserShortenedMilitaryRanks
          : ""}{" "}
        <span>
          {currentUser?.RPName !== ""
            ? currentUser?.RPName
            : currentUser?.pseudo}
        </span>
        {currentUser?.factionPart === "militaire" ||
        (currentUser?.factionPart === "civil-militaire" &&
          (currentUser?.factionRank === "primarque" ||
            currentUser?.factionRank === "reserviste")) ? (
          <div className="thread-header-user-photo-wrapper">
            <img
              src={`./assets/img/departments/military-ranks/${currentUser?.factionRank}.webp`}
              alt={currentUser?.factionRank}
              style={{height: "50px"}}
            />
          </div>
        ) : (
          ""
        )}{" "}
      </div>
    </div>
  );
};

export default ThreadHeader;
