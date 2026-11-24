import {useEffect} from "react";
import NavBar from "../components/Navbar/NavBar";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import {
    getMilitaryEventsArchivesList,
    getMilitaryEventsList,
} from "../feature/events.slice";
import MilitaryBulletinBoardNavBar from "../components/MilitaryPart/MilitaryBulletinBoard/MilitaryBulletinBoardNavBar";
import MilitaryEventBoard from "../components/MilitaryPart/MilitaryBulletinBoard/MilitaryEventBoard";
import {getRSIShips} from "../feature/rsi.slice";
import axios from "axios";
import MilitaryPromotionsBoard from "../components/MilitaryPart/MilitaryBulletinBoard/MilitaryPromotionBoard/MilitaryPromotionsBoard";
import {getMilitaryGeneralPromotions} from "../feature/promotions.slice";

const MilitaryBulletinBoard = () => {
    const RSIShips = useSelector((state) => state.rsi.ships);
    const dispatch = useDispatch();

    useEffect(() => {
        onSnapshot(collection(db, "militaryEvents"), (snapshot) => {
            let militaryEventsData = [];
            snapshot.docs.forEach((doc) => {
                militaryEventsData.push({...doc.data(), id: doc.id});
            });
            dispatch(getMilitaryEventsList(militaryEventsData));
        });
        onSnapshot(collection(db, "militaryEventsArchives"), (snapshot) => {
            let militaryEventsArchivesData = [];
            snapshot.docs.forEach((doc) => {
                militaryEventsArchivesData.push({...doc.data(), id: doc.id});
            });
            dispatch(getMilitaryEventsArchivesList(militaryEventsArchivesData));
        });
        onSnapshot(collection(db, "militaryPromotions"), (snapshot) => {
            let primarisPromotions = [];
            snapshot.docs.forEach((doc) => {
                primarisPromotions.push({...doc.data(), id: doc.id});
            });
            dispatch(getMilitaryGeneralPromotions(primarisPromotions));
        });

        if (RSIShips === null) {
            axios
                .get(`https://api.fleetyards.net/v1/models/?perPage=400`)
                .then((res) => dispatch(getRSIShips(res.data)));
        }
    }, []);
    return (
        <div className="military-bulletin-board-body">
            <NavBar
                factionPart="military"
                pageActive={"militaryBulletinBoard"}
            />

            <div className="military-bulletin-board-title-container">
                <h2>Tableau d'affichage militaire</h2>
            </div>
            <MilitaryBulletinBoardNavBar />
            <MilitaryEventBoard />
            <MilitaryPromotionsBoard />
        </div>
    );
};

export default MilitaryBulletinBoard;
