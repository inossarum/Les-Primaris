import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  getEventSearchShipsList,
  setIsBringingVehicle,
} from "../../../feature/events.slice";
import CivilianEventShipSearchResultCard from "./CivilianEventShipSearchResultCard";

const CivilianEventShipSelector = () => {
  const RSIShipsList = useSelector((state) => state.rsi.ships);
  const eventEventSearchShipsListResult = useSelector(
    (state) => state.events.eventShipsListSearchResult
  );
  const searchKeyWord = useRef();
  const dispatch = useDispatch();

  const shipDisplayer = (e) => {
    e.preventDefault();
    const query = searchKeyWord.current.value.trim().toLowerCase();
    if (!query) {
      dispatch(getEventSearchShipsList(""));
      return;
    }
    const results = (RSIShipsList || []).filter((ship) =>
      String(ship.name || "").toLowerCase().includes(query) ||
      String(ship.manufacturer?.name || "").toLowerCase().includes(query)
    );
    dispatch(getEventSearchShipsList(results));
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
              { dispatch(getEventSearchShipsList("")); dispatch(setIsBringingVehicle(false)); }
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
                <CivilianEventShipSearchResultCard ship={ship} key={ship.id} />
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

export default CivilianEventShipSelector;
