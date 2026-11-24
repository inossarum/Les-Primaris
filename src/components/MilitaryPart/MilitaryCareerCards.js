import React, {useState} from "react";

const MilitaryCareerCards = ({career, department, opened}) => {
  const [job, setJob] = useState("");
  // const [deployed, setDeployed] = useState(false);
  const [active, setActive] = useState(false);

  let careerName = "";
  let careerDescription = "";
  let imgName = "";
  let careerAdvancement = "";
  let category = "";

  switch (career) {
    case "primarque":
      careerName = "primarque";
      imgName = "militaryPrimarque";
      careerAdvancement = "neant";
      careerDescription =
        "Le Primarque est le dirigeant et le fondateur de la faction Primaris. Ils dirigent les Exécuteurs Civil et Militaire.";
      category = "";
      break;
    case "military-executioner":
      careerName = "executeur civil";
      imgName = "militaryExecutioner";
      careerAdvancement = "neant";
      careerDescription =
        "L'Exécuteur Civil est le bras droit du Primarque. Il supervise toute la partie civile de la faction Primaris. C'est lui qui rédige, propose et publie les nouvelles directives. Les directeurs de départements et les Polémarques sont directement placés sous sa responsabilité.";

      category = "dirigeant adjoint";
      break;
    case "treasurer":
      careerName = "tresorier";
      imgName = "militaryTreasurer";
      careerAdvancement = "neant";
      careerDescription =
        "Le trésorier civil est en charge de comptabiliser toutes les richesses pécunières de la partie civile de la faction Primaris. Pour l'aider dans cette tâche, la banque centrale Primaris qu'il dirige lui apporte son concours.";

      category = "banquier / comptable";
      break;
    case "polemarch":
      careerName = "polémarque";
      imgName = "militaryPolemarque";
      careerAdvancement = "neant";
      careerDescription =
        "Les Polémarques sont directements rattachés à l'Executeur Civil. Leurs rôles peuvent être variés. En règle générale, ce sont eux qui se déplacent pour diverses supervisions lorsque l'Executeur n'est pas en mesure de le faire lui-même. Nous pourrions les considérer comme les yeux, les oreilles et la bouche de l'Exécuteur Civil. Ils représentent son autorité, et indirectement, l'autorité du Primarque. Certains peuvent se spécialiser dans certains domaines afin d'être capables de gérer diverses situation comme par exemple prendre en main une mission d'exploration particulière.";

      category = "representant officiel";
      break;

    //-----------------------------

    default:
  }

  return (
    <div>
      <div style={{transition: "all .5s"}} className="job-logo-container">
        <img
          style={{transition: "all .5s"}}
          id={career}
          className={
            job === career
              ? "job-logo-container deployed-military-" + department
              : "job-logo-container reduced"
          }
          src={"./assets/img/departments/jobs/" + imgName + ".webp"}
          alt=""
          onClick={() => (setJob(career), setActive(true))}
        />
      </div>
      <div
        style={{transition: "all .7s"}}
        className={
          active && job === career
            ? "slide-in job-detail-container"
            : "slide-out job-detail-container "
        }
      >
        <span
          className="come-back-btn-container"
          onClick={() => (setJob(""), setActive(false))}
        >
          <i className="fa-sharp fa-solid fa-chevron-left"></i>
          <h4 className="come-back">retour arrière</h4>
        </span>

        <img
          className={"job-detail-background"}
          src={`./assets/img/departments/background-jobs/${career}.webp`}
          alt={"image du " + imgName}
        />
        <img
          style={{transition: "all .5s"}}
          id={career}
          className={"deployed-military-" + department}
          src={"./assets/img/departments/jobs/" + imgName + ".webp"}
          alt=""
        />
        <h3>{careerName}</h3>
        <h4 className="category">catégorie: {category} </h4>
        <p>{careerDescription}</p>
        <h4 className="promotion">promotion: {careerAdvancement}</h4>
      </div>
    </div>
  );
};

export default MilitaryCareerCards;
