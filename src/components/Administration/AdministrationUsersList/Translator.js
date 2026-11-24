import React from "react";

const Translator = ({assignment}) => {
  let departmentName = "";
  switch (assignment) {
    // military departments
    case "staff":
      departmentName = "Etat-Major";
      break;
    case "aerospatialDepartment":
      departmentName = "Aerospatial";
      break;
    case "infantryDepartment":
      departmentName = "Infanterie";
      break;
    case "logisticsDepartment":
      departmentName = "Logistique";
      break;
    case "militaryTrainingCenter":
      departmentName = "Académie Militaire";
      break;
    case "militaryResearch":
      departmentName = "Recherche Militaire";
      break;
    case "militaryMedicine":
      departmentName = "Médecine Militaire";
      break;
    case "blackOpsDivision":
      departmentName = "Forces Spéciales";
      break;

    // civilian departments
    case "centralAdministration":
      departmentName = "Administration Centrale";
      break;
    case "culture":
      departmentName = "Culture & Sports";
      break;
    case "exploration":
      departmentName = "Exploration";
      break;
    case "touring":
      departmentName = "Logistique";
      break;
    case "trade":
      departmentName = "Commerce & Transport";
      break;
    case "industry":
      departmentName = "Industrie";
      break;
    case "medicine":
      departmentName = "Médecine";
      break;
    case "sciences":
      departmentName = "Sciences<";
      break;
    default:
  }

  return <> {departmentName} </>;
};

export default Translator;
