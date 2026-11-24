import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {db} from "../../../utils/firebase.config";
import Translator from "../../Administration/AdministrationUsersList/Translator";

const MilitaryInfosCard = ({military}) => {
  const user = useSelector((state) => state.user);
  const militaryRanks = useSelector(
    (state) => state.militaryRanks.militaryRanks
  );
  let trainings = military.trainings;
  let missions = military.missions;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentRank = militaryRanks?.find(
    (rank) => rank.rank === military.factionRank
  );
  const nextRank = currentRank?.nextRank ?? "";
  const previousRank = currentRank?.previousRank ?? "";
  const nextRankOrder =
    militaryRanks?.find((rank) => rank.previousRank === military.factionRank)
      ?.rankOrder ?? "";
  const previousRankOrder =
    militaryRanks?.find((rank) => rank.nextRank === military.factionRank)
      ?.rankOrder ?? "";

  const handleAddOneMission = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", military.id), {
      missions: missions + 1,
    });
  };
  const handleRemoveOneMission = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", military.id), {
      missions: missions - 1,
    });
  };
  const handleAddOneTraining = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", military.id), {
      trainings: trainings + 1,
    });
  };
  const handleRemoveOneTraining = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", military.id), {
      trainings: trainings - 1,
    });
  };
  const handlePromoteRank = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "users", military.id), {
      rankOrder: nextRankOrder,
      factionRank: nextRank,
      promotedAt: Date.now(),
    });

    const promotionDatas = {
      militaryId: military.id,
      pseudo: military.pseudo,
      RPName: military.RPName,
      rankOrder: nextRankOrder,
      actualFactionRank: military.factionRank,
      newFactionRank: nextRank,
      promotedAt: Date.now(),
      type: "promotion",
    };

    await addDoc(collection(db, "militaryPromotions"), promotionDatas);
  };
  const handleDemoteRank = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "users", military.id), {
      rankOrder: previousRankOrder,
      factionRank: previousRank,
      promotedAt: Date.now(),
    });

    const promotionDatas = {
      militaryId: military.id,
      pseudo: military.pseudo,
      RPName: military.RPName,
      rankOrder: nextRankOrder,
      actualFactionRank: military.factionRank,
      newFactionRank: previousRank,
      promotedAt: Date.now(),
      type: "demotion",
    };

    await addDoc(collection(db, "militaryPromotions"), promotionDatas);
  };

  return (
    <>
      {isCollapsed === true ? (
        <div
          className={
            military.id === user.userId
              ? "military-infos-card-body self-card thick"
              : "military-infos-card-body thick"
          }
        >
          <button
            className="military-infos-card-body-button"
            onClick={() => setIsCollapsed(false)}
          >
            reduire
          </button>
          <div className="military-infos-card-header">
            <div className="military-infos-card-sub-category-image-wrapper">
              <img
                src={`./assets/img/departments/military-ranks/${military?.factionRank}.webp`}
                alt=""
              />
            </div>
            <div className="military-infos-card-user-infos">
              {militaryRanks &&
                [...militaryRanks]
                  .filter((rank) => rank.rank === military.factionRank)
                  .map((rank) => {
                    return (
                      <span className="info-blue" key={rank.id ?? rank.rank}>
                        {rank.shortenedRank}
                      </span>
                    );
                  })}
              {"  "}
              <span>{military?.RPName}</span> <span>({military.pseudo})</span>
            </div>
          </div>

          <div className="military-infos-card-general-informations-container">
            <div className="military-infos-card-general-informations-container-sub-category ">
              <div className="missions">
                <div>
                  <span className="label">Mission(s) effectuée(s): </span>
                  <span className="value info-yellow">{military.missions}</span>
                </div>
                {military.factionRank !== "primarque" &&
                military.factionRank !== "executeur militaire" ? (
                  <div>
                    <span className="label">Mission(s) manquante(s): </span>
                    {militaryRanks &&
                      [...militaryRanks]
                        .filter(
                          (rank) => rank.previousRank === military.factionRank
                        )
                        .map((rank) => {
                          if (rank.missionsNeeded - military.missions <= 0) {
                            return (
                              <span
                                className="value info-green"
                                key={rank.id ?? rank.rank}
                              >
                                0
                              </span>
                            );
                          } else {
                            return (
                              <span
                                className="value info-red"
                                key={rank.id ?? rank.rank}
                              >
                                {rank.missionsNeeded - military.missions}
                              </span>
                            );
                          }
                        })}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>{" "}
              <div className="military-infos-card-sub-category-button-container">
                {user.webSiteRole === "administrateur" ? (
                  <button
                    className="military-infos-card-sub-category-button minus"
                    onClick={(e) => {
                      handleRemoveOneMission(e);
                    }}
                  >
                    {" "}
                    -{" "}
                  </button>
                ) : (
                  ""
                )}
                {user.webSiteRole === "administrateur" ? (
                  <button
                    className="military-infos-card-sub-category-button plus"
                    onClick={(e) => {
                      handleAddOneMission(e);
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="military-infos-card-general-informations-container-sub-category ">
              <div className="trainings">
                <div>
                  <span className="label">Entrainement(s) effectué(s): </span>
                  <span className="value info-yellow">
                    {military.trainings}
                  </span>
                </div>
                {military.factionRank !== "primarque" &&
                military.factionRank !== "executeur militaire" ? (
                  <div>
                    <span className="label">Entrainement(s) manquant(s): </span>
                    {militaryRanks &&
                      [...militaryRanks]
                        .filter(
                          (rank) => rank.previousRank === military.factionRank
                        )
                        .map((rank) => {
                          if (rank.trainingsNeeded - military.trainings <= 0) {
                            return (
                              <span
                                className="value info-green"
                                key={rank.id ?? rank.rank}
                              >
                                0
                              </span>
                            );
                          } else {
                            return (
                              <span
                                className="value info-red"
                                key={rank.id ?? rank.rank}
                              >
                                {rank.trainingsNeeded - military.trainings}
                              </span>
                            );
                          }
                        })}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>{" "}
              <div className="military-infos-card-sub-category-button-container">
                {user.webSiteRole === "administrateur" ? (
                  <button
                    className="military-infos-card-sub-category-button minus"
                    onClick={(e) => {
                      handleRemoveOneTraining(e);
                    }}
                  >
                    {" "}
                    -{" "}
                  </button>
                ) : (
                  ""
                )}
                {user.webSiteRole === "administrateur" ? (
                  <button
                    className="military-infos-card-sub-category-button plus"
                    onClick={(e) => {
                      handleAddOneTraining(e);
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            {military.factionRank !== "primarque" &&
            military.factionRank !== "executeur militaire" ? (
              <div className="military-infos-card-general-informations-container-sub-category ">
                <div className="ranks">
                  {military.militaryDiplomasEarned &&
                  military.militaryDiplomasEarned[0] ? (
                    <div>
                      <span className="label">Diplôme(s) détenu(s): </span>
                      {military.militaryDiplomasEarned &&
                        [...military.militaryDiplomasEarned].map((diploma) => {
                          return (
                            <span
                              className="value info-green-capitalize"
                              key={diploma}
                            >
                              {diploma} /
                            </span>
                          );
                        })}{" "}
                    </div>
                  ) : (
                    <div>
                      <span className="label">Diplôme(s) détenu(s): </span>
                      <span className="value info-red-uppercase">
                        {"aucun"}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="label">Diplôme(s) requis: </span>
                    {militaryRanks &&
                      [...militaryRanks]
                        .filter(
                          (rank) => rank.previousRank === military.factionRank
                        )
                        .map((rank) => {
                          if (rank.diplomaNeeded === "none") {
                            return (
                              <span
                                className="value info-yellow-capitalize"
                                key={rank.id ?? rank.rank}
                              >
                                {rank.diplomaNeeded}
                              </span>
                            );
                          } else {
                            return (
                              <span
                                className="value info-red-capitalize"
                                key={rank.id ?? rank.rank}
                              >
                                {rank.diplomaNeeded}
                              </span>
                            );
                          }
                        })}{" "}
                  </div>
                  {military.factionRank !== "primarque" &&
                  military.factionRank !== "executeur militaire" ? (
                    <div>
                      <span className="label">Recommandation nécessaire: </span>
                      {militaryRanks &&
                        [...militaryRanks]
                          .filter(
                            (rank) => rank.previousRank === military.factionRank
                          )
                          .map((rank) => {
                            if (rank.officerRecommandationNeeded === true) {
                              return (
                                <span
                                  className="value info-red-uppercase"
                                  key={rank.id ?? rank.rank}
                                >
                                  {"oui"}
                                </span>
                              );
                            } else {
                              return (
                                <span
                                  className="value info-green-uppercase"
                                  key={rank.id ?? rank.rank}
                                >
                                  {"non"}
                                </span>
                              );
                            }
                          })}{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {military.factionRank !== "primarque" &&
            military.factionRank !== "executeur militaire" ? (
              <div className="military-infos-card-general-informations-container-sub-category">
                <div className="ranks">
                  <div>
                    <span className="label">Grade actuel: </span>
                    <span className="value info-green-capitalize">
                      {military.factionRank}
                    </span>{" "}
                  </div>
                  <div>
                    <span className="label">Grade suivant: </span>
                    {militaryRanks &&
                      [...militaryRanks]
                        .filter((rank) => rank.rank === military.factionRank)
                        .map((rank) => {
                          return (
                            <span
                              className="value info-blue-capitalize"
                              key={rank.id ?? rank.rank}
                            >
                              {rank.nextRank}
                            </span>
                          );
                        })}{" "}
                  </div>
                </div>
                <div className="military-infos-card-sub-category-button-container">
                  {user.webSiteRole === "administrateur" &&
                  military.factionRank !== "reserviste" &&
                  military.factionRank !== "primarque" ? (
                    <button
                      className="military-infos-card-sub-category-button minus"
                      onClick={(e) => {
                        handleDemoteRank(e);
                      }}
                    >
                      {" "}
                      -{" "}
                    </button>
                  ) : (
                    ""
                  )}
                  {user.webSiteRole === "administrateur" &&
                  military.factionRank !== "primarque" &&
                  military.factionRank !== "executeur militaire" ? (
                    <button
                      className="military-infos-card-sub-category-button plus"
                      onClick={(e) => {
                        handlePromoteRank(e);
                      }}
                    >
                      {" "}
                      +{" "}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {military.factionRank !== "primarque" &&
            military.factionRank !== "executeur militaire" ? (
              <div className="military-infos-card-general-informations-container-sub-category">
                <div className="ranks">
                  {military?.assignment ? (
                    <div>
                      <span className="label">Département actuel: </span>
                      <span className="value info-blue-capitalize">
                        <Translator assignment={military?.assignment} />
                      </span>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {military?.assignmentUnit ? (
                    <div>
                      <span className="label ">Unité d'emploi actuelle: </span>
                      <span className="value info-green">
                        {military?.assignmentUnit}
                      </span>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {military?.job ? (
                    <div>
                      <span className="label">Poste occupé: </span>
                      <span className="value info-yellow-capitalize">
                        {military?.job}
                      </span>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div
          className={
            military.id === user.userId
              ? "military-infos-card-body self-card thin"
              : "military-infos-card-body thin"
          }
          onClick={() => setIsCollapsed(true)}
        >
          <div className="military-infos-card-sub-category">
            <div className="military-infos-card-sub-category-image-wrapper">
              <img
                src={`./assets/img/departments/military-ranks/${military?.factionRank}.webp`}
                alt=""
              />
            </div>
            {militaryRanks &&
              [...militaryRanks]
                .filter((rank) => rank.rank === military.factionRank)
                .map((rank) => {
                  return (
                    <span
                      className="info-blue rank"
                      key={rank.id ?? rank.rank}
                    >
                      {rank.shortenedRank}
                    </span>
                  );
                })}
            <span className="name">
              {"  "}
              <span>{military?.RPName}</span> <span>({military.pseudo})</span>
            </span>
          </div>
          <div className="military-infos-card-sub-category ">
            <span>
              Mission: <span className="info-blue">{military.missions}</span>
            </span>
          </div>
          {military.factionRank !== "primarque" &&
          military.factionRank !== "executeur militaire" ? (
            <div className="military-infos-card-sub-category ">
              <span>
                Missions manquantes:{" "}
                {militaryRanks &&
                  [...militaryRanks]
                    .filter(
                      (rank) => rank.previousRank === military.factionRank
                    )
                    .map((rank) => {
                      if (rank.missionsNeeded - military.missions <= 0) {
                        return (
                          <span className="info-green" key={rank.id ?? rank.rank}>
                            0
                          </span>
                        );
                      } else {
                        return (
                          <span
                            className="info-red"
                            key={rank.id ?? rank.rank}
                          >
                            {rank.missionsNeeded - military.missions}
                          </span>
                        );
                      }
                    })}{" "}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="military-infos-card-sub-category ">
            <span className="label">Entrainements:</span>
            <span className="info-yellow">{military.trainings}</span>
          </div>
          {military.factionRank !== "primarque" &&
          military.factionRank !== "executeur militaire" ? (
            <div className="military-infos-card-sub-category ">
              <span>
                Entrainements manquants:{" "}
                {militaryRanks &&
                  [...militaryRanks]
                    .filter(
                      (rank) => rank.previousRank === military.factionRank
                    )
                    .map((rank) => {
                      if (rank.trainingsNeeded - military.trainings <= 0) {
                        return (
                          <span className="info-green" key={rank.id ?? rank.rank}>
                            0
                          </span>
                        );
                      } else {
                        return (
                          <span
                            className="info-red"
                            key={rank.id ?? rank.rank}
                          >
                            {rank.trainingsNeeded - military.trainings}
                          </span>
                        );
                      }
                    })}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default MilitaryInfosCard;
