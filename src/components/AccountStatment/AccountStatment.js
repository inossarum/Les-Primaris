import {signOut} from "firebase/auth";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {windowToggleActive} from "../../feature/window.slice";
import {auth, db} from "../../utils/firebase.config";
import {NavLink} from "react-router-dom";

import RankImgSelector from "../RankImgSelector";
import NotificationsDisplayer from "./NotificationsDisplayer";
import {doc, updateDoc} from "firebase/firestore";
import {getUserNotifications} from "../../feature/user.slice";

const AccountStatment = ({pageActive}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const userWebSiteRole = useSelector((state) => state.user.webSiteRole);
    const userFactionRank = useSelector((state) => state.user.factionRank);
    const userFactionPart = useSelector((state) => state.user.factionPart);
    const userPhoto = useSelector((state) => state.user.photo);
    const userId = useSelector((state) => state.user.userId);

    const windowSetNotActiveState = () => {
        return dispatch(windowToggleActive(false));
    };

    const handleLogout = () => {
        if (auth !== null) {
            signOut(auth);
            windowSetNotActiveState();
        }
    };

    const removeAllNotifications = async (e) => {
        await updateDoc(doc(db, "users", userId), {
            notifications: [],
        });

        dispatch(getUserNotifications([]));
    };

    let factionPartImg = "";
    switch (userFactionPart) {
        case "civil":
            factionPartImg = "./assets/img/phoenix.webp";
            break;
        case "militaire":
            factionPartImg = "./assets/img/exercitusPrimaris.webp";
            break;
        case "civil-militaire":
            factionPartImg = "./assets/img/phoenix.webp";
            break;
        case "representant-exterieur":
            factionPartImg = "./assets/img/ambassy.webp";
            break;
        default:
    }

    return (
        <div className="account-statment-container">
            <h2 className="title">Parametres du compte</h2>
            <div className="account-profil-container">
                <div className="pictures-container">
                    <div className="profil-picture-container">
                        <img
                            src={userPhoto}
                            alt="emblème choisi par l'utilisateur"
                            className="profil-picture"
                        />
                    </div>

                    {/* <Caption /> */}
                    <div className="rank-container">
                        <div className="corpo-picture-container">
                            <img
                                src={factionPartImg}
                                alt={`logo ${userFactionPart}`}
                            />
                        </div>
                        <div className="rank-picture-container">
                            <RankImgSelector
                                factionRank={userFactionRank}
                                factionPart={userFactionPart}
                            />
                        </div>
                    </div>
                </div>
                <div className="account-infos-container">
                    <div className="pseudo-container">
                        <h4 className="current-user-pseudo">{user}</h4>

                        <div className="role-site-container">
                            <span
                                className={`role-circle ${userWebSiteRole}`}
                            ></span>
                            <h5 className="user-role">{userWebSiteRole}</h5>
                        </div>
                        <div className="role-corpo-container">
                            {userFactionPart === "militaire" ? (
                                <div className="military-rank-logo-wrapper">
                                    <img
                                        src={`./assets/img/departments/military-ranks/${userFactionRank}.webp`}
                                        alt={` grade de ${userFactionRank}`}
                                    />
                                </div>
                            ) : (
                                <span
                                    className={`role-circle ${userFactionRank}`}
                                ></span>
                            )}
                            <h5 className="user-role">{userFactionRank}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="account-statment-container-buttons-container">
                {pageActive !== "userPrivateRoom" ? (
                    <span className="access-button-yellow">
                        <NavLink to="/userPrivateRoom">Private Room</NavLink>
                    </span>
                ) : (
                    ""
                )}
                {pageActive !== "userHangar" ? (
                    <span className="access-button-yellow">
                        <NavLink to="/userHangar">Hangar</NavLink>
                    </span>
                ) : (
                    ""
                )}

                <span
                    className="access-button-red"
                    onClick={(e) => removeAllNotifications(e)}
                >
                    Supprimer notifications
                </span>
            </div>

            <div className="logout-btn">
                <NavLink
                    type="submit"
                    className="submit-form"
                    onClick={() => handleLogout()}
                    to="/"
                >
                    Se deconnecter
                </NavLink>
            </div>

            <div className="account-statment-notification-container">
                <NotificationsDisplayer />
            </div>
        </div>
    );
};

export default AccountStatment;
