import React, {useState} from "react";
import CivilianCareerCards from "./CivilianCareerCards";
import {NavLink} from "react-router-dom";

const CivilianDepartments = ({department}) => {
  let departmentName = "";
  let imgName = "";
  let careerCards = "";
  let departmentDescription = "";
  let departmentButton = "";

  const centralAdministration = [
    "primarque",
    "civilian-executioner",
    "treasurer",
    "polemarch",
  ];

  const primarisAcademy = [
    "academy-director",
    "chief-former",
    "former",
    "intern",
  ];
  const explorationDepartment = [
    "exploration-director",
    "exploration-sector-chief",
    "chief-explorer",
    "explorer",
    "explorer-apprentice",
    "exploration-navigator-chief",
    "exploration-navigator",
    "exploration-navigator-apprentice",
    "exploration-ground-vehicule-driver-chief",
    "exploration-ground-vehicule-driver",
    "exploration-ground-vehicule-driver-apprentice",
  ];
  const touringDepartment = [
    "touring-director",
    "touring-sector-chief",
    "touring-fleet-chief",
    "touring-captain",
    // "touring-cook-chief",
    // "touring-cook",
    // "touring-cook-apprentice",
    // "touring-waiter-chief",
    // "touring-waiter",
    // "touring-waiter-apprentice",
    // "touring-bartender",
    // "touring-bartender-apprentice",
  ];
  const tradingDepartment = [
    "trading-director",
    "trading-sector-chief",
    "fleet-travelling-merchant-chief",
    "capital-travelling-merchant",
    "large-travelling-merchant",
    "medium-travelling-merchant",
    "light-travelling-merchant",
    // "merchant-multiple-shops",
    // "merchant-chief",
    // "seller",
    // "seller-apprentice",
    // "trader-chief",
    // "trader",
    // "trader-apprentice",
    "delivery-man-chief",
    "delivery-man",
    "delivery-man-apprentice",
    "taxi-team-chief",
    "taxi",
    "driver",
    // "spaceline-fleet-commander",
    // "spaceline-captain",
    // "spaceline-stewart",
  ];
  const industryDepartment = [
    "industry-director",
    "industry-sector-chief",
    "fleet-minor-chief",
    "minor-capital-ship-chief",
    "minor-chief",
    "minor",
    "minor-apprentice",
    "refiner-chief",
    "refiner",
    "refiner-apprentice",
    "fleet-recycler-chief",
    "recycler-chief",
    "recycler",
    "recycler-apprentice",
    "industrial-engineer-chief",
    "industrial-engineer",
    "industrial-engineer-apprentice",
  ];
  const sciencesDepartment = [
    "sciences-director",
    "sciences-section-chief",
    "sciences-project-chief",
    "archaeologist",
    "astrochemist",
    "astronomer",
    "astrophysicist",
    "biologist",
    "chemist",
    "climatologist",
    "echologist",
    "geologist",
    "ichtyologist",
    "medicine",
    "ornithologist",
    "toxycologist",
    "zoologist",
  ];
  const medicineDepartment = [
    "medicine-director",
    "medicine-sector-chief",
    "hospital-director",
    "medicine-section-chief",
    "emergency-doctor",
    "general-practicioner",
    "general-practicioner-apprentice",
    "nurse-chief",
    "nurse",
    "nurse-apprentice",
  ];

  const cultureDepartment = [
    "culture-director",
    "culture-section-chief",
    "culture-editor",
    "culture-journalist",
    "culture-reporter",
    "culture-cameraman",
    "culture-photographer",
    "culture-video-editor",
    "culture-writer",
    "culture-graphist",
    "culture-sound-engineer",
    "culture-racing-team-leader",
    "culture-jock",
  ];

  const multiDepartment = [
    "pilot",
    "gunner",
    "crew-member",
    "independant-worker",
    "engineer",
  ];

  const [opened, setOpened] = useState(false);
  const [departments, setDepartments] = useState("");

  const departmentCareerMapper = (departmentArray) => {
    return departmentArray.map((career) => {
      return (
        <CivilianCareerCards
          key={career}
          career={career}
          department={department}
          opened={opened}
        />
      );
    });
  };

  switch (department) {
    case "centralAdministration":
      departmentName = "administration centrale";
      departmentDescription =
        "L'Administration Centrale Primaris regroupe toutes les hautes autorités Primaris. Vous trouverez en son sein le Banque Centrale et la Trésorerie Primaris, le bureau du Primarque et le bureau de l'Executeur Civil";
      imgName = "centralAdministration";

      careerCards = departmentCareerMapper(centralAdministration);
      break;
    case "primarisAcademy":
      departmentName = "académie primaris";
      departmentDescription =
        "L'Académie Primaris est le principal centre de formation de la faction Primaris. C'est ici que les membres viennent améliorer leurs compétences. L'Académie propose également des postes pour les personnels Primaris qui souhaiteraient enseigner et transmettre leurs connaissances.";
      imgName = "primarisAcademy";
      careerCards = departmentCareerMapper(primarisAcademy);
      break;
    case "explorationDepartment":
      departmentName = "département de l'exploration";
      departmentDescription =
        "Le département de l'Exploration Primaris est dédié à la découverte de nouveaux espaces et à leur reconnaissance. Les informations récupérées par les explorateurs Primaris sont transmises et partagées avec tous les autres départements de la corporation.";
      imgName = "exploration";
      careerCards = departmentCareerMapper(explorationDepartment);
      departmentButton = (
        <span className="primaris-ingame-shop-new-product-form-button-exploration">
          <NavLink to={"/explorationDepartment"}>Exploration</NavLink>
        </span>
      );
      break;
    case "touringDepartment":
      departmentName = "département du tourisme";
      departmentDescription =
        "Le département du Tourisme Primaris est consacré au luxe, aux croisières et à la découverte des plus beaux lieux que l'espace peut offrir. Que les clients soient Primaris ou bien de l'extérieur, il y aura de la place pour tout le monde.";
      imgName = "touring";
      careerCards = departmentCareerMapper(touringDepartment);
      break;
    case "tradingDepartment":
      departmentName = "département du commerce et du transport";
      departmentDescription =
        "Le département du Commerce et du Transport rassemble tous les commerçants (sédentaires ou nomades) et tous les transporteurs de la faction. Découvrir les routes les plus rentables, effectuer des livraisons diverses, gagner de l'argent grace à des transactions commerciales... c'est ici que ça se passe.";
      imgName = "trade";
      careerCards = departmentCareerMapper(tradingDepartment);
      break;
    case "industryDepartment":
      departmentName = "département de l'industrie";
      departmentDescription =
        "Le département de l'Industrie est le moteur de l'industrie Primaris. C'est ici que vous trouverez nos mineurs, nos raffineurs, nos batisseurs ainsi que tous les autres métiers liés à l'industrie.";
      imgName = "industry";
      careerCards = departmentCareerMapper(industryDepartment);
      break;
    case "sciencesDepartment":
      departmentName = "département des sciences";
      departmentDescription =
        "Le département des Sciences est voué aux découvertes. Ces dernières peuvent être axées sur la vie, l'espace, la chimie ou tout autre domaine accessible dans l'univers de Star Citizen. Les recherches et les découvertes de ce département seront cruciales pour la nation Primaris. Elles pourront contribuer à l'évolution significative de la faction.";
      imgName = "sciences";
      careerCards = departmentCareerMapper(sciencesDepartment);
      break;
    case "medicineDepartment":
      departmentName = "département de la médecine";
      departmentDescription =
        "Le département de la Médecine regroupe tous les hôpitaux et tous les spécialistes des soins Primaris. Vous trouverez diverses carrières médicales dans ce département.";
      imgName = "medicine";
      careerCards = departmentCareerMapper(medicineDepartment);
      break;
    case "cultureDepartment":
      departmentName = "département de la culture et des sports";
      departmentDescription =
        "Le département de la Culture et des Sport est dédié à la création artistique, à l'histoire et aux divers sports accessibles dans le verse. Rédacteur, journaliste, ingénieur du son, graphiste, ce département offre beaucoup de possibilités en terme de carrières.";
      imgName = "culture";
      careerCards = departmentCareerMapper(cultureDepartment);
      break;
    case "multiDepartment":
      departmentName = "carrières multidépartements";
      departmentDescription =
        "Cette catégorie regroupe tous les métiers qui se retrouvent dans les divers départements de la faction. Si un membre choisit l'un d'entre eux, il pourra se spécialiser dans un département de son choix.";
      imgName = "phoenix";
      careerCards = departmentCareerMapper(multiDepartment);
      break;

    default:
  }

  return (
    <div id={"container-" + department}>
      <div className={"departments"} id={department}>
        <div className="img-container">
          <img
            className={
              opened
                ? "active logo-" + department
                : "not-active logo-" + department
            }
            style={{transition: "all .5s"}}
            src={"./assets/img/departments/" + imgName + ".webp"}
            alt={`logo de ${department}`}
            onClick={() => {
              setOpened(!(opened && departments === department));
              setDepartments(department);
            }}
          />
          {departmentButton}
        </div>

        <div
          style={{transition: "all 0.5s"}}
          className={
            opened && departments === department
              ? " fade-in department-description-container border-" + department
              : " fade-out department-description-container"
          }
        >
          <div className="department-description-background">
            <h2 className="department-title">{departmentName}</h2>
            <div className="department-description-paragraphe">
              {departmentDescription}
            </div>
          </div>
        </div>
        <div
          style={{transition: "all 0.5s"}}
          className={
            opened && departments === department
              ? " fade-in job-description-container border-" + department
              : " fade-out job-description-container"
          }
        >
          <div className={department}>{careerCards}</div>
        </div>
      </div>
    </div>
  );
};

export default CivilianDepartments;
