import React from "react";

import NavBar from "../components/Navbar/NavBar";
import Copyrights from "../components/Copyrights";
import MilitaryParticules from "../components/MilitaryPart/MilitaryParticules";

const MilitaryHome = () => {
  return (
    <div>
      <NavBar factionPart={"military"} pageActive={"militaryHome"} />

      <div className="military-home">
        <div className="ember-container">
          <div className="ember-effect">
            <MilitaryParticules />
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
                  <h2>Une vie d'aventure ?</h2>
                  <p>
                    L'Exercitus Primaris offre à ses militaires de vivre
                    l'aventure. De l'exploration, du combat, de la cohésion, de
                    la camaraderie et de l'entraide. C'est notre ligne
                    directrice. Notre motivation première.
                    <br />
                  </p>
                  <h3>Vous apporter la douceur d'un foyer !</h3>
                </div>

                <div className="img-container-right">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/carrack.webp"
                    alt="3 carracks flying into formation"
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
                    src="../assets/img/pilotes.webp"
                    alt="four pilots, in ranks at ease"
                  />
                </div>
                <div className="text-container-right">
                  <h2>Que vous donnons-nous ?</h2>
                  <p>
                    Pour les nouveaux arrivants, le paquetage est fourni. Pour
                    les militaires de carrières, l'équipement octroyé pour votre
                    spécialité est offert. Pour les pilotes, l'Exercitus
                    Primaris s'engage à vous payer le vaisseau nécessaire pour
                    les missions (dans le cas ou vous ne le possédez pas). C'est
                    ça être militaire de l'Exercitus!
                    <br />
                  </p>
                  <h3>Et c'est ça, de faire carrière chez les Primaris !</h3>
                </div>
              </div>
            </div>
            <div className="main-background-description-container">
              <span className="deco-left">
                <span className="inside-deco"></span>
              </span>

              <div className="main-description-container">
                <div className="text-container-left">
                  <h2>Que demandons-nous ?</h2>
                  <p>
                    De la rigueur, de la discipline et une présence sans faille
                    pour faire vivre notre belle faction. Nous éxigeons que vous
                    suiviez les règles et les ordres. Surtout pendant les
                    entrainements et les missions, pour le reste du temps,
                    souvenez vous toujours que:
                    <br />
                  </p>
                  <h3>
                    En dehors du service, vous êtes libres de faire ce qu'il
                    vous plait.
                  </h3>
                </div>
                <div className="img-container-right">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/orison.webp"
                    alt="a soldier at the siege of orison, down the main street."
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
                    src="../assets/img/gladius.webp"
                    alt="a pilote crouching in front of his Aegis Gladius"
                  />
                </div>
                <div className="text-container-right">
                  <h2>Les carrières, les grades, les opportunités ?</h2>
                  <p>
                    Officier, pilote, marine, médecin, ingénieur, nous avons de
                    quoi contenter vos désirs. Chez nous les choses sont
                    simples. Passez les diplomes, faites les missions et les
                    entrainements nécessaires, et vous obtiendrez votre grade et
                    votre poste. Rappelez vous que vous faites votre carrière,
                    vous choisissez votre spécialité:
                    <br />
                  </p>
                  <h3>
                    Mais ils seront toujours le reflet de votre investissement !
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
                  <h2>Pourquoi l'Exercitus ?</h2>
                  <p>
                    Plus qu'une simple activité milsim, nous vous offrons un
                    lore, une histoire, un but à atteindre et une missions à
                    accomplir !
                    <br />
                  </p>
                  <h3>
                    Protéger l'humanité et les Primaris, quoi qu'il en coute !
                  </h3>
                </div>
                <div className="img-container-right">
                  <span className="top"></span>
                  <span className="right"></span>
                  <span className="bottom"></span>
                  <span className="left"></span>
                  <img
                    src="../assets/img/cellin.webp"
                    alt="a screenshot of the environment of Cellin, moon of Crusader"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="toTop" className="btn-container">
          <a href="#ts-military-particles">
            <i className="fa-sharp fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <div className="separator"></div>
        <Copyrights />
      </div>
    </div>
  );
};

export default MilitaryHome;
