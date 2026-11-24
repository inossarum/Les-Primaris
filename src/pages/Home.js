import React from "react";
import Particules from "../components/CivilianPart/Particules";
import NavBar from "../components/Navbar/NavBar";
import Copyrights from "../components/Copyrights";

const Home = () => {
  return (
    <div>
      <NavBar factionPart="civilian" pageActive={"civilianHome"} />
      <div className="home">
        <div className="ember-container">
          <div className="ember-effect">
            <Particules />
          </div>
        </div>
        <div className="content-background-container" id="whoAreWe">
          <div className="content-container">
            <div className="main-background-description-container">
              <span className="deco-left">
                <span className="inside-deco"></span>
              </span>
              <div className="main-description-container">
                <div className="text-container-left">
                  <h2>Qui sommes-nous ?</h2>
                  <p>
                    Durant des siècles, les Primaris ont lutté pour défendre
                    l'humanité. Les conflits successifs ont mis à mal notre
                    belle maison. Aujourd'hui, il ne reste qu'une poignée de
                    survivants. Nous tentons d'exister malgré notre état de
                    faiblesse. Désormais, nous n'avons qu'un seul objectif:
                    <br />
                  </p>
                  <h3>
                    REDORER LE BLASON DE NOTRE MAISON ET REVENIR SUR LE DEVANT
                    DE LA SCENE !
                  </h3>
                </div>

                <div className="img-container-right">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/engineer.webp"
                    alt="engineer fixing some kind of electrical component"
                  />
                </div>
              </div>
            </div>
            <div className="main-background-description-container">
              <span className="deco-right">
                <span className="inside-deco"></span>
              </span>
              <div className="main-description-container">
                <div className="img-container-left">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/sunset.webp"
                    alt="engineer fixing some kind of electrical component"
                  />
                </div>
                <div className="text-container-right">
                  <h2>Que voulons-nous ?</h2>
                  <p>
                    Nous voulons retrouver notre gloire perdue. Nous voulons
                    retrouver notre liberté de choix, d'action et de vie. Nous
                    voulons ce que tout individu souhaite. Nous voulons vivre
                    nos aventures là ou celles-ci nous appellent. Nous voulons
                    par dessus tout:
                    <br />
                  </p>
                  <h3>LA SECURITE, LA RICHESSE ET LA PROSPERITE !</h3>
                </div>
              </div>
            </div>
            <div className="main-background-description-container">
              <span className="deco-left">
                <span className="inside-deco"></span>
              </span>

              <div className="main-description-container">
                <div className="text-container-left">
                  <h2>Pourquoi-nous ?</h2>
                  <p>
                    Nous vous apporterons un soutien sans faille. Une
                    camaraderie et un esprit d'équipe unique. Plus vous serez
                    nombreux à nous rejoindre et plus les possibilités seront
                    grandes ! Notre faction étant en pleine renaissance, vous
                    pourrez venir apporter votre pierre à l'édifice.
                    <br />
                  </p>
                  <h3>
                    VENEZ PARTICIPER A LA CREATION D'UNE STRUCTURE FORTE !
                  </h3>
                </div>
                <div className="img-container-right">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/soldiers.webp"
                    alt="engineer fixing some kind of electrical component"
                  />
                </div>
              </div>
            </div>
            <div className="main-background-description-container">
              <span className="deco-right">
                <span className="inside-deco"></span>
              </span>
              <div className="main-description-container">
                <div className="img-container-left">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/departments.webp"
                    alt="engineer fixing some kind of electrical component"
                  />
                </div>
                <div className="text-container-right">
                  <h2>Les opportunités ?</h2>
                  <p>
                    Parmi nous, vous saurez trouver votre place. Que ce soit en
                    tant que civil ou en tant que militaire, nous aurons de quoi
                    contenter vos envies. Détente ou discipline, tout est
                    possible selon les désirs de chacun. Franchissez le pas et
                    venez nous rejoindre.
                    <br />
                  </p>
                  <h3>
                    SOYEZ CE QUE VOUS SOUHAITEZ, QUAND VOUS LE SOUHAITEZ !
                  </h3>
                </div>
              </div>
            </div>
            <div className="main-background-description-container">
              <span className="deco-left">
                <span className="inside-deco"></span>
              </span>
              <div className="main-description-container">
                <div className="text-container-left">
                  <h2>La découverte avant tout !</h2>
                  <p>
                    Nous n'oublions pas que Star Citizen reste un jeu. La
                    découverte, l'amusement et une bonne ambiance sont les
                    facteurs clés pour vivre de bonnes sessions de jeu. Si cet
                    état d'esprit vous guide lors de vos sorties, alors
                    n'hésitez plus !
                    <br />
                  </p>
                  <h3>LA FACTION PRIMARIS EST FAITE POUR VOUS !</h3>
                </div>
                <div className="img-container-right">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/horizon.webp"
                    alt="engineer fixing some kind of electrical component"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="toTop" className="btn-container">
          <a href="#tsparticles">
            <i className="fa-sharp fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <div className="separator"></div>
        <Copyrights />
      </div>
    </div>
  );
};

export default Home;
