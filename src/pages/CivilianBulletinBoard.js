import {useEffect} from "react";
import NavBar from "../components/Navbar/NavBar";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../utils/firebase.config";
import {useDispatch, useSelector} from "react-redux";
import {
  getCivilianEventsArchivesList,
  getCivilianEventsList,
} from "../feature/events.slice";
import CivilianBulletinBoardNavBar from "../components/CivilianPart/CivilianBulletinBoard/CivilianBulletinBoardNavBar";
import CivilianEventBoard from "../components/CivilianPart/CivilianBulletinBoard/CivilianEventBoard";
import CivilianPromotionsBoard from "../components/CivilianPart/CivilianBulletinBoard/CivilianPromotionsBoard";
import axios from "axios";
import {getRSIShips} from "../feature/rsi.slice";

const CivilianBulletinBoard = () => {
  const RSIShips = useSelector((state) => state.rsi.ships);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeEvents = onSnapshot(
      collection(db, "civilianEvents"),
      (snapshot) => {
        const events = snapshot.docs.map((eventDoc) => ({
          ...eventDoc.data(),
          id: eventDoc.id,
        }));
        dispatch(getCivilianEventsList(events));
      },
      (error) => console.error("Unable to load civilian events:", error)
    );

    const unsubscribeArchives = onSnapshot(
      collection(db, "civilianEventsArchives"),
      (snapshot) => {
        const events = snapshot.docs.map((eventDoc) => ({
          ...eventDoc.data(),
          id: eventDoc.id,
        }));
        dispatch(getCivilianEventsArchivesList(events));
      },
      (error) => console.error("Unable to load civilian event archives:", error)
    );

    return () => {
      unsubscribeEvents();
      unsubscribeArchives();
    };
  }, [dispatch]);

  useEffect(() => {
    if (RSIShips !== null) {
      return undefined;
    }

    const controller = new AbortController();
    axios
      .get("https://api.fleetyards.net/v1/models/?perPage=200", {
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
    <div className="civilian-bulletin-board-body">
      <NavBar factionPart="civilian" pageActive={"civilianBulletinBoard"} />
      <div className="civilian-bulletin-board-title-container">
        <h2>Tableau d'affichage civil</h2>
      </div>
      <CivilianBulletinBoardNavBar />
      <CivilianEventBoard />
      <CivilianPromotionsBoard />
    </div>
  );
};

export default CivilianBulletinBoard;
