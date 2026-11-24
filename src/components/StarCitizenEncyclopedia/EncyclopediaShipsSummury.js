import React, {useState} from "react";
import {useSelector} from "react-redux";
import NavBar from "../Navbar/NavBar";
import {
  ArrowBack,
  ArrowForward,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import EncyclopediaNavBar from "./EncyclopediaNavBar/EncyclopediaNavBar";
import EncyclopediaShipCard from "./EncyclopediaShipCard";

const EncyclopediaShipsSummury = () => {
  const RSIShips = useSelector((state) => state.rsi.ships);
  const [pageNumber, setPageNumber] = useState(1);
  const [firstShipList, setFirstShipList] = useState(0);
  const [lastShipList, setLastShipList] = useState(24);
  const [filter, setFilter] = useState("");
  let filterResult = undefined;

  switch (filter) {
    case "ShipManufacturerDescending":
      filterResult = (a, b) =>
        b.manufacturer.name.localeCompare(a.manufacturer.name);
      break;
    case "ShipManufacturerAscending":
      filterResult = (a, b) =>
        a.manufacturer.name.localeCompare(b.manufacturer.name);
      break;
    case "ShipNameDescending":
      filterResult = (a, b) => b.name.localeCompare(a.name);
      break;
    case "ShipNameAscending":
      filterResult = (a, b) => a.name.localeCompare(b.name);
      break;
    default:
  }

  const nextPage = (e) => {
    e.preventDefault();
    if (pageNumber < 7) {
      setPageNumber(pageNumber + 1);
      setFirstShipList(firstShipList + 25);
      setLastShipList(lastShipList + 25);
    }
  };

  const previousPage = (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setFirstShipList(firstShipList - 25);
      setLastShipList(lastShipList - 25);
    }
  };

  const firstPage = (e) => {
    e.preventDefault();
    setPageNumber(1);
    setFirstShipList(0);
    setLastShipList(28);
  };

  const lastPage = (e) => {
    e.preventDefault();
    setPageNumber(7);
    setFirstShipList(174);
    setLastShipList(202);
  };

  return (
    <div>
      <NavBar factionPart={"civilian"} pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-body">
        <div className="page-button-container">
          <button
            className="page-button"
            onClick={() => setFilter("ShipNameAscending")}
          >
            Vaisseaux de A à Z
          </button>
          <button
            className="page-button"
            onClick={() => setFilter("ShipNameDescending")}
          >
            Vaisseaux de Z à A
          </button>

          <button className="page-button" onClick={(e) => firstPage(e)}>
            <ArrowBack />
          </button>
          <button className="page-button" onClick={(e) => previousPage(e)}>
            <ChevronLeft />
          </button>
          <span className="page-index"> page {pageNumber} sur 7 </span>
          <button className="page-button" onClick={(e) => nextPage(e)}>
            <ChevronRight />
          </button>
          <button className="page-button" onClick={(e) => lastPage(e)}>
            <ArrowForward />
          </button>
          <button
            className="page-button"
            onClick={() => setFilter("ShipManufacturerAscending")}
          >
            Constructeur de A à Z
          </button>
          <button
            className="page-button"
            onClick={() => setFilter("ShipManufacturerDescending")}
          >
            Constructeur de Z à A
          </button>
        </div>
        <EncyclopediaNavBar />
        <div className="encyclopedia-cards-container">
          {RSIShips &&
            [...RSIShips]
              .sort(filterResult)
              .slice(firstShipList, lastShipList)
              .map((ship) => (
                <EncyclopediaShipCard data={ship} key={ship.id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default EncyclopediaShipsSummury;
