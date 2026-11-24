import React from "react";

import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const CrewMemberCard = ({crewMember, ownedShipDatas}) => {
    const user = useSelector((state) => state.user);
    const cardMemberUserDatas = useSelector((state) =>
        state.user.users.find((user) => user.id === crewMember.userId)
    );

    const handleRemoveCrewMember = async (e) => {
        e.preventDefault();
        const crewMembers = ownedShipDatas.crewMembers.filter(
            (shipCrewMember) => shipCrewMember.userId !== crewMember.userId
        );

        await updateDoc(doc(db, "shipsAndCrews", ownedShipDatas.id), {
            crewMembers: crewMembers,
        });

        await updateDoc(doc(db, "users", crewMember.userId), {
            employed: "non",
            postulant: "non",
            assignmentUnit: "none",
        });
    };

    return (
        <div
            className={
                crewMember.userId === user.userId
                    ? "crew-member-card-body actual-user " +
                      crewMember.factionPart
                    : "crew-member-card-body " + crewMember.factionPart
            }
        >
            <div
                className="crew-member-card-background"
                style={{
                    background: `url(${cardMemberUserDatas?.photo}) center/cover no-repeat`,
                }}
            >
                <div className="crew-member-card-main-container">
                    {ownedShipDatas.ownerId === user.userId ||
                    crewMember.userId === user.userId ||
                    user.webSiteRole === "administrateur" ? (
                        <button onClick={(e) => handleRemoveCrewMember(e)}>
                            <Delete />
                        </button>
                    ) : (
                        ""
                    )}

                    <div className="crew-member-card-sub-container">
                        <h3 className="crew-member-card-name">
                            {cardMemberUserDatas?.RPName} (
                            {cardMemberUserDatas?.pseudo})
                        </h3>
                    </div>
                    <div className="crew-member-card-sub-container">
                        <h4 className="crew-member-card-rank">
                            {cardMemberUserDatas?.factionRank}
                        </h4>
                        {crewMember?.factionPart === "militaire" ||
                        crewMember?.factionPart === "civil-militaire" ? (
                            <div className="crew-member-card-rank-logo">
                                <img
                                    src={
                                        "./assets/img/departments/military-ranks/" +
                                        cardMemberUserDatas?.factionRank +
                                        ".webp"
                                    }
                                    alt={
                                        "./assets/img/departments/military-ranks/" +
                                        cardMemberUserDatas?.factionRank +
                                        ".webp"
                                    }
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="crew-member-card-sub-container">
                        <h3 className="crew-member-card-job">
                            Post occupé: <span>{crewMember.job}</span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrewMemberCard;
