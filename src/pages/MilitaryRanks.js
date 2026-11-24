import React, {useState} from "react";
import NavBar from "../components/Navbar/NavBar";
import MilitaryRankContainer from "../components/MilitaryPart/MilitaryRankContainer";

const MilitaryRanks = () => {
  const [generalOfficerDeployed, setGeneralOfficerDeployed] = useState(false);
  const [seniorOfficerDeployed, setSeniorOfficerDeployed] = useState(false);
  const [juniorOfficerDeployed, setJuniorOfficerDeployed] = useState(false);
  const [nonCommissionedOfficerDeployed, setNonCommissionedOfficerDeployed] =
    useState(false);
  const [nonCommissionedMemberDeployed, setNonCommissionedMemberDeployed] =
    useState(false);
  const [reservisteDeployed, setReservisteDeployed] = useState(false);

  let generalOfficer = [
    "general de brigade",
    "general d'armee",
    "contre-amiral",
    "vice-amiral",
    "amiral",
  ];
  let seniorOfficer = ["commandant", "lieutenant-colonel", "colonel"];
  let juniorOfficer = [
    "eleve-officier",
    "sous-lieutenant",
    "lieutenant",
    "capitaine",
  ];
  let nonCommissionedOfficer = [
    "sergent",
    "sergent-chef",
    "adjudant",
    "adjudant-chef",
    "major",
  ];
  let nonCommissionedMember = [
    "militaire eleve",
    "seconde classe",
    "premiere classe",
    "caporal",
    "caporal-chef",
  ];
  let reserviste = "reserviste";

  return (
    <div className="military-ranks-body">
      <NavBar factionPart="military" pageActive={"militaryRanks"} />
      <div className="military-ranks-container">
        <div className="title-row-container deployed">
          <h3>les grades de l'exercitus primaris</h3>
          <div className="rank-container">
            <p>
              Bienvenue à vous ! <br />
              Veuillez cliquer sur les catégories de grades pour développer les
              tableaux.
            </p>
          </div>
        </div>
        <div
          className="rank-row-container"
          onClick={() =>
            generalOfficerDeployed
              ? setGeneralOfficerDeployed(false)
              : setGeneralOfficerDeployed(true)
          }
        >
          <span className="left-top"></span>
          <span className="top-right"></span>
          <span className="right-bottom"></span>
          <span className="bottom-left"></span>
          <h3>Officiers Generaux</h3>
          <div
            className={
              generalOfficerDeployed
                ? "general-officer deployed"
                : "general-officer reduced"
            }
          >
            {generalOfficer.map((rank) => (
              <MilitaryRankContainer
                key={rank}
                rank={rank}
                isDeployed={generalOfficerDeployed}
              />
            ))}
          </div>
        </div>
        <div
          className="rank-row-container"
          onClick={() =>
            seniorOfficerDeployed
              ? setSeniorOfficerDeployed(false)
              : setSeniorOfficerDeployed(true)
          }
        >
          <span className="left-top"></span>
          <span className="top-right"></span>
          <span className="right-bottom"></span>
          <span className="bottom-left"></span>
          <h3>Officiers Superieurs</h3>
          <div
            className={
              seniorOfficerDeployed
                ? "senior-officer deployed"
                : "senior-officer reduced"
            }
          >
            {seniorOfficer.map((rank) => (
              <MilitaryRankContainer
                key={rank}
                rank={rank}
                isDeployed={seniorOfficerDeployed}
              />
            ))}
          </div>
        </div>
        <div
          className="rank-row-container"
          onClick={() =>
            juniorOfficerDeployed
              ? setJuniorOfficerDeployed(false)
              : setJuniorOfficerDeployed(true)
          }
        >
          <span className="left-top"></span>
          <span className="top-right"></span>
          <span className="right-bottom"></span>
          <span className="bottom-left"></span>
          <h3>Officiers Subalternes</h3>
          <div
            className={
              juniorOfficerDeployed
                ? "junior-officer deployed"
                : "junior-officer reduced"
            }
          >
            {juniorOfficer.map((rank) => (
              <MilitaryRankContainer
                key={rank}
                rank={rank}
                isDeployed={juniorOfficerDeployed}
              />
            ))}
          </div>
        </div>
        <div
          className="rank-row-container"
          onClick={() =>
            nonCommissionedOfficerDeployed
              ? setNonCommissionedOfficerDeployed(false)
              : setNonCommissionedOfficerDeployed(true)
          }
        >
          <span className="left-top"></span>
          <span className="top-right"></span>
          <span className="right-bottom"></span>
          <span className="bottom-left"></span>
          <h3>Sous-Officiers</h3>
          <div
            className={
              nonCommissionedOfficerDeployed
                ? "non-commissioned-officer deployed"
                : "non-commissioned-officer reduced"
            }
          >
            {nonCommissionedOfficer.map((rank) => (
              <MilitaryRankContainer
                key={rank}
                rank={rank}
                isDeployed={nonCommissionedOfficerDeployed}
              />
            ))}
          </div>
        </div>
        <div
          className="rank-row-container"
          onClick={() =>
            nonCommissionedMemberDeployed
              ? setNonCommissionedMemberDeployed(false)
              : setNonCommissionedMemberDeployed(true)
          }
        >
          <span className="left-top"></span>
          <span className="top-right"></span>
          <span className="right-bottom"></span>
          <span className="bottom-left"></span>
          <h3>Militaires du rang</h3>
          <div
            className={
              nonCommissionedMemberDeployed
                ? "non-commissioned-member deployed"
                : "non-commissioned-member reduced"
            }
          >
            {nonCommissionedMember.map((rank) => (
              <MilitaryRankContainer
                key={rank}
                rank={rank}
                isDeployed={nonCommissionedMemberDeployed}
              />
            ))}
          </div>
        </div>
        <div
          className="rank-row-container"
          onClick={() =>
            reservisteDeployed
              ? setReservisteDeployed(false)
              : setReservisteDeployed(true)
          }
        >
          <span className="left-top"></span>
          <span className="top-right"></span>
          <span className="right-bottom"></span>
          <span className="bottom-left"></span>
          <h3>Réservistes</h3>
          <div
            className={
              reservisteDeployed
                ? "reserviste-member deployed"
                : "reserviste-member reduced"
            }
          >
            <span></span>
            {
              <MilitaryRankContainer
                key={reserviste}
                rank={reserviste}
                isDeployed={reservisteDeployed}
              />
            }
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilitaryRanks;
