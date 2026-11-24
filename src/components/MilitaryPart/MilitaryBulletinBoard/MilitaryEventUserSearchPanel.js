import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEventUserSearchingActive} from "../../../feature/events.slice";
import MilitaryEventCrewMemberSearchResultCard from "./MilitaryEventCrewMemberSearchResultCard";

const MilitaryEventUserSearchPanel = ({vehicle}) => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const actualEventShipSelected = useSelector(
    (state) => state.events.actualEventShipSelected
  );

  if (vehicle.vehicleId === actualEventShipSelected.vehicleId) {
    return (
      <div className="military-event-user-search-panel-body">
        <div className="military-event-user-search-panel-drop-filter">
          <h3 className="user-search-panel-drop-filter-title">
            Selectionner un personnel
          </h3>
          <div className="military-event-user-search-panel-drop-filter-sub-container margin-b-10">
            <span className="label">Vaisseau selectionné:</span>
            <span className="margin-l-10 info-yellow">{vehicle.name}</span>
          </div>

          <div className="military-event-user-search-panel-user-list-container">
            <div className="military-event-user-search-panel-user-container">
              {users &&
                [...users]
                  .filter(
                    (user) =>
                      user.factionPart === "civil-militaire" ||
                      user.factionPart === "militaire"
                  )
                  .sort((a, b) => a.pseudo.localeCompare(b.pseudo))
                  .map((user) => (
                    <>
                      <MilitaryEventCrewMemberSearchResultCard
                        user={user}
                        actualShipSelected={actualEventShipSelected}
                      />
                    </>
                  ))}
            </div>
          </div>

          <button
            className="military-event-user-search-panel-user-container-cancel-button"
            type="submit"
            onClick={() => dispatch(setEventUserSearchingActive(false))}
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }
};

export default MilitaryEventUserSearchPanel;
