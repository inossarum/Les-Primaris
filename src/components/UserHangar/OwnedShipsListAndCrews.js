import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import ShipsListCard from "./ShipsListCard";

import OwnedShipCard from "./OwnedShipCard";
import {setPrivateRoomShipsListSearchResult} from "../../feature/userPrivateRoom.slice";

const OwnedShipsListAndCrews = () => {
  const RSIShips = useSelector((state) => state.userPrivateRoom.ships);
  const privateRoomShipsListSearchResult = useSelector(
    (state) => state.userPrivateRoom.privateRoomShipsListSearchResult
  );
  const ownedShipsListAndCrews = useSelector(
    (state) => state.userPrivateRoom.ownedShipsList
  );

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const shipSearchKeyWord = useRef("");

  const shipDisplayer = async (e) => {
    e.preventDefault();
    let searchResultArray = [];

    if (shipSearchKeyWord.current.value.toLowerCase() === "") {
      dispatch(setPrivateRoomShipsListSearchResult(""));
    } else {
      RSIShips &&
        [...RSIShips].find((ship) => {
          if (
            ship.name
              .toLowerCase()
              .includes(shipSearchKeyWord.current.value.toLowerCase()) ===
              true ||
            ship.name.includes(shipSearchKeyWord.current.value) === true ||
            ship.manufacturer.name
              .toLowerCase()
              .includes(shipSearchKeyWord.current.value) === true
          ) {
            searchResultArray = [...searchResultArray, ship];
            dispatch(setPrivateRoomShipsListSearchResult(searchResultArray));
          }
        });
    }
  };

  return (
    <div className="img-library-container">
      <div className="ship-search-form">
        <label>Importer un vaisseau</label>
        <div className="ship-search-bar">
          <input
            type="text"
            ref={shipSearchKeyWord}
            placeholder="300i, aegis, etc..."
          />
          <button onClick={(e) => shipDisplayer(e)}>Rechercher</button>
          <button
            className="ship-search-cancel-button"
            onClick={(e) => dispatch(setPrivateRoomShipsListSearchResult(""))}
          >
            Annuler
          </button>
        </div>

        {privateRoomShipsListSearchResult &&
        privateRoomShipsListSearchResult[0] ? (
          <div className="ship-list-form">
            <div className="ship-list-container">
              {[...privateRoomShipsListSearchResult].map((ship) => (
                <ShipsListCard ship={ship} key={ship.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="ship-list-form-empty">
            <div className="ship-list-container">
              <h3>Pas de recherche en cours</h3>
            </div>
          </div>
        )}
      </div>
      <div className="owned-ships-list-container">
        <h3 className="gallery-title">
          Vaisseaux stockés & personnels enrolés
        </h3>
        {ownedShipsListAndCrews && ownedShipsListAndCrews[0] ? (
          [...ownedShipsListAndCrews]
            .filter((ownedShip) => ownedShip.ownerId === user.userId)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((ownedShip) => (
              <OwnedShipCard
                key={Math.random()}
                ownedShip={ownedShip}
                pageActive={"userPrivateRoom"}
              />
            ))
        ) : (
          <h3>Pas de vaisseau stocké</h3>
        )}
      </div>
    </div>
  );
};

export default OwnedShipsListAndCrews;
