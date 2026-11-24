import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBar2 from "../Decorations/DecorationBar2";
import axios from "axios";
import {getRSIShops} from "../../feature/rsi.slice";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";
import EncyclopediaObjectPageCard from "./EncyclopediaObjectPageCard";
import EncyclopediaShopItemsPageCard from "./EncyclopediaShopItemsCard";
import EncyclopediaShopsItemsFilter from "./EncyclopediaShopsItemsFilter";

const EncyclopediaStationPage = () => {
  const dispatch = useDispatch();
  const RSICelestialObjects = useSelector(
    (state) => state.rsi.celestialObjects
  );
  const RSIStarSystems = useSelector((state) => state.rsi.starSystems);
  const RSIShops = useSelector((state) => state.rsi.shops);
  const RSIShopsItemsFilterResult = useSelector(
    (state) => state.rsi.shopsItemsFilterResult
  );
  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );

  useEffect(() => {
    if (data?.classification === "rest_stop") {
      axios
        .get(
          `https://api.star-citizen.wiki/api/shops/position/${data.name
            .split(" ")[0]
            .toLowerCase()}?include=items`
        )
        .then((res) => dispatch(getRSIShops(res.data.data)));
    } else if (
      data?.type === "outpost" &&
      data?.name?.includes("Area 0") !== true
    ) {
      axios
        .get(
          `https://api.star-citizen.wiki/api/shops/${data.name}?include=items `
        )
        .then((res) => dispatch(getRSIShops(res.data.data)));
    } else if (
      data?.type === "outpost" &&
      data?.name?.includes("Area 0") === true
    ) {
      axios
        .get(
          `https://api.star-citizen.wiki/api/shops/${data?.name
            .split("0")
            .join("")}?include=items`
        )
        .then((res) => {
          res.data.data.items.data[0] === undefined
            ? dispatch(getRSIShops("Pas de magasins"))
            : dispatch(getRSIShops(res.data.data));
        })
        .catch(() => dispatch(getRSIShops("Pas de magasins")));
    } else {
      axios
        .get(
          `https://api.star-citizen.wiki/api/shops/position/${data.name}?include=items`
        )
        .then((res) => dispatch(getRSIShops(res.data.data)))
        .catch(() => dispatch(getRSIShops("Pas de magasins")));
    }

    window.scrollTo(0, 0);
  }, []);

  if (data.type !== "outpost") {
    return (
      <div className="encyclopedia-station-page-body">
        <NavBar factionPart="civilian" pageActive={"starCitizenEncyclopedia"} />
        <div className="encyclopedia-station-page-main-container">
          <div className="encyclopedia-station-page-image-wrapper">
            <span
              className="encyclopedia-station-page-image"
              style={{
                background: `url(${data.storeImageLarge}) center/cover no-repeat `,
              }}
            >
              <div className="encyclopedia-station-page-header">
                <div className="encyclopedia-station-page-path">
                  {
                    <>
                      <NavLink
                        to="/starCitizenEncyclopediaDetailPage"
                        className="station-details"
                        onClick={() =>
                          RSIStarSystems.filter(
                            (starSystem) =>
                              starSystem.name ===
                              data.celestialObject.starsystem.name
                          ).map((starSystem) =>
                            dispatch(celestialCardContentDeployed(starSystem))
                          )
                        }
                      >
                        {data?.celestialObject?.starsystem?.name} /
                      </NavLink>
                      {data?.celestialObject?.parent ? (
                        <NavLink
                          to="/starCitizenEncyclopediaDetailPage"
                          className="station-details"
                          onClick={() =>
                            RSICelestialObjects.filter(
                              (celestialObject) =>
                                celestialObject.name ===
                                data.celestialObject.parent.name
                            ).map((celestialObject) =>
                              dispatch(
                                celestialCardContentDeployed(celestialObject)
                              )
                            )
                          }
                        >
                          {data?.celestialObject?.parent?.name} /
                        </NavLink>
                      ) : (
                        ""
                      )}
                      <NavLink
                        to="/starCitizenEncyclopediaDetailPage"
                        className="station-details"
                        onClick={() =>
                          RSICelestialObjects.filter(
                            (celestialObject) =>
                              celestialObject.name === data.celestialObject.name
                          ).map((celestialObject) =>
                            dispatch(
                              celestialCardContentDeployed(celestialObject)
                            )
                          )
                        }
                      >
                        {data?.celestialObject.name} /
                      </NavLink>
                      <h2>{data?.name}</h2>
                    </>
                  }
                </div>

                <NavLink
                  to="/starCitizenEncyclopedia"
                  className="close-btn-container"
                  onClick={() => dispatch(celestialCardContentDeployed(false))}
                >
                  <span className="first-bar"></span>
                  <span className="second-bar"></span>
                </NavLink>

                <DecorationBar1 />
              </div>
              {data?.description !== null ? (
                <div className="encyclopedia-station-page-description-container">
                  <DecorationBorderThick />
                  <p className="encyclopedia-station-page-description">
                    {data?.description}
                  </p>
                </div>
              ) : (
                ""
              )}
            </span>
          </div>

          {
            <>
              <div className="encyclopedia-station-page-sub-container">
                <div className="encyclopedia-station-page-container-title">
                  <DecorationBar2 />
                  <h2>BOUTIQUES</h2>
                </div>
                <div className="encyclopedia-station-page-sub-container-wrapper">
                  <div className="encyclopedia-station-page-container">
                    {RSIShops && RSIShops !== "Pas de magasins" ? (
                      [...RSIShops].map((stationShop) => (
                        <EncyclopediaObjectPageCard
                          data={stationShop}
                          key={stationShop.name}
                        />
                      ))
                    ) : (
                      <h3>Pas de boutiques</h3>
                    )}
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="encyclopedia-station-page-body">
        <NavBar factionPart="civilian" />
        <div className="encyclopedia-station-page-main-container">
          <div className="encyclopedia-station-page-image-wrapper">
            <span
              className="encyclopedia-station-page-image"
              style={{
                background: `url(${data.storeImageLarge}) center/cover no-repeat `,
              }}
            >
              <div className="encyclopedia-station-page-header">
                <div className="encyclopedia-station-page-path">
                  {
                    <>
                      <NavLink
                        to="/starCitizenEncyclopediaDetailPage"
                        className="station-details"
                        onClick={() =>
                          RSIStarSystems.filter(
                            (starSystem) =>
                              starSystem.name ===
                              data.celestialObject.starsystem.name
                          ).map((starSystem) =>
                            dispatch(celestialCardContentDeployed(starSystem))
                          )
                        }
                      >
                        {data?.celestialObject?.starsystem?.name} /
                      </NavLink>
                      {data?.celestialObject?.parent ? (
                        <NavLink
                          to="/starCitizenEncyclopediaDetailPage"
                          className="station-details"
                          onClick={() =>
                            RSICelestialObjects.filter(
                              (celestialObject) =>
                                celestialObject.name ===
                                data.celestialObject.parent.name
                            ).map((celestialObject) =>
                              dispatch(
                                celestialCardContentDeployed(celestialObject)
                              )
                            )
                          }
                        >
                          {data?.celestialObject?.parent?.name} /
                        </NavLink>
                      ) : (
                        ""
                      )}
                      <NavLink
                        to="/starCitizenEncyclopediaDetailPage"
                        className="station-details"
                        onClick={() =>
                          RSICelestialObjects.filter(
                            (celestialObject) =>
                              celestialObject.name === data.celestialObject.name
                          ).map((celestialObject) =>
                            dispatch(
                              celestialCardContentDeployed(celestialObject)
                            )
                          )
                        }
                      >
                        {data?.celestialObject.name} /
                      </NavLink>
                      <h2>{data?.name}</h2>
                    </>
                  }
                </div>

                <NavLink
                  to="/starCitizenEncyclopedia"
                  className="close-btn-container"
                  onClick={() => dispatch(celestialCardContentDeployed(false))}
                >
                  <span className="first-bar"></span>
                  <span className="second-bar"></span>
                </NavLink>

                <DecorationBar1 />
              </div>
              {data?.description !== null ? (
                <div className="encyclopedia-station-page-description-container">
                  <DecorationBorderThick />
                  <p className="encyclopedia-station-page-description">
                    {data?.description}
                  </p>
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
          {RSIShops === "Pas de magasin" ? (
            <>
              <EncyclopediaShopsItemsFilter shopName={data.name} />
              <div className="encyclopedia-station-page-sub-container">
                <div className="encyclopedia-station-page-container-title">
                  <DecorationBar2 />
                  <h2>PRODUITS</h2>
                </div>
                <div className="encyclopedia-station-page-sub-container-wrapper">
                  <div className="encyclopedia-station-page-container">
                    {RSIShopsItemsFilterResult && RSIShopsItemsFilterResult ? (
                      RSIShopsItemsFilterResult &&
                      RSIShopsItemsFilterResult[0] ? (
                        [...RSIShopsItemsFilterResult].map((item, index) => (
                          <EncyclopediaShopItemsPageCard
                            shopName={data.name}
                            item={item}
                            key={index}
                          />
                        ))
                      ) : (
                        <h3>Aucun produits de ce type</h3>
                      )
                    ) : (
                      <h3>Aucunes informations disponibles pour ce site</h3>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="encyclopedia-station-page-sub-container">
              <div className="encyclopedia-station-page-container-title">
                <DecorationBar2 />
                <h2>PRODUITS</h2>
              </div>
              <div className="encyclopedia-station-page-sub-container-wrapper">
                <div className="encyclopedia-station-page-container">
                  <h3>Aucunes informations disponibles pour ce site</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default EncyclopediaStationPage;
