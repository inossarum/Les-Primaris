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
        const unsubscribeEvents = onSnapshot(
            collection(db, "militaryEvents"),
            (snapshot) => {
                const events = snapshot.docs.map((eventDoc) => ({
                    ...eventDoc.data(),
                    id: eventDoc.id,
                }));
                dispatch(getMilitaryEventsList(events));
            },
            (error) => console.error("Unable to load military events:", error)
        );

        const unsubscribeArchives = onSnapshot(
            collection(db, "militaryEventsArchives"),
            (snapshot) => {
                const events = snapshot.docs.map((eventDoc) => ({
                    ...eventDoc.data(),
                    id: eventDoc.id,
                }));
                dispatch(getMilitaryEventsArchivesList(events));
            },
            (error) => console.error("Unable to load military event archives:", error)
        );

        const unsubscribePromotions = onSnapshot(
            collection(db, "militaryPromotions"),
            (snapshot) => {
                const promotions = snapshot.docs.map((promotionDoc) => ({
                    ...promotionDoc.data(),
                    id: promotionDoc.id,
                }));
                dispatch(getMilitaryGeneralPromotions(promotions));
            },
            (error) => console.error("Unable to load military promotions:", error)
        );

        return () => {
            unsubscribeEvents();
            unsubscribeArchives();
            unsubscribePromotions();
        };
    }, [dispatch]);

    useEffect(() => {
        if (RSIShips !== null) {
            return undefined;
        }

        const controller = new AbortController();
        axios
            .get("https://api.fleetyards.net/v1/models/?perPage=400", {
                signal: controller.signal,
            })
            .then((response) => dispatch(getRSIShips(response.data)))
            .catch((error) => {
                if (error.code !== "ERR_CANCELED") {
                    console.error("Unable to load FleetYards ships:", error);
                }
            });

        return () => controller.abort();
    }, [RSIShips, dispatch]);

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
