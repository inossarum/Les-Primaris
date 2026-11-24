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
import {collection, doc, onSnapshot} from "firebase/firestore";
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

    useE    useEffect(() => {
        let unsubscribeProfile = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (unsubscribeProfile) {
                unsubscribeProfile();
                unsubscribeProfile = null;
            }

            if (!user) {
                dispatch(getUser(null));
                return;
            }

            dispatch(getUser(user.displayName));
            dispatch(getUserId(user.uid));
            dispatch(getUserEmail(user.email));

            unsubscribeProfile = onSnapshot(
                doc(db, "users", user.uid),
                (userSnapshot) => {
                    if (!userSnapshot.exists()) {
                        return;
                    }

                    const profile = userSnapshot.data() || {};
                    dispatch(getUserFactionPart(profile.factionPart));
                    dispatch(getUserFactionRank(profile.factionRank));
                    dispatch(getUserAssignment(profile.assignment));
                    dispatch(getUserAssignmentUnit(profile.assignmentUnit));
                    dispatch(getUserWebSiteRole(profile.webSiteRole));
                    dispatch(getUserDepartment(profile.department));
                    dispatch(getUserPhoto(profile.photo));
                    dispatch(getUserPhotoRef(profile.photoRef));
                    dispatch(getUserBanner(profile.banner));
                    dispatch(getUserBannerRef(profile.bannerRef));
                    dispatch(getUserUploadedImagesList(profile.uploadedImagesList || []));
                    dispatch(getUserUploadedBannersList(profile.uploadedBannersList || []));
                    dispatch(getUserPostulantStatus(profile.postulant));
                    dispatch(getUserPromotedAt(profile.promotedAt));
                    dispatch(getUserNotifications(profile.notifications || []));
                    dispatch(getUserRPName(profile.RPName));
                    dispatch(getUserOfficerRecommandation(profile.officerRecommandation));
                    dispatch(getUserCivilianDiplomasEarned(profile.civilianDiplomasEarned || []));
                    dispatch(getUserMilitaryDiplomasEarned(profile.militaryDiplomasEarned || []));
                    dispatch(getUserEmploymentStatus(profile.employed));
                },
                (error) => console.error("Unable to load user profile:", error)
            );
        });

        const unsubscribeUsers = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const usersData = snapshot.docs.map((userDoc) => ({
                    ...userDoc.data(),
                    id: userDoc.id,
                }));
                dispatch(getUsers(usersData));
            },
            (error) => console.error("Unable to load users:", error)
        );

        const unsubscribeMilitaryRanks = onSnapshot(
            collection(db, "militaryRanks"),
            (snapshot) => {
                const militaryRanks = snapshot.docs.map((rankDoc) => ({
                    ...rankDoc.data(),
                    id: rankDoc.id,
                }));
                dispatch(getMilitaryRanks(militaryRanks));
            },
            (error) => console.error("Unable to load military ranks:", error)
        );

        const unsubscribeShipsAndCrews = onSnapshot(
            collection(db, "shipsAndCrews"),
            (snapshot) => {
                const shipsAndCrews = snapshot.docs.map((shipDoc) => ({
                    ...shipDoc.data(),
                    id: shipDoc.id,
                }));
                dispatch(getSharedShipsList(shipsAndCrews));
                dispatch(getSharedShipsFleet(shipsAndCrews));
            },
            (error) => console.error("Unable to load ships and crews:", error)
        );

        return () => {
            unsubscribeAuth();
            unsubscribeProfile?.();
            unsubscribeUsers();
            unsubscribeMilitaryRanks();
            unsubscribeShipsAndCrews();
        };
    }, [dispatch]);turn (
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
