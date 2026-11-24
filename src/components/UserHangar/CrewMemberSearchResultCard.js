import React, {useRef} from "react";

import {useDispatch} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";
import {setCrewSelectionActive} from "../../feature/window.slice";
import Avatar from "../SocialNetwork/Avatar";

const CrewMemberSearchResultCard = ({user, actualShipSelected}) => {
  const dispatch = useDispatch();
  const job = useRef();

  const handleAddCrewMember = async (e) => {
    e.preventDefault();
    const crewMembers = actualShipSelected.crewMembers;

    const dataUser = {
      actualShipSelected: actualShipSelected.id,
      pseudo: user.pseudo,
      photo: user.photo,
      userId: user.id,
      factionRank: user.factionRank,
      factionPart: user.factionPart,
      job: job.current.value,
    };

    await updateDoc(doc(db, "shipsAndCrews", actualShipSelected.id), {
      crewMembers: [...crewMembers, dataUser],
    });

    await updateDoc(doc(db, "users", user.id), {
      employed: "oui",
      postulant: "non",
      assignmentUnit: `${actualShipSelected.fleet} ${actualShipSelected.shipName}`,
      job: dataUser.job,
    });
  };

  return (
    <div className="crew-member-search-result-card-body">
      <div
        key={user.userId}
        className="crew-member-search-result-main-container"
      >
        <div className="crew-member-search-panel-image-wrapper">
          {user?.photo !== "" ? (
            <img src={user?.photo} alt={user?.photo} />
          ) : (
            <Avatar className="crew-member-search-panel-avatar" />
          )}
        </div>
        <h3 className="crew-member-search-panel-name">{user.pseudo}</h3>
      </div>
      <div className="crew-member-search-panel-job-selector">
        {actualShipSelected.ship.maxCrew <= 1 ? (
          <select ref={job}>
            <option value="">Selection...</option>
            <option value="pilote">Pilote</option>
          </select>
        ) : (
          <select ref={job}>
            <option value="">Selection...</option>
            <option value="commandant">Commandant</option>
            <option value="commandant en second">Commandant en second</option>
            <option value="pilote">Pilote</option>
            <option value="Medecin Chef de bord">Medecin Chef de bord</option>
            <option value="Medecin de bord">Medecin de bord</option>
            <option value="Medecin urgentiste">Medecin urgentiste</option>
            <option value="Chef artilleur">Chef artilleur</option>
            <option value="Artilleur">Artilleur</option>
            <option value="Chef ingénieur">Chef ingénieur</option>
            <option value="Ingénieur">Ingénieur</option>
            <option value="Chef d'escadrille">Chef d'escadrille</option>
            <option value="Ailier">Ailier</option>
            <option value="Responsable matériel">Responsable matériel</option>
            <option value="Manutentionnaire">Manutentionnaire</option>
          </select>
        )}

        <button
          type="submit"
          onClick={(e) =>
            handleAddCrewMember(e) & dispatch(setCrewSelectionActive(false))
          }
        >
          Valider le choix
        </button>
      </div>
    </div>
  );
};

export default CrewMemberSearchResultCard;
