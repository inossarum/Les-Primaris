import React from "react";
import NavBar from "../components/Navbar/NavBar";

const Battlefield = () => {
  return (
    <div className="battlefield-body">
      <NavBar factionPart="battlefield" pageActive="battlefieldHome" />
      <div className="battlefield-header">
        <div className="img-container"></div>
      </div>
      <div className="intro-container">
        <h2 className="bf2042-main-title">C'est la guerre que vous voulez ?</h2>
        <div className="paragraphe-container">
          <p className="paragraphe">
            Alors vous êtes au bon endroit ! <br />
            <br />
            Nous proposons un serveur PORTAL HARDCORE réaliste et impitoyable où
            chaque balle compte ! (conquête x128j / 1750 tickets) <br />
            Si vous voulez survivre, vous devrez jouer prudemment en employant
            diverses tactiques de progressions ! <br />
            <br />
            Pas de carte (minimap: OFF), pas de spot (ping: desabled). <br />
            <br />
            Des projectiles ravageurs (dégats globaux x3) <br />
            Des balles plus rapides (vitesse x4.5) <br />
            Une resistance aux dégâts amoindrie (dégats tirs tête x4, dégâts au
            corps x2)
            <br /> Pas de régénération du corps sans soins ! <br />
            Vous prenez 1 ou 2 balles, vous êtes morts ! <br />
            <br />
            Des véhicules plus résistants (santé x2) et plus puissants (dommages
            x2)
            <br />
            Des alliés à qui il faudra faire confiance (tir ami : ON) ! <br />
          </p>
        </div>
      </div>
      <div className="experience-container">
        <h2 className="bf2042-shared-experience-main-title">
          Vous souhaitez héberger notre expérience ?
        </h2>
        <div className="paragraphe-container">
          <p className="paragraphe">
            Voici le code à fournir sur le jeu : <br />
            <br />
          </p>
          <span className="shared-experience-code">
            Experience Code: AAKQ39
          </span>
        </div>
      </div>
    </div>
  );
};

export default Battlefield;
