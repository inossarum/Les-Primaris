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
    onSnapshot(collection(db, "civilianEvents"), (snapshot) => {
      let civilianEventsData = [];
      snapshot.docs.forEach((doc) => {
        civilianEventsData.push({...doc.data(), id: doc.id});
      });
      dispatch(getCivilianEventsList(civilianEventsData));
    });
    onSnapshot(collection(db, "civilianEventsArchives"), (snapshot) => {
      let civilianEventsArchivesData = [];
      snapshot.docs.forEach((doc) => {
        civilianEventsArchivesData.push({...doc.data(), id: doc.id});
      });
      dispatch(getCivilianEventsArchivesList(civilianEventsArchivesData));
    });

    if (RSIShips === null) {
      axios
        .get(`https://api.fleetyards.net/v1/models/?perPage=200`)
        .then((res) => dispatch(getRSIShips(res.data)));
    }
  }, []);

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
