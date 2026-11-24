import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {celestialCardContentDeployed} from "../../feature/window.slice";
import {Link, NavLink} from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import DecorationBar1 from "../Decorations/DecorationBar1";
import DecorationBar2 from "../Decorations/DecorationBar2";
import EncyclopediaShipCard from "./EncyclopediaShipCard";
import DecorationBorderThick from "../Decorations/DecorationBorderThick";
import DecorationBorderThin from "../Decorations/DecorationBorderThin";
import EncyclopediaShipPageDetailsCompartment from "./EncyclopediaShipPageDetailsCompartment";

const EncyclopediaShipPage = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.windowActive.celestialCardContentDeployed
  );

  const RSIShipDetail = useSelector((state) => state.rsi.shipDetail);
  const RSIShipVideos = useSelector((state) => state.rsi.shipVideos);
  const RSIShipVariants = useSelector((state) => state.rsi.shipVariants);
  const RSIShipImages = useSelector((state) => state.rsi?.shipImages);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="encyclopedia-ship-page-body">
      <NavBar factionPart="civilian" pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-ship-page-main-container">
        <div className="encyclopedia-ship-page-image-wrapper">
          <span
            className="encyclopedia-ship-page-image"
            style={{
              background: `url(${data.storeImageLarge}) center/cover no-repeat `,
            }}
          >
            <div className="encyclopedia-ship-page-header">
              <div className="encyclopedia-ship-page-path">
                <h2>{`${data?.manufacturer?.name} - ${data?.name}`}</h2>
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
          <div className="encyclopedia-ship-page-buttons-container">
            {data?.brochure !== null ? (
              <>
                <div className="encyclopedia-ship-page-button-container">
                  <DecorationBorderThick />
                  <a
                    href={data?.brochure}
                    className="encyclopedia-ship-page-brochure"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lire la brochure
                  </a>
                </div>
                <div className="encyclopedia-ship-page-button-container">
                  <DecorationBorderThick />
                  <Link
                    to={data?.brochure}
                    download
                    className="encyclopedia-ship-page-brochure"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Télécharger la brochure
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
            {data?.storeUrl !== null ? (
              <>
                <div className="encyclopedia-ship-page-button-container">
                  <DecorationBorderThick />
                  <a
                    href={data?.storeUrl}
                    className="encyclopedia-ship-page-brochure"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pledge Store RSI
                  </a>
                </div>
              </>
            ) : (
              ""
            )}
            {data?.salesPageUrl !== null ? (
              <>
                <div className="encyclopedia-ship-page-button-container">
                  <DecorationBorderThick />
                  <a
                    href={data?.salesPageUrl}
                    className="encyclopedia-ship-page-brochure"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Comm-link RSI
                  </a>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="encyclopedia-ship-page-description-container">
              <DecorationBorderThick />
              <p className="encyclopedia-ship-page-description">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="encyclopedia-ship-page-sub-container">
          <div className="encyclopedia-ship-page-container-title">
            <DecorationBar2 />
            <h2>CARACTERISTIQUES</h2>
          </div>
          <div className="encyclopedia-ship-page-details-main-container">
            <div className="encyclopedia-ship-page-details-container">
              {/*  */}
              {RSIShipDetail?.data?.sizes ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.sizes}
                  dataCategory="sizes"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.agility ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.agility}
                  dataCategory="agility"
                />
              ) : (
                ""
              )}

              {/*  */}
              {RSIShipDetail?.data?.crew ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.crew}
                  dataCategory="crew"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.cargo_capacity ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.cargo_capacity}
                  dataCategory="cargo"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.mass ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.mass}
                  dataCategory="mass"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.fuel ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.fuel}
                  dataCategory="fuel"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.speed ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.speed}
                  dataCategory="speed"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.quantum ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.quantum}
                  dataCategory="quantum"
                />
              ) : (
                ""
              )}
              {/*  */}
              {RSIShipDetail?.data?.insurance ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={RSIShipDetail?.data?.insurance}
                  dataCategory="insurance"
                />
              ) : (
                ""
              )}
              {/*  */}
              {data !== null ? (
                <EncyclopediaShipPageDetailsCompartment
                  data={data}
                  dataCategory="price"
                />
              ) : (
                <h4>REWARD</h4>
              )}
              {/*  */}
            </div>
          </div>
        </div>

        {RSIShipDetail?.data?.components && RSIShipDetail?.data?.components ? (
          <div className="encyclopedia-ship-page-sub-container">
            <div className="encyclopedia-ship-page-container-title">
              <DecorationBar2 />
              <h2>COMPOSANTS</h2>
            </div>
            <div className="encyclopedia-ship-page-details-main-container">
              <div className="encyclopedia-ship-page-details-container">
                {/*  */}
                {RSIShipDetail?.data?.components ? (
                  <EncyclopediaShipPageDetailsCompartment
                    data={RSIShipDetail?.data?.components.data}
                    dataCategory="avionics"
                  />
                ) : (
                  ""
                )}

                {/*  */}
                {RSIShipDetail?.data?.components ? (
                  <EncyclopediaShipPageDetailsCompartment
                    data={RSIShipDetail?.data?.components.data}
                    dataCategory="systems"
                  />
                ) : (
                  ""
                )}
                {/*  */}
                {RSIShipDetail?.data?.components ? (
                  <EncyclopediaShipPageDetailsCompartment
                    data={RSIShipDetail?.data?.components.data}
                    dataCategory="propulsion"
                  />
                ) : (
                  ""
                )}
                {/*  */}
                {RSIShipDetail?.data?.components ? (
                  <EncyclopediaShipPageDetailsCompartment
                    data={RSIShipDetail?.data?.components.data}
                    dataCategory="weapons"
                  />
                ) : (
                  ""
                )}
                {/*  */}
                {RSIShipDetail?.data?.components ? (
                  <EncyclopediaShipPageDetailsCompartment
                    data={RSIShipDetail?.data?.components.data}
                    dataCategory="thruster"
                  />
                ) : (
                  ""
                )}
                {/*  */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {RSIShipVariants && RSIShipVariants[0] ? (
          <div className="encyclopedia-ship-page-sub-container">
            <div className="encyclopedia-ship-page-container-title">
              <DecorationBar2 />
              <h2>VARIANTES</h2>
            </div>
            <div className="encyclopedia-ship-page-container">
              {RSIShipVariants &&
                RSIShipVariants.map((shipVariant) => (
                  <EncyclopediaShipCard
                    data={shipVariant}
                    key={shipVariant.id}
                  />
                ))}
            </div>
          </div>
        ) : (
          ""
        )}

        {RSIShipImages && RSIShipImages[0] ? (
          <div className="encyclopedia-ship-page-sub-container">
            <div className="encyclopedia-ship-page-container-title">
              <DecorationBar2 />
              <h2>GALLERIE D'IMAGES</h2>
            </div>
            <div className="encyclopedia-ship-page-container">
              {RSIShipImages &&
                RSIShipImages.map((image) => (
                  <div className="encyclopedia-ship-image-wrapper">
                    <a
                      href={image.url}
                      className="encyclopedia-ship-image"
                      style={{
                        background: `url(${image.bigUrl}) center/cover no-repeat `,
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <DecorationBorderThin />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {RSIShipVideos && RSIShipVideos[0] ? (
          <div className="encyclopedia-ship-page-sub-container">
            <div className="encyclopedia-ship-page-container-title">
              <DecorationBar2 />
              <h2>VIDEOS</h2>
            </div>
            <div className="encyclopedia-ship-page-container">
              <div className="encyclopedia-ship-video-container">
                {RSIShipVideos &&
                  RSIShipVideos.map((video) => (
                    <iframe
                      className="ship-video"
                      src={`${video.url}`}
                      no-referrer="true"
                      style={{width: "90%", height: "600px"}}
                      title={video.id}
                      allow="fullscreen"
                      mozbrowser
                    ></iframe>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EncyclopediaShipPage;
