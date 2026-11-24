import {ChevronRight} from "@mui/icons-material";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getEncyclopediaPage} from "../../../feature/rsi.slice";

const EncyclopediaNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  return (
    <nav className="encyclopedia-nav-bar-body">
      <div className="nav-bar-main-container">
        <div className="nav-bar-inner-container">
          <div className="encyclopedia-nav-bar-top-container">
            <div
              className="encyclopedia-nav-bar-button"
              onClick={() => dispatch(getEncyclopediaPage("home"))}
              title="Home"
            >
              <span
                id="search-icon"
                className="encyclopedia-nav-bar-icon"
              ></span>
            </div>
            <div
              className="encyclopedia-nav-bar-button"
              onClick={() => dispatch(getEncyclopediaPage("starSystems"))}
              title="Systemes stellaires"
            >
              <span
                id="star-systems-icon"
                className="encyclopedia-nav-bar-icon"
              ></span>
            </div>
            <div
              className="encyclopedia-nav-bar-button"
              onClick={() => dispatch(getEncyclopediaPage("celestialObjects"))}
              title="Astres celestes"
            >
              <span
                id="celestial-objects-icon"
                className="encyclopedia-nav-bar-icon"
              ></span>
            </div>
            <div
              className="encyclopedia-nav-bar-button"
              onClick={() => dispatch(getEncyclopediaPage("stations"))}
              title="Stations"
            >
              <span
                id="stations-icon"
                className="encyclopedia-nav-bar-icon"
              ></span>
            </div>

            <div
              className="encyclopedia-nav-bar-button"
              onClick={() => dispatch(getEncyclopediaPage("ships"))}
              title="Vaisseaux"
            >
              <span
                id="ships-icon"
                className="encyclopedia-nav-bar-icon"
              ></span>
            </div>
            <div
              className="encyclopedia-nav-bar-button"
              onClick={() => dispatch(getEncyclopediaPage("lore"))}
              title="Lore Primaris"
            >
              <span id="lore-icon" className="encyclopedia-nav-bar-icon"></span>
            </div>
          </div>
          <div className="encyclopedia-nav-bar-bottom-container">
            <div className="encyclopedia-nav-bar-button">
              <ChevronRight
                className="encyclopedia-nav-bar-icon"
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EncyclopediaNavBar;
