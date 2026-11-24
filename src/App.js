import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CivilianCareers from "./pages/CivilianCareers";
import SocialNetwork from "./pages/SocialNetwork";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import MilitaryHome from "./pages/MilitaryHome";
import MilitaryCareers from "./pages/MilitaryCareers";
import MilitaryMenu from "./pages/MilitaryMenu";
import MilitaryRanks from "./pages/MilitaryRanks";
import MilitaryPatents from "./pages/MilitaryPatents";
import MilitaryOutfits from "./pages/MilitaryOutfits";
import MilitaryFleets from "./pages/MilitaryFleets";
import {useDispatch} from "react-redux";
import {
    getUser,
    getUserAssignment,
    getUserAssignmentUnit,
    getUserBanner,
    getUserBannerRef,
    getUserCivilianDiplomasEarned,
    getUserDepartment,
    getUserEmail,
    getUserEmploymentStatus,
    getUserFactionPart,
    getUserFactionRank,
    getUserId,
    getUserMilitaryDiplomasEarned,
    getUserNotifications,
    getUserOfficerRecommandation,
    getUserPhoto,
    getUserPhotoRef,
    getUserPostulantStatus,
    getUserPromotedAt,
    getUserRPName,
    getUserUploadedBannersList,
    getUserUploadedImagesList,
    getUserWebSiteRole,
    getUsers,
} from "./feature/user.slice";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./utils/firebase.config";
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore";
import UserPrivateRoom from "./pages/UserPrivateRoom";
import Battlefield from "./pages/Battlefield";
import MilitaryCrew from "./pages/MilitaryCrew";
import StarCitizenEncyclopedia from "./pages/StarCitizenEncyclopedia";
import StarCitizenEncyclopediaDetailPage from "./pages/StarCitizenEncyclopediaDetailPage";
import CivilianCrew from "./pages/CivilianCrew";
import {getSharedShipsList} from "./feature/sharedShips.slice";
import {getSharedShipsFleet} from "./feature/sharedShips.slice";
import MilitaryTrainingsAndMissionsFollower from "./pages/MilitaryTrainingsAndMissionsFollower";
import {getMilitaryRanks} from "./feature/militaryRanks.slice";
import UserHangar from "./pages/UserHangar";
import MilitaryBulletinBoard from "./pages/MilitaryBulletinBoard";
import CivilianBulletinBoard from "./pages/CivilianBulletinBoard";
import BattlefieldBulletinBoard from "./pages/BattlefieldBulletinBoard";
import AdministrationHome from "./pages/Administration/AdministrationHome";
import AdministrationUsers from "./pages/Administration/AdministrationUsers";
import AdministrationPrivateMessagingServices from "./pages/Administration/AdministrationPrivateMessagingServices";
import PrimarisIngameShop from "./pages/PrimarisIngameShop/PrimarisIngameShop";

