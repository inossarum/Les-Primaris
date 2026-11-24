import React, {useEffect} from "react";
import NavBar from "../components/Navbar/NavBar";
import OwnedShipsListAndCrews from "../components/UserHangar/OwnedShipsListAndCrews";
import {useDispatch} from "react-redux";
import axios from "axios";
import {getOwnedShipsList, getRSIShips} from "../feature/userPrivateRoom.slice";
import {windowToggleActive} from "../feature/window.slice";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase.config";

const UserHangar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        dispatch(windowToggleActive(false));

        axios
            .get(`https://api.fleetyards.net/v1/models/?perPage=200`, {
                signal: controller.signal,
            })
            .then((res) => dispatch(getRSIShips(res.data)))
            .catch((error) => {
                if (error.code !== "ERR_CANCELED") {
                    console.error("Échec du chargement des vaisseaux :", error);
                }
            });

        const unsubscribe = onSnapshot(
            collection(db, "shipsAndCrews"),
            (snapshot) => {
                const shipsAndCrews = snapshot.docs.map((document) => ({
                    ...document.data(),
                    id: document.id,
                }));
                dispatch(getOwnedShipsList(shipsAndCrews));
            },
            (error) => console.error("Échec de l’écoute du hangar :", error)
        );

        return () => {
            controller.abort();
            unsubscribe();
        };
    }, [dispatch]);

    return (
        <>
            <div className="user-hangar-body">
                <NavBar pageActive={"userHangar"} factionPart={"civilian"} />
                <div className="user-hangar-title-container">
                    <h2>Votre hangar</h2>
                </div>
                <div>
                    <OwnedShipsListAndCrews />
                </div>
            </div>
        </>
    );
};

export default UserHangar;
