import React from "react";
import {useSelector} from "react-redux";
import MilitaryPromotionCard from "./MilitaryPromotionCard";

const MilitaryPromotionsBoard = () => {
  const militaryPromotions = useSelector(
    (state) => state.promotions.militaryGeneralPromotions
  );

  return (
    <div
      id="promotions"
      className="military-bulletin-board-promotion-displayer-body"
    >
      <div className="military-bulletin-board-promotion-displayer-main-container-header">
        <h2 className="military-bulletin-board-promotion-displayer-main-container-title">
          Promotions
        </h2>
      </div>
      <div className="military-bulletin-board-promotion-displayer-main-container">
        {militaryPromotions && militaryPromotions[0] ? (
          <>
            {militaryPromotions &&
              [...militaryPromotions]
                .sort((a, b) => b.promotedAt - a.promotedAt)
                .map((promotion) => (
                  <MilitaryPromotionCard
                    promotion={promotion}
                    key={promotion.id}
                  />
                ))}
          </>
        ) : (
          <>
            <span className="info-red-uppercase">Aucune promotion</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MilitaryPromotionsBoard;
