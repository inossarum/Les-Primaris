import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setRSIShopsItemsFilterResult} from "../../feature/rsi.slice";

const EncyclopediaShopsItemsFilter = ({shopName}) => {
  const dispatch = useDispatch();
  const RSIShopsItems = useSelector((state) => state.rsi.shopsItems);
  const searchKeyWords = useRef();

  let buttonList = "";

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchKeyWords.current.value.trim().toLowerCase();
    const items = RSIShopsItems || [];
    dispatch(setRSIShopsItemsFilterResult(
      query ? items.filter((item) => String(item.name || "").toLowerCase().includes(query)) : items
    ));
  };

  // Food

  const foodFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Drink" || item.type === "Food"
          )
      )
    );
  };

  // Gadgets
  const keyFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.sub_type === "Hacking")
      )
    );
  };
  const handGadgetsFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.type === "WeaponPersonal" && item.sub_type === "Gadget"
          )
      )
    );
  };
  // Medical
  const utilitiesFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.sub_type === "MedPack" || item.sub_type === "OxygenCap"
          )
      )
    );
  };

  // Clothes
  const feetFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Char_Clothing_Feet"
          )
      )
    );
  };
  const legFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Char_Clothing_Legs"
          )
      )
    );
  };
  const handsFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Char_Clothing_Hands"
          )
      )
    );
  };
  const torsoFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.type === "Char_Clothing_Torso_1" ||
              item.type === "Char_Clothing_Torso_0"
          )
      )
    );
  };

  // Armors
  const undersuitFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Char_Armor_Undersuit"
          )
      )
    );
  };
  const armorHelmetFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Char_Armor_Helmet")
      )
    );
  };
  const armorBackPackFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Char_Armor_Backpack"
          )
      )
    );
  };
  const armorTorsoFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Char_Armor_Torso")
      )
    );
  };
  const armorArmsFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Char_Armor_Arms")
      )
    );
  };
  const armorLegsFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Char_Armor_Legs")
      )
    );
  };

  // Weapons
  const cannonFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.name.toLowerCase().includes("cannon") === true
          )
      )
    );
  };
  const scatterGunFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.name.toLowerCase().includes("scattergun") === true
          )
      )
    );
  };
  const gatlingFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.name.toLowerCase().includes("gatling") === true
          )
      )
    );
  };
  const repeaterFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.name.toLowerCase().includes("repeater") === true
          )
      )
    );
  };
  const missileFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.sub_type === "Missile")
      )
    );
  };
  const torpedoFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.sub_type === "Torpedo")
      )
    );
  };
  const missileRackFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.toLowerCase().includes("missile rack") === true &&
              item.sub_type === "MissileRack"
          )
      )
    );
  };
  const gimbalFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.name.toLowerCase().includes("gimbal") === true
          )
      )
    );
  };
  const turretFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              (item.name.toLowerCase().includes("gimbal") !== true &&
                item.type === "Turret" &&
                item.sub_type === "GunTurret") ||
              item.sub_type === "CanardTurret"
          )
      )
    );
  };
  const weaponPersonalFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "WeaponPersonal")
      )
    );
  };
  const weaponAttachmentFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "WeaponAttachment")
      )
    );
  };
  const magazineFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.type === "WeaponAttachment" && item.sub_type === "Magazine"
          )
      )
    );
  };
  const barrelFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.type === "WeaponAttachment" && item.sub_type === "Barrel"
          )
      )
    );
  };
  const ironSightFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.type === "WeaponAttachment" && item.sub_type === "IronSight"
          )
      )
    );
  };
  const underBarrelFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.type === "WeaponAttachment" &&
              item.sub_type === "BottomAttachment"
          )
      )
    );
  };
  const grenadeFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.sub_type === "Grenade")
      )
    );
  };

  // Components
  const coolerFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Cooler")
      )
    );
  };
  const miningLaserFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "WeaponMining")
      )
    );
  };
  const miningModifierFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "MiningModifier")
      )
    );
  };
  const paintsFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Paints")
      )
    );
  };
  const powerPlantsFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "PowerPlant")
      )
    );
  };
  const quantumDriveFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "QuantumDrive")
      )
    );
  };
  const shieldFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Shield")
      )
    );
  };
  const fuelTanksFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "ExternalFuelTank")
      )
    );
  };
  const gadgetFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) => item.type === "Gadget" && item.sub_type === "Gadget"
          )
      )
    );
  };
  const dockingCollarFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "DockingCollar")
      )
    );
  };
  const containerFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Container")
      )
    );
  };
  const scraperModuleFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter((item) => item.type === "Scrap")
      )
    );
  };

  // Ships
  const constructorAegisFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("aegis") === true
          )
      )
    );
  };
  const constructorAnvilFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("anvil") === true
          )
      )
    );
  };
  const constructorAopoaFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("aopoa") === true
          )
      )
    );
  };
  const constructorArgoFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("argo") === true
          )
      )
    );
  };
  const constructorBanuFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("banu") === true
          )
      )
    );
  };
  const constructorConsolidatedOutlandFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("c.o") === true
          )
      )
    );
  };
  const constructorDrakeFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("drake") === true
          )
      )
    );
  };
  const constructorCrusaderFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("crusader") ===
              true
          )
      )
    );
  };
  const constructorEsperiaFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("esperia") === true
          )
      )
    );
  };
  const constructorGreycatFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("greycat") === true
          )
      )
    );
  };
  const constructorKrugerFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("kruger") === true
          )
      )
    );
  };
  const constructorMiscFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("misc") === true
          )
      )
    );
  };
  const constructorOriginFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("origin") === true
          )
      )
    );
  };
  const constructorRSIFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("rsi") === true
          )
      )
    );
  };
  const constructorTumbrilFilter = () => {
    dispatch(
      setRSIShopsItemsFilterResult(
        RSIShopsItems &&
          RSIShopsItems[0] &&
          [...RSIShopsItems].filter(
            (item) =>
              item.name.split(" ")[0].toLowerCase().includes("tumbril") === true
          )
      )
    );
  };

  const resetFilter = () => {
    dispatch(setRSIShopsItemsFilterResult(RSIShopsItems));
  };

  switch (shopName) {
    case "Casaba Outlet":
    case "Aparelli":
      buttonList = (
        <>
          <button onClick={() => feetFilter()}>Chaussures </button>
          <button onClick={() => legFilter()}>Pantalons / Shorts </button>
          <button onClick={() => handsFilter()}>Mains </button>
          <button onClick={() => torsoFilter()}>
            {" "}
            Vestes / Manteaux / Shirts{" "}
          </button>

          <button onClick={() => foodFilter()}>Nourriture </button>
          <button onClick={() => resetFilter()}>Sans Filtres </button>
        </>
      );
      break;
    case "Centermass":
      buttonList = (
        <>
          <button onClick={() => cannonFilter()}>Canons </button>
          <button onClick={() => scatterGunFilter()}>Scatterguns </button>
          <button onClick={() => gatlingFilter()}>Gatlings </button>
          <button onClick={() => repeaterFilter()}>Repeaters </button>
          <button onClick={() => missileFilter()}>Missiles </button>
          <button onClick={() => torpedoFilter()}>Torpilles </button>
          <button onClick={() => missileRackFilter()}>Racks à missiles </button>
          <button onClick={() => turretFilter()}>Accessoires tourelles </button>
          <button onClick={() => gimbalFilter()}>Gimbals </button>
          <button onClick={() => weaponAttachmentFilter()}>
            Accessoires arme personnelle
          </button>
          <button onClick={() => magazineFilter()}>Chargeurs </button>
          <button onClick={() => barrelFilter()}>Embouts Canon </button>
          <button onClick={() => ironSightFilter()}>Viseurs </button>
          <button onClick={() => grenadeFilter()}>Grenades </button>
          <button onClick={() => resetFilter()}>Sans Filtres </button>
        </>
      );
      break;
    case "Live Fire Weapons":
    case "Supply Shop":
    case "FPS Armour":
    case "Cubby Blast":
    case "Garrity Defense":
    case "Tammany & Sons":
      buttonList = (
        <>
          <button onClick={() => weaponPersonalFilter()}>
            Armement individuel{" "}
          </button>
          <button onClick={() => undersuitFilter()}>Combinaisons</button>
          <button onClick={() => armorHelmetFilter()}>Casques</button>
          <button onClick={() => armorBackPackFilter()}>Sacs à dos</button>
          <button onClick={() => armorTorsoFilter()}>Plastrons</button>
          <button onClick={() => armorArmsFilter()}>Brassières</button>
          <button onClick={() => armorLegsFilter()}>Jambières</button>
          <button onClick={() => weaponAttachmentFilter()}>
            Accessoires Arme Personnelle
          </button>
          <button onClick={() => magazineFilter()}>Chargeurs </button>
          <button onClick={() => barrelFilter()}>Embouts canon </button>
          <button onClick={() => ironSightFilter()}>Viseurs </button>
          <button onClick={() => underBarrelFilter()}>
            Pointeurs / Lampes Tactiques{" "}
          </button>
          <button onClick={() => grenadeFilter()}>Grenades </button>
          <button onClick={() => keyFilter()}>Clés de cryptage </button>
          <button onClick={() => utilitiesFilter()}>Consommables </button>
          <button onClick={() => foodFilter()}>Nourriture </button>
          <button onClick={() => resetFilter()}>Sans Filtres </button>
        </>
      );
      break;
    case "Platinum Bay":
    case "Hurston Dynamics Showcase":
    case "Omega Pro":
    case "Crusader Weaponry Showroom":
    case "Cousin Crows":
      buttonList = (
        <>
          <button onClick={() => cannonFilter()}>Canons </button>
          <button onClick={() => scatterGunFilter()}>Scatterguns </button>
          <button onClick={() => gatlingFilter()}>Gatlings </button>
          <button onClick={() => repeaterFilter()}>Repeaters </button>
          <button onClick={() => missileFilter()}>Missiles </button>
          <button onClick={() => torpedoFilter()}>Torpilles </button>
          <button onClick={() => missileRackFilter()}>Racks à missiles </button>
          <button onClick={() => turretFilter()}>Accessoires tourelles </button>
          <button onClick={() => gimbalFilter()}>Gimbals </button>
          <button onClick={() => coolerFilter()}>Refroidisseurs </button>
          <button onClick={() => powerPlantsFilter()}>Générateurs </button>
          <button onClick={() => quantumDriveFilter()}>
            Moteur de quantum{" "}
          </button>
          <button onClick={() => shieldFilter()}>Boucliers</button>
          <button onClick={() => scraperModuleFilter()}>
            Module de recyclage{" "}
          </button>
          <button onClick={() => miningLaserFilter()}>Lasers de minage </button>
          <button onClick={() => miningModifierFilter()}>
            Modules de minage{" "}
          </button>
          <button onClick={() => fuelTanksFilter()}>
            Réservoir à carburant
          </button>
          <button onClick={() => gadgetFilter()}>Gadgets</button>
          <button onClick={() => dockingCollarFilter()}>
            Collier d'amarrage
          </button>
          <button onClick={() => containerFilter()}>Container</button>
          <button onClick={() => paintsFilter()}>Peintures</button>
          <button onClick={() => weaponAttachmentFilter()}>
            Accessoires arme personnelle
          </button>
          <button onClick={() => magazineFilter()}>Chargeurs </button>
          <button onClick={() => barrelFilter()}>Embouts Canon </button>
          <button onClick={() => ironSightFilter()}>Viseurs </button>
          <button onClick={() => grenadeFilter()}>Grenades </button>
          <button onClick={() => handGadgetsFilter()}>
            Accessoires (Multi-Tool)
          </button>
          <button onClick={() => resetFilter()}>Sans Filtres </button>
        </>
      );
      break;
    case "Astro Armada":
    case "New Deal":
      buttonList = (
        <>
          <button onClick={() => constructorAegisFilter()}>Aegis </button>
          <button onClick={() => constructorAnvilFilter()}>Anvil </button>
          <button onClick={() => constructorAopoaFilter()}>Aopoa </button>
          <button onClick={() => constructorArgoFilter()}>Argo </button>
          <button onClick={() => constructorBanuFilter()}>Banu </button>
          <button onClick={() => constructorConsolidatedOutlandFilter()}>
            Consolidated Outland{" "}
          </button>
          <button onClick={() => constructorCrusaderFilter()}>Crusader </button>
          <button onClick={() => constructorDrakeFilter()}>Drake </button>
          <button onClick={() => constructorEsperiaFilter()}>Esperia </button>
          <button onClick={() => constructorGreycatFilter()}>Greycat </button>
          <button onClick={() => constructorKrugerFilter()}>Kruger </button>
          <button onClick={() => constructorMiscFilter()}>Misc </button>
          <button onClick={() => constructorOriginFilter()}>
            Origin Jumpwork
          </button>
          <button onClick={() => constructorRSIFilter()}>RSI</button>
          <button onClick={() => constructorTumbrilFilter()}>Tumbril</button>
          <button onClick={() => resetFilter()}>Sans Filtres </button>
        </>
      );
      break;
    default:
  }

  return (
    <div className="filter-main-container">
      <h3>filtres</h3>
      <div className="filter-search-container">
        <input
          type="text"
          ref={searchKeyWords}
          placeholder="Rechercher..."
          autoFocus
        />
        <input
          type="submit"
          onClick={(e) => handleSearch(e)}
          value="Rechercher"
        />
      </div>
      <div className="filter-buttons-container">{buttonList}</div>
    </div>
  );
};

export default EncyclopediaShopsItemsFilter;
