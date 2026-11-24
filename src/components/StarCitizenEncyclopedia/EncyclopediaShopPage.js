import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  celestialCardContentDeployed,
  celestialObjectMoonPath,
  celestialObjectPlanetPath,
  starSystemPath,
} from "../../feature/window.slice";
import {NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBar2 from "../Decorations/DecorationBar2";

import {
  getRSIShopsItems,
  setRSIShopsItemsFilterResult,
} from "../../feature/rsi.slice";
import EncyclopediaShopItemsPageCard from "./EncyclopediaShopItemsCard";
import EncyclopediaShopsItemsFilter from "./EncyclopediaShopsItemsFilter";

const EncyclopediaShopPage = ({data}) => {
  const dispatch = useDispatch();

  const RSIStations = useSelector((state) => state.rsi.stations);
  const RSIShopsItemsFilterResult = useSelector(
    (state) => state.rsi.shopsItemsFilterResult
  );

  useEffect(() => {
    const shopItems = data?.items?.data ?? [];
    dispatch(getRSIShopsItems(shopItems));
    dispatch(setRSIShopsItemsFilterResult(shopItems));

    const station = (RSIStations ?? []).find(
      (candidate) => candidate?.name?.split(" ")[0] === data?.position?.name
    );
    const celestialObject = station?.celestialObject;
    if (celestialObject?.type === "Satellite") {
      dispatch(celestialObjectMoonPath(celestialObject));
      dispatch(celestialObjectPlanetPath(celestialObject.parent));
      dispatch(starSystemPath(celestialObject.starsystem));
    } else if (celestialObject?.type === "Planet") {
      dispatch(celestialObjectMoonPath(""));
      dispatch(celestialObjectPlanetPath(celestialObject));
      dispatch(starSystemPath(celestialObject.starsystem));
    }

    window.scrollTo(0, 0);
  }, [RSIStations, data, dispatch]);

  let backgroundImage = "";

  switch (data.name) {
    case "Casaba Outlet":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/casaba_outlet.webp`;
      break;
    case "Admin Office":
    case "Shallow Fields Station Admin Office":
    case "L19 Admin Office":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/admin_office.webp`;
      break;
    case "Supply Shop":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/supply_shop.webp`;
      break;
    case "Landing Services":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/landing_services.webp`;
      break;
    case "Ore Sales":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/ore_sales.webp`;
      break;
    case "Refining Terminal":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/ore_sales.webp`;
      break;
    case "Live Fire Weapons":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/live_fire_weapons.webp`;
      break;
    case "Platinum Bay":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/platinum_bay.webp`;
      break;
    case "Vantage Rentals":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/vantage_rentals.webp`;
      break;
    case "Traveler Rentals":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/traveler_rentals.webp`;
      break;
    case "Astro Armada":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/astro_armada.webp`;
      break;
    case "Trade & Development Division":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/trade_&_development_division.webp`;
      break;
    case "Pharmacy":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/pharmacy.webp`;
      break;
    case "FPS Armour":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/FPS_armour.webp`;
      break;
    case "IO-North Tower":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/io_north_tower.webp`;
      break;
    case "Centermass":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/centermass.webp`;
      break;
    case "Cubby Blast":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/cubby_blast.webp`;
      break;
    case "G-Loc":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/G_loc.webp`;
      break;
    case "Dumper's Depot":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/dumper_s_depot.webp`;
      break;
    case "Hospital":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/hospital_area_18.webp`;
      break;
    case "Garrity Defense":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/garrity_defense.webp`;
      break;
    case "Mining Kiosks":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/mining_kiosk.webp`;
      break;
    case "Tammany & Sons":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/tammany_and_sons.webp`;
      break;
    case "New Deal":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/new_deal.webp`;
      break;
    case "Transfers Room, Central Business District":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/central_business_district.webp`;
      break;
    case "Hurston Dynamics Showcase":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/HD_showcase.webp`;
      break;
    case "M&V Bar":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/M&V.webp`;
      break;
    case "Maria Pure of Heart":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/maria_pure_of_heart.webp`;
      break;
    case "Aparelli":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/aparelli.webp`;
      break;
    case "MT Planetary Services":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/MT_planetary_services.webp`;
      break;
    case "Factory Line":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/factory_line.webp`;
      break;
    case "Shubin Interstellar":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/shubin_interstellar.webp`;
      break;
    case "Twyn's":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/twyns.webp`;
      break;
    case "Garcia's Greens":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/garcias_greens.webp`;
      break;
    case "Ellroy's":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/ellroys.webp`;
      break;
    case "Whammer's":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/whammers.webp`;
      break;
    case "Gift Shop":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/gift_shop.webp`;
      break;
    case "Wally's":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/wallys.webp`;
      break;
    case "New Babbage Interstellar Spaceport":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/NB_interstellar_spaceport.webp`;
      break;
    case "Omega Pro":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/omega_pro.webp`;
      break;
    case "FTL Courrier":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/FTL_courrier.webp`;
      break;
    case "Brentworth Care Center":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/brentworth_care_center.webp`;
      break;
    case "KC Trending":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/kc_trending.webp`;
      break;
    case "Technotic":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/technotic.webp`;
      break;
    case "Racing bar":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/racing_bar.webp`;
      break;
    case "Old '38":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/old_38.webp`;
      break;
    case "Skutters":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/skutters.webp`;
      break;
    case "Teach's Ship Shop":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/teachs_ship_shop.webp`;
      break;
    case "Grand Barter Gadget Stand":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/grand_barter.webp`;
      break;
    case "Conscientious Objects":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/conscientious_objects.webp`;
      break;
    case "Cordry's":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/cordrys.webp`;
      break;
    case "Cafe Musain":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/cafe_musain.webp`;
      break;
    case "Levski Hospital":
      backgroundImage = `./assets/img/StarCitizenEncyclopedia/encyclopediaShopsBackgrounds/levski_hospital.webp`;
      break;
    default:
  }

  return (
    <div className="encyclopedia-shop-page-body">
      <NavBar factionPart="civilian" pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-shop-page-main-container">
        <div className="encyclopedia-shop-page-image-wrapper">
          <span
            className="encyclopedia-shop-page-image"
            style={{
              background: `url(${backgroundImage}) center/cover no-repeat `,
            }}
          >
            <div className="encyclopedia-shop-page-header">
              <div className="encyclopedia-shop-page-path">
                {
                  <>
                    {/* <NavLink
                      to="/starCitizenEncyclopediaDetailPage"
                      className="shop-details"
                      onClick={() => {
                        RSIStarSystems.filter(
                          (starSystem) => starSystem.name === systemPath.name
                        ).map((starSystem) =>
                          dispatch(celestialCardContentDeployed(starSystem))
                        );
                      }}
                    >
                      {systemPath && systemPath.name} /
                    </NavLink>

                    <NavLink
                      to="/starCitizenEncyclopediaDetailPage"
                      className="shop-details"
                      onClick={() => {
                        dispatch(celestialCardContentDeployed(planetPath));
                      }}
                    >
                      {planetPath && planetPath.name} /
                    </NavLink>

                    {moonPath.name === planetPath.name ? (
                      ""
                    ) : (
                      <>
                        {moonPath.name === "" ? (
                          ""
                        ) : (
                          <NavLink
                            to="/starCitizenEncyclopediaDetailPage"
                            className="shop-details"
                            onClick={() => {
                              dispatch(celestialCardContentDeployed(moonPath));
                            }}
                          >
                            {moonPath && moonPath.name} /
                          </NavLink>
                        )}
                      </>
                    )} */}

                    {/* <NavLink
                      to="/starCitizenEncyclopediaDetailPage"
                      className="shop-details"
                      onClick={() =>
                        RSIStations.filter(
                          (station) => station.name === data.station.name
                        ).map((station) =>
                          dispatch(celestialCardContentDeployed(station))
                        )
                      }
                    >
                      {data?.station.name} /
                    </NavLink> */}
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
          </span>
        </div>
        <EncyclopediaShopsItemsFilter shopName={data.name} />
        <div className="encyclopedia-shop-page-sub-container">
          <div className="encyclopedia-shop-page-container-title">
            <DecorationBar2 />
            <h2>PRODUITS</h2>
          </div>
          <div className="encyclopedia-celestial-objects-page-sub-container-wrapper">
            <div className="encyclopedia-shop-page-container">
              {RSIShopsItemsFilterResult && RSIShopsItemsFilterResult ? (
                RSIShopsItemsFilterResult && RSIShopsItemsFilterResult[0] ? (
                  [...RSIShopsItemsFilterResult].map((item) => (
                    <EncyclopediaShopItemsPageCard
                      shopName={data.name}
                      item={item}
                      key={item.id ?? item.uuid ?? item.name}
                    />
                  ))
                ) : (
                  <h3>Aucun produits de ce type</h3>
                )
              ) : (
                <h3>Aucunes informations disponibles pour cette boutique</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncyclopediaShopPage;
