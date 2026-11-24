import React from "react";
import {useDispatch, useSelector} from "react-redux";

import CrewMemberSearchResultCard from "./CrewMemberSearchResultCard";
import {setCrewSelectionActive} from "../../feature/window.slice";

const UserSearchPanel = ({ownedShipDatas}) => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const actualShipSelected = useSelector(
    (state) => state.sharedShips.actualShipSelected
  );

  if (ownedShipDatas.id === actualShipSelected.id) {
    return (
      <div className="user-search-panel-body">
        <div className="user-search-panel-drop-filter">
          <h2>Selectionner un personnel</h2>
          <h3>
            Vaisseau selectionné:
            <span>
              {ownedShipDatas.fleet} {ownedShipDatas.shipName}
            </span>
          </h3>
          <div className="user-search-panel-user-list-container">
            <div className="user-search-panel-user-container">
              {ownedShipDatas.factionPart === "militaire" ? (
                <>
                  {users &&
                    users
                      ?.filter(
                        (user) =>
                          (user.employed === "non" &&
                            user.factionPart === "militaire") ||
                          (user.employed === "non" &&
                            user.pseudo === "Inos SARUM")
                      )
                      .sort((a, b) => a.pseudo.localeCompare(b.pseudo))
                      .map((user) => (
                        <>
                          <CrewMemberSearchResultCard
                            user={user}
                            actualShipSelected={actualShipSelected}
                          />
                        </>
                      ))}
                </>
              ) : (
                ""
              )}
              {ownedShipDatas.factionPart === "civil" ? (
                <>
                  {users &&
                    users
                      ?.filter(
                        (user) =>
                          (user.employed === "non" &&
                            user.factionPart === "civil") ||
                          (user.employed === "non" &&
                            user.factionPart === "civil-militaire")
                      )
                      .sort((a, b) => a.pseudo.localeCompare(b.pseudo))
                      .map((user) => (
                        <>
                          <CrewMemberSearchResultCard
                            user={user}
                            actualShipSelected={actualShipSelected}
                          />
                        </>
                      ))}
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          <button
            className="user-search-panel-user-container-cancel-button"
            type="submit"
            onClick={() => dispatch(setCrewSelectionActive(false))}
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }
};

export default UserSearchPanel;
