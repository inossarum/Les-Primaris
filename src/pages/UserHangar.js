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
        axios
            .get(`https://api.fleetyards.net/v1/models/?perPage=200`)
            .then((res) => dispatch(getRSIShips(res.data)));

        dispatch(windowToggleActive(false));
        onSnapshot(collection(db, "shipsAndCrews"), (snapshot) => {
            let shipsAndCrews = [];
            snapshot.docs.forEach((doc) => {
                shipsAndCrews.push({...doc.data(), id: doc.id});
            });
            dispatch(getOwnedShipsList(shipsAndCrews));
        });
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
