import React, {useState} from "react";
import MilitaryCareerCards from "./MilitaryCareerCards";

const MilitaryDepartments = ({department}) => {
  let imgName = "";
  let careerCards = "";

  const staff = ["primarque", "military-executioner", "treasurer", "polemarch"];
  const aerospatialDepartment = ["academy-director"];
  const infantryDepartment = ["exploring-director"];
  const logisticsDepartment = ["touring-director"];
  const militaryResearchDepartment = ["trading-director"];
  const militaryTrainingCenter = ["industry-director"];
  const militaryMedicineDepartment = ["sciences-director"];
  const blackOpsDivision = ["medicine-director"];

  const [opened, setOpened] = useState(false);
  const [departments, setDepartments] = useState("");

  const departmentCareerMapper = (departmentArray) => {
    return departmentArray.map((career) => {
      return (
        <MilitaryCareerCards
          key={career}
          career={career}
          department={department}
          opened={opened}
        />
      );
    });
  };

  switch (department) {
    case "staff":
      imgName = "staff";
      careerCards = departmentCareerMapper(staff);
      break;
    case "aerospatialDepartment":
      imgName = "aerospatialDepartment";
      careerCards = departmentCareerMapper(aerospatialDepartment);
      break;
    case "infantryDepartment":
      imgName = "infantryDepartment";
      careerCards = departmentCareerMapper(infantryDepartment);
      break;
    case "logisticsDepartment":
      imgName = "logisticsDepartment";
      careerCards = departmentCareerMapper(logisticsDepartment);
      break;
    case "militaryResearchDepartment":
      imgName = "militaryResearchDepartment";
      careerCards = departmentCareerMapper(militaryResearchDepartment);
      break;
    case "militaryTrainingCenter":
      imgName = "militaryTrainingCenter";
      careerCards = departmentCareerMapper(militaryTrainingCenter);
      break;
    case "militaryMedicineDepartment":
      imgName = "militaryMedicineDepartment";
      careerCards = departmentCareerMapper(militaryMedicineDepartment);
      break;
    case "blackOpsDivision":
      imgName = "blackOpsDivision";
      careerCards = departmentCareerMapper(blackOpsDivision);
      break;

    default:
  }

  return (
    <div id={"container-" + department}>
      <div className={"military-departments"} id={department}>
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
            onClick={() =>
              opened && departments === department
                ? (setOpened(false), setDepartments(department))
                : (setOpened(true), setDepartments(department))
            }
          />
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

export default MilitaryDepartments;
