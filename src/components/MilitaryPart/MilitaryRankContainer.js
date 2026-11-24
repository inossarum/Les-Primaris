import React from "react";

const MilitaryRankContainer = ({rank, isDeployed}) => {
  let description1l = "";
  let description2l = "";
  let description3l = "";
  let description4l = "";
  let img = rank;

  switch (rank) {
    //  general-officer
    case "amiral":
      description1l = "Brevet de l'école de guerre + Ecole de guerre.";
      description2l =
        "Grade accessible sur nomination uniquement (poste unique)";
      break;
    case "vice-amiral":
      description1l = "Brevet de l'école de guerre + Ecole de guerre.";
      description2l = "Grade accessible sur nomination uniquement";
      break;
    case "contre-amiral":
      description1l = "Brevet de l'école de guerre + Ecole de guerre.";
      description2l = "Grade accessible sur nomination uniquement";
      break;
    case "general d'armee":
      description1l = "Brevet de l'école de guerre + Ecole de guerre.";
      description2l = "Grade accessible sur nomination uniquement";
      break;
    case "general de brigade":
      description1l = "Brevet de l'école de guerre + Ecole de guerre.";
      description2l = "Grade accessible sur nomination uniquement";
      description3l = "Grade de Colonel requis";
      break;
    //  senior-officer
    case "colonel":
      description1l = "Brevet supérieur";
      description2l = "Recommandation d'un officier général obligatoire";
      description3l = "3 mois en tant que Lieutenant-Colonel";
      break;
    case "lieutenant-colonel":
      description1l = "Brevet supérieur";
      description2l = "Recommandation du supérieur hirarchique obligatoire";
      description3l = "3 mois en tant que Commandant";
      break;
    case "commandant":
      description1l = "Brevet supérieur";
      description2l = "Recommandation du supérieur hirarchique obligatoire";
      description3l = "3 mois en tant que Capitaine";
      break;
    //  junior-officer
    case "capitaine":
      description1l = "Brevet supérieur";
      description2l = "Recommandation du supérieur hirarchique obligatoire";
      description3l = "3 mois en tant que Lieutenant";
      break;
    case "lieutenant":
      description1l = "Brevet supérieur";
      description3l =
        "Grade acquis en cas de réussite des tests finaux de l'Académie des Officiers";

      break;
    case "sous-lieutenant":
      description1l = "Brevet supérieur";
      description2l =
        "Grade acquis en cours de formation à l'Académie des Officiers lors de l'obtention du brevet supérieur";
      description3l =
        "+40 entrainements + 10 missions officielles en tant que Major";
      break;
    case "eleve-officier":
      description1l = "Grade obtenu à l'entrée à l'Académie des Officiers";
      break;

    // non-commissioned-officer
    case "major":
      description1l = "Brevet intermédiaire";
      description2l =
        "+36 entrainements + 9 missions officielles en tant qu'Adjudant-Chef'";
      break;
    case "adjudant-chef":
      description1l = "Brevet intermédiaire";
      description2l =
        "+32 entrainements + 8 missions officielles en tant qu'Adjudant'";
      break;
    case "adjudant":
      description1l = "Brevet intermédiaire";
      description2l =
        "+28 entrainements + 7 missions officielles en tant que Sergent-chef";
      break;
    case "sergent-chef":
      description1l = "Brevet intermédiaire";
      description2l =
        "+24 entrainements + 6 missions officielles en tant que Sergent";
      break;
    case "sergent":
      description1l = "Brevet intermédiaire";
      description2l =
        "+20 entrainements + 5 missions officielles en tant que Caporal-Chef'";
      break;

    // non-commissioned-member
    case "caporal-chef":
      description1l = "Brevet initial";
      description2l =
        "+16 entrainements + 4 missions officielles en tant que Caporal'";
      break;
    case "caporal":
      description1l = "Brevet initial";
      description2l =
        "+12 entrainements + 3 missions officielles en tant que 1ere Classe";
      break;
    case "premiere classe":
      description1l = "Brevet initial";
      description2l =
        "+8 entrainements + 2 missions officielles en tant que 2dn Classe";
      break;
    case "seconde classe":
      description1l = "Instruction militaire initiale";
      description2l =
        "Grade obtenu en cas de réussite des tests de l'Instruction Militaire Initiale";
      description2l =
        "4 entrainements + 1 mission officielle en tant que Militaire Eleve";
      break;
    case "militaire eleve":
      description1l = "Grade d'entrée dans l'Exercitus Primaris";
      break;

    // reserviste-member
    case "reserviste":
      description1l =
        "Civil Primaris qui souhaite participer aux activités militaires sans pour autant y faire carrière.";

      break;

    //-----------------------------

    default:
  }

  return (
    <div
      id={rank}
      className={
        isDeployed ? "rank-container visible" : "rank-container hidden"
      }
    >
      <h4>{rank}</h4>
      <div className="rank-img-container">
        <img
          src={`./assets/img/departments/military-ranks/${img}.webp`}
          alt={`logo de ${img}`}
        />
      </div>
      <div className="rank-access-description">
        <p>{description1l}</p>
        <p>{description2l}</p>
        <p>{description3l}</p>
        <p>{description4l}</p>
      </div>
    </div>
  );
};

export default MilitaryRankContainer;
