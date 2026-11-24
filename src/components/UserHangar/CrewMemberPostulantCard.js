import {doc, getDoc, updateDoc} from "firebase/firestore";
import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {db} from "../../utils/firebase.config";
import {setShipOwnerDatas} from "../../feature/userPrivateRoom.slice";

const CrewMemberPostulantCard = ({crewMemberPostulant, ownedShipDatas}) => {
  const dispatch = useDispatch();
  const crewMemberPostulantDatas = useSelector((state) =>
    state.user.users.find((user) => user.id === crewMemberPostulant.userId)
  );

  const shipOwnerDatas = useSelector((state) =>
    state.user.users.find((user) => user.id === ownedShipDatas.ownerId)
  );

  console.log(ownedShipDatas);

  const ownedShipPostulantCardNotificationId =
    ownedShipDatas.crewMemberPostulants.find(
      (postulant) => postulant.id === crewMemberPostulant.id
    )?.notificationId;

  const shipOwnerNotificationsAfterActionOnThePostulantCard =
    shipOwnerDatas?.notifications.filter(
      (notification) =>
        notification.associatedPostulate !==
        ownedShipPostulantCardNotificationId
    );

  const user = useSelector((state) => state.user);

  const handleRefuseCrewMemberPostulant = async (e) => {
    e.preventDefault();
    const crewMemberPostulants = ownedShipDatas.crewMemberPostulants.filter(
      (shipCrewMemberPostulant) =>
        shipCrewMemberPostulant.userId !== crewMemberPostulant.userId
    );

    await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas.id), {
      crewMemberPostulants: crewMemberPostulants,
    });

    await updateDoc(doc(db, "users", crewMemberPostulant.userId), {
      postulant: "non",
    });
    await updateDoc(doc(db, "users", shipOwnerDatas.id), {
      notifications: shipOwnerNotificationsAfterActionOnThePostulantCard,
    });
  };

  const handleCancelCrewMemberPostulant = async (e) => {
    e.preventDefault();
    const crewMemberPostulants = ownedShipDatas.crewMemberPostulants.filter(
      (shipCrewMemberPostulant) =>
        shipCrewMemberPostulant.userId !== crewMemberPostulant.userId
    );

    await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas.id), {
      crewMemberPostulants: crewMemberPostulants,
    });

    await updateDoc(doc(db, "users", crewMemberPostulant.userId), {
      postulant: "non",
    });
    await updateDoc(doc(db, "users", shipOwnerDatas.id), {
      notifications: shipOwnerNotificationsAfterActionOnThePostulantCard,
    });
  };

  const handleAcceptCrewMemberPostulant = async (e) => {
    e.preventDefault();
    const crewMembers = ownedShipDatas.crewMembers;
    const crewMemberPostulants = ownedShipDatas.crewMemberPostulants.filter(
      (shipCrewMemberPostulant) =>
        shipCrewMemberPostulant.userId !== crewMemberPostulant.userId
    );

    await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas.id), {
      crewMembers: [...crewMembers, crewMemberPostulant],
      crewMemberPostulants: crewMemberPostulants,
    });
    await updateDoc(doc(db, "users", crewMemberPostulant.userId), {
      employed: "oui",
      postulant: "non",
      assignmentUnit: `${ownedShipDatas.fleet} ${ownedShipDatas.shipName}`,
      job: crewMemberPostulant.job,
    });

    await updateDoc(doc(db, "users", shipOwnerDatas.id), {
      notifications: shipOwnerNotificationsAfterActionOnThePostulantCard,
    });
  };

  console.log(crewMemberPostulant);

  useEffect(() => {
    getDoc(doc(db, "users", ownedShipDatas.ownerId)).then((res) =>
      dispatch(setShipOwnerDatas({...res.data()}))
    );
  }, []);

  return (
    <div className="crew-member-postulant-card-body">
      <div
        className="crew-member-postulant-card-background"
        style={{
          background: `url(${crewMemberPostulantDatas?.photo}) center/cover no-repeat`,
        }}
      >
        <div className="crew-member-postulant-card-main-container">
          <div className="crew-member-postulant-card-button-container">
            {ownedShipDatas.ownerId === user.userId ||
            user.webSiteRole === "administrateur" ? (
              <>
                <button onClick={(e) => handleAcceptCrewMemberPostulant(e)}>
                  Valider
                </button>
                <button onClick={(e) => handleRefuseCrewMemberPostulant(e)}>
                  Refuser
                </button>
              </>
            ) : (
              ""
            )}
            {crewMemberPostulant.userId === user.userId ? (
              <button onClick={(e) => handleCancelCrewMemberPostulant(e)}>
                Annuler
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="crew-member-postulant-card-header">
            <div className="crew-member-postulant-sub-container">
              <h3 className="crew-member-postulant-card-name">
                {crewMemberPostulantDatas?.RPName} (
                {crewMemberPostulantDatas?.pseudo})
              </h3>
              <div className="crew-member-postulant-card-rank-container">
                <h4 className="crew-member-postulant-card-rank">
                  {crewMemberPostulantDatas?.factionRank}
                </h4>
                {crewMemberPostulant?.factionPart === "militaire" ||
                crewMemberPostulant?.factionPart === "civil-militaire" ? (
                  <div className="crew-member-postulant-card-rank-logo">
                    <img
                      src={
                        "./assets/img/departments/military-ranks/" +
                        crewMemberPostulantDatas?.factionRank +
                        ".webp"
                      }
                      alt={
                        "./assets/img/departments/military-ranks/" +
                        crewMemberPostulantDatas?.factionRank +
                        ".webp"
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="crew-member-postulant-card-sub-container">
            <h3 className="crew-member-postulant-card-rank">
              Post désiré: <span>{crewMemberPostulant.job}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewMemberPostulantCard;
