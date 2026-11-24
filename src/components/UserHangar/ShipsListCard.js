import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ShipListCardValidator from "./ShipListCardValidator";
import {setSelectedShip} from "../../feature/userPrivateRoom.slice";

const ShipsListCard = ({ship}) => {
  const dispatch = useDispatch();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const selectedShip = useSelector(
    (state) => state.userPrivateRoom.selectedShip
  );
  const selectedShipCardInfos = useSelector(
    (state) => state.userPrivateRoom.selectedShipCardInfos
  );

  return (
    <>
      <div
        className="ship-list-card-body"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={() => {
          dispatch(setSelectedShip([true, ship]));
        }}
      >
        <span
          className="ship-list-card-image"
          style={{
            background: `url(${ship?.storeImageLarge}) center/cover no-repeat`,
          }}
        >
          <h3 className="ship-list-card-name">
            {ship?.name.split("-").join(" ")}
          </h3>
          {mouseIsOver === true ? (
            <div className="selector">Sélectionner ce vaisseau</div>
          ) : (
            ""
          )}
        </span>
      </div>

      {selectedShip === true && ship.id === selectedShipCardInfos.id ? (
        <ShipListCardValidator />
      ) : (
        ""
      )}
    </>
  );
};

export default ShipsListCard;
