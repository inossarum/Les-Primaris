import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  getEventSearchShipsList,
  setIsBringingVehicle,
} from "../../../feature/events.slice";
import MilitaryEventShipSearchResultCard from "./MilitaryEventShipSearchResultCard";

const MilitaryEventShipSelector = () => {
  const RSIShipsList = useSelector((state) => state.rsi.ships);
  const eventEventSearchShipsListResult = useSelector(
    (state) => state.events.eventShipsListSearchResult
  );
  const searchKeyWord = useRef();
  const dispatch = useDispatch();

  const shipDisplayer = async (e) => {
    e.preventDefault();
    let searchResultArray = [];

    if (searchKeyWord.current.value.toLowerCase() === "") {
      dispatch(getEventSearchShipsList(""));
    } else {
      RSIShipsList &&
        [...RSIShipsList].find((ship) => {
          if (
            ship.name
              .toLowerCase()
              .includes(searchKeyWord.current.value.toLowerCase()) === true ||
            ship.name.includes(searchKeyWord.current.value) === true ||
            ship.manufacturer.name
              .toLowerCase()
              .includes(searchKeyWord.current.value) === true
          ) {
            searchResultArray = [...searchResultArray, ship];
            dispatch(getEventSearchShipsList(searchResultArray));
          }
        });
    }
  };

  return (
    <div className=" civilian-event-ship-selector-body">
      <div className="ship-search-form">
        <label>Importer un vaisseau</label>
        <div className="ship-search-bar">
          <input
            type="text"
            ref={searchKeyWord}
            placeholder="300i, aegis, etc..."
          />
          <button onClick={(e) => shipDisplayer(e)}>Rechercher</button>
          <button
            className="ship-search-cancel-button"
            onClick={(e) =>
              dispatch(getEventSearchShipsList("")) &
              dispatch(setIsBringingVehicle(false))
            }
          >
            Annuler
          </button>
        </div>

        {eventEventSearchShipsListResult &&
        eventEventSearchShipsListResult[0] ? (
          <div className="ship-list-form">
            <div className="ship-list-container">
              {[...eventEventSearchShipsListResult].map((ship) => (
                <MilitaryEventShipSearchResultCard ship={ship} key={ship.id} />
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
    </div>
  );
};

export default MilitaryEventShipSelector;
