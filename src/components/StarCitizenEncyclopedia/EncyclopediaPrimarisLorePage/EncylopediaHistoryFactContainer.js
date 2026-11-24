import React, {useState} from "react";

const EncylopediaHistoryFactContainer = ({title, date, description, img}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      className="encyclopedia-lore-event-container"
      onClick={() => setIsOpened(!isOpened)}
    >
      <span className="encyclopedia-lore-date ">{date}</span>
      {isOpened === false ? (
        <span
          className={
            date !== "2953"
              ? "encyclopedia-lore-point-after inactive"
              : "encyclopedia-lore-point inactive"
          }
        ></span>
      ) : (
        <span
          className={
            date !== "2953"
              ? "encyclopedia-lore-point-after active"
              : "encyclopedia-lore-point active"
          }
        ></span>
      )}
      <span className="encyclopedia-lore-description-title ">{title}</span>
      {isOpened === false ? (
        <div className="encyclopedia-lore-description-container container-reduced">
          <img src={img} alt={img}></img>
        </div>
      ) : (
        <div className="encyclopedia-lore-description-container  container-deployed">
          <p className="encyclopedia-lore-description ">{description}</p>
        </div>
      )}
    </div>
  );
};

export default EncylopediaHistoryFactContainer;
