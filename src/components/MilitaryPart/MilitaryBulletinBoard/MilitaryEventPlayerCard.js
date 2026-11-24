import React from "react";
import {useSelector} from "react-redux";

const MilitaryEventPlayerCard = ({player}) => {
  const currentUser = useSelector((state) => state.user);
  const cardUser = useSelector((state) =>
    state.user.users.find((user) => user.id === player.id)
  );
  const userRank = useSelector((state) =>
    state.militaryRanks.militaryRanks.find(
      (rank) => rank.rank === cardUser.factionRank
    )
  );

  console.log();

  return (
    <div
      className={
        player.id === currentUser?.userId
          ? "military-event-player-card-body actual-user"
          : "military-event-player-card-body "
      }
      style={{
        background: `url(${cardUser?.photo}) center/cover`,
      }}
    >
      <div className="military-event-player-card-main-container">
        {cardUser?.factionPart === "militaire" ||
        cardUser?.factionPart === "civil-militaire" ? (
          <img
            src={`../../../../assets/img/departments/military-ranks/${player?.rank}.webp`}
            alt={player?.rank}
          ></img>
        ) : (
          ""
        )}
        {userRank?.shortenedRank} {player.name}
      </div>
    </div>
  );
};

export default MilitaryEventPlayerCard;