import ExplorationPage from "./pages/CivilianPart/CivilianDepartmentPages/ExplorationPage";
import DiabloIVHome from "./pages/DiabloIV/DiabloIVHome";
import AerospatialFleetsHome from "./components/MilitaryPart/MilitaryCrews/MilitaryFleets/Aerospatial/AerospatialFleetsHome";
import EX1RcFleetPanel from "./components/MilitaryPart/MilitaryCrews/MilitaryFleets/Aerospatial/Recon/EX1RcFleetPanel";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(getUser(user.displayName));
                getDoc(doc(db, "users", `${auth.currentUser.uid}`)).then(
                    (user) =>
                        dispatch(getUserFactionPart(user.data().factionPart)) &
                        dispatch(getUserFactionRank(user.data().factionRank)) &
                        dispatch(getUserAssignment(user.data().assignment)) &
                        dispatch(
                            getUserAssignmentUnit(user.data().assignmentUnit)
                        ) &
                        dispatch(getUserWebSiteRole(user.data().webSiteRole)) &
                        dispatch(getUserDepartment(user.data().department)) &
                        dispatch(getUserPhoto(user.data().photo)) &
                        dispatch(getUserPhotoRef(user.data().photoRef)) &
                        dispatch(
                            getUserUploadedImagesList(
                                user.data().uploadedImagesList
                            )
                        ) &
                        dispatch(getUserBanner(user.data().banner)) &
                        dispatch(getUserBannerRef(user.data().bannerRef)) &
                        dispatch(
                            getUserUploadedBannersList(
                                user.data().uploadedBannersList
                            )
                        ) &
                        dispatch(getUserId(auth.currentUser.uid)) &
                        dispatch(getUserEmail(auth.currentUser.email)) &
                        dispatch(
                            getUserPostulantStatus(user.data().postulant)
                        ) &
                        dispatch(getUserEmail(auth.currentUser.email)) &
                        dispatch(getUserPromotedAt(user.data().promotedAt)) &
                        dispatch(
                            getUserNotifications(user.data().notifications)
                        ) &
                        dispatch(getUserRPName(user.data()?.RPName)) &
                        dispatch(
                            getUserOfficerRecommandation(
                                user.data()?.officerRecommandation
                            )
                        ) &
                        dispatch(
                            getUserCivilianDiplomasEarned(
                                user.data()?.civilianDiplomasEarned
                            )
                        ) &
                        dispatch(
                            getUserMilitaryDiplomasEarned(
                                user.data()?.militaryDiplomasEarned
                            )
                        ) &
                        dispatch(getUserEmploymentStatus(user.data()?.employed))
                );
            }
        });

        onSnapshot(collection(db, "users"), (snapshot) => {
            let usersData = [];
            snapshot.docs.forEach((doc) => {
                usersData.push({...doc.data(), id: doc.id});
            });

            dispatch(getUsers(usersData));

            usersData &&
                [...usersData]
                    .filter((user) => auth?.currentUser?.uid === user?.id)
                    .map(
                        (user) =>
                            dispatch(getUserFactionPart(user?.factionPart)) &
                            dispatch(getUserFactionRank(user?.factionRank)) &
                            dispatch(getUserAssignment(user?.assignment)) &
                            dispatch(
                                getUserAssignmentUnit(user?.assignmentUnit)
                            ) &
                            dispatch(getUserWebSiteRole(user?.webSiteRole)) &
                            dispatch(getUserDepartment(user?.department)) &
                            dispatch(getUserPostulantStatus(user?.postulant)) &
                            dispatch(
                                getUserNotifications(user?.notifications)
                            ) &
                            dispatch(getUserRPName(user?.RPName)) &
                            dispatch(getUserPromotedAt(user?.promotedAt)) &
                            dispatch(
                                getUserOfficerRecommandation(
                                    user?.officerRecommandation
                                )
                            ) &
                            dispatch(
                                getUserCivilianDiplomasEarned(
                                    user?.civilianDiplomasEarned
                                )
                            ) &
                            dispatch(
                                getUserMilitaryDiplomasEarned(
                                    user?.militaryDiplomasEarned
                                )
                            ) &
                            dispatch(getUserEmploymentStatus(user?.employed)) &
                            dispatch(
                                getUserUploadedImagesList(
                                    user?.uploadedImagesList
                                )
                            ) &
                            dispatch(
                                getUserUploadedBannersList(
                                    user?.uploadedBannersList
                                )
                            )
                    );
        });

        onSnapshot(collection(db, "militaryRanks"), (snapshot) => {
            let militaryRanks = [];
            snapshot.docs.forEach((doc) => {
                militaryRanks.push({...doc.data(), id: doc.id});
            });
            dispatch(getMilitaryRanks(militaryRanks));
        });
        onSnapshot(collection(db, "shipsAndCrews"), (snapshot) => {
            let shipsAndCrews = [];
            snapshot.docs.forEach((doc) => {
                shipsAndCrews.push({...doc.data(), id: doc.id});
            });
            dispatch(getSharedShipsList(shipsAndCrews));
            dispatch(getSharedShipsFleet(shipsAndCrews));
        });
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userPrivateRoom" element={<UserPrivateRoom />} />
                <Route path="/userHangar" element={<UserHangar />} />
                <Route
                    path="/starCitizenEncyclopedia"
                    element={<StarCitizenEncyclopedia />}
                />
                <Route
                    path="/primarisIngameShop"
                    element={<PrimarisIngameShop />}
                />
                <Route
                    path="/starCitizenEncyclopediaDetailPage"
                    element={<StarCitizenEncyclopediaDetailPage />}
                />

                <Route path="/contact" element={<Contact />} />
                <Route path="/militaryCrew" element={<MilitaryCrew />} />
                <Route path="/militaryHome" element={<MilitaryHome />} />
                <Route path="/militaryCareers" element={<MilitaryCareers />} />
                <Route path="/militaryMenu" element={<MilitaryMenu />} />
                <Route path="/civilianCareers" element={<CivilianCareers />} />
                <Route
                    path="/explorationDepartment"
                    element={<ExplorationPage />}
                />
                <Route
                    path="/civilianBulletinBoard"
                    element={<CivilianBulletinBoard />}
                />
                <Route path="/militaryRanks" element={<MilitaryRanks />} />
                <Route path="/militaryPatents" element={<MilitaryPatents />} />
                <Route path="/militaryOutfits" element={<MilitaryOutfits />} />
                <Route path="/militaryFleets" element={<MilitaryFleets />} />
                <Route
                    path="/AerospatialFleetsHome"
                    element={<AerospatialFleetsHome />}
                />
                <Route path="/EX1RcFleetPanel" element={<EX1RcFleetPanel />} />
                <Route
                    path="/militaryTrainingsAndMissionsFollower"
                    element={<MilitaryTrainingsAndMissionsFollower />}
                />
                <Route
                    path="/militaryBulletinBoard"
                    element={<MilitaryBulletinBoard />}
                />
                <Route path="/civilianCrew" element={<CivilianCrew />} />
                <Route path="/socialNetwork" element={<SocialNetwork />} />
                <Route
                    path="/administrationHome"
                    element={<AdministrationHome />}
                />
                <Route
                    path="/administrationUsers"
                    element={<AdministrationUsers />}
                />
                <Route
                    path="/administrationPrivateMessagingServices"
                    element={<AdministrationPrivateMessagingServices />}
                />
                <Route path="/battlefield" element={<Battlefield />} />
                <Route
                    path="/battlefieldBulletinBoard"
                    element={<BattlefieldBulletinBoard />}
                />
                <Route path="/diabloIVHome" element={<DiabloIVHome />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
