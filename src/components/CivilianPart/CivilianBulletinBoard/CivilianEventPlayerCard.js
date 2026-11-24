import React from "react";
import {useSelector} from "react-redux";

const CivilianEventPlayerCard = ({player}) => {
  const currentUser = useSelector((state) => state.user);
  const cardUser = useSelector((state) =>
    state.user.users.filter((user) => user.id === player.id)
  );
  const userRank = useSelector((state) =>
    state.militaryRanks.militaryRanks.filter(
      (rank) => rank.rank === cardUser[0]?.factionRank
    )
  );

  return (
    <div
      className={
        player.id === currentUser?.userId
          ? "civilian-event-player-card-body actual-user"
          : "civilian-event-player-card-body "
      }
      style={{
        background: `url(${cardUser[0]?.photo}) center/cover`,
      }}
    >
      <div className="civilian-event-player-card-main-container">
        {(cardUser[0].factionPart === "militaire" && player?.rank) ||
        (cardUser[0].factionPart === "civil-militaire" && player?.rank) ? (
          <img
            src={`../../../../assets/img/departments/military-ranks/${player?.rank}.webp`}
            alt={player?.rank}
          ></img>
        ) : (
          ""
        )}
        {userRank[0]?.shortenedRank} {player.name}
      </div>
    </div>
  );
};

export default CivilianEventPlayerCard;
