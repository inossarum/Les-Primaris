import React from "react";

const RankImgSelector = ({factionRank, factionPart}) => {
  let factionRankImgSrc = "";

  switch (factionPart) {
    case "militaire":
      factionRankImgSrc = `./assets/img/departments/military-ranks/${factionRank}.webp`;
      break;
    case "civil":
      factionRankImgSrc = `./assets/img/departments/jobs/${factionRank}.webp`;
      break;
    case "civil-militaire":
      factionRankImgSrc = `./assets/img/departments/jobs/${factionRank}.webp`;
      break;
    default:
  }

  return (
    <>
      <img src={factionRankImgSrc} alt={`logo de ${factionRank}`} />
    </>
  );
};

export default RankImgSelector;
