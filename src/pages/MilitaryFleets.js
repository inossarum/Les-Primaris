import React from "react";
import NavBar from "../components/Navbar/NavBar";
import {useDispatch, useSelector} from "react-redux";
import FleetCard from "../components/MilitaryPart/MilitaryCrews/FleetCard";
import {setFleetCardActive} from "../feature/window.slice";
import {Close} from "@mui/icons-material";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../utils/firebase.config";
import AdmiralCard from "../components/MilitaryPart/MilitaryCrews/AdmiralCard";
import {NavLink} from "react-router-dom";

const MilitaryFleets = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const militaryShips = useSelector((state) =>
        state.sharedShips.sharedShipsList
            .filter((ship) => ship.factionPart === "militaire")
            .map((ship) => ship.id)
    );

    const aerospatialShips = useSelector(
        (state) => state.sharedShips.aerospatialShips
    );
    const firstReconFleet = useSelector(
        (state) => state.sharedShips.firstReconFleet
    );
    const firstAttackFleet = useSelector(
        (state) => state.sharedShips.firstAttackFleet
    );

    const rightSlider = (e) => {
        const militaryCrewBody = document.querySelector(".military-fleet-body");
        militaryCrewBody.scrollLeft += window.innerWidth;
    };

    const leftSlider = (e) => {
        const militaryCrewBody = document.querySelector(".military-fleet-body");
        militaryCrewBody.scrollLeft -= window.innerWidth;
    };

    // const handleRemoveShipsFromDB = async (e) => {
    //     await militaryShips.forEach((ship) => {
    //         deleteDoc(doc(db, "shipsAndCrews", ship));
    //     });
    // };

    console.log(
        firstReconFleet?.filter(
            (ship) =>
                ship.rank === "" ||
                (ship.rank !== "" &&
                    ship.oldShipHierarchicalSuperior !== "" &&
                    ship.newShipHierarchicalSuperior === "") ||
                (ship.rank !== "" &&
                    ship.oldShipHierarchicalSuperior === "" &&
                    ship.newShipHierarchicalSuperior === "" &&
                    ship.rank !== "01 - vaisseau amiral")
        )
    );

    return (
        <div className="military-fleet-body">
            <NavBar pageActive={"militaryCrew"} factionPart={"military"} />
            <div className="military-fleet-title-container">
                <h2>Flottes Militaires</h2>
            </div>
            <div className="military-department-title-container">
                <NavLink className="navlink" to="">
                    Etat-Major
                </NavLink>
                <NavLink className="navlink" to="/aerospatialFleetsHome">
                    Aerospatial
                </NavLink>
                <NavLink className="navlink" to="">
                    Logistique
                </NavLink>
                <NavLink className="navlink" to="">
                    Force Spéciales
                </NavLink>
            </div>
        </div>
    );
};

export default MilitaryFleets;
