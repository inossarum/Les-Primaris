import React from "react";

const EncyclopediaShopItemsPageCard = ({item, shopName}) => {
  let objectType = "";
  let objectSubType = "";

  switch (item.type) {
    case "Vehicle":
      objectType = item.sub_type.split("_")[1];
      break;
    case "GroundVehicle":
      objectType = item.sub_type.split("_")[1].split("V").join(" V");
      break;
    case "Char_Clothing_Feet":
      objectType = "Pieds";
      break;
    case "Char_Clothing_Hands":
      objectType = "Mains";
      break;
    case "Char_Clothing_Hat":
      objectType = "Chapeau";
      break;
    case "Char_Clothing_Legs":
      objectType = "Pantalons";
      break;
    case "Char_Clothing_Torso_0":
      objectType = "Shirt";
      break;
    case "Char_Clothing_Torso_1":
      objectType = "Vestes / Manteaux";
      break;
    case "Drink":
      objectType = "Boisson";
      break;
    case "Char_Armor_Arms":
      objectType = "Brassières";
      break;
    case "Char_Armor_Backpack":
      objectType = "Sac à dos";
      break;
    case "Char_Armor_Helmet":
      objectType = "Casque";
      break;
    case "Char_Armor_Legs":
      objectType = "Jambières";
      break;
    case "Char_Armor_Torso":
      objectType = "Plastron";
      break;
    case "Char_Armor_Undersuit":
      objectType = "Combinaison";
      break;
    case "Food":
      objectType = "Nourriture";
      break;
    case "FPS_Consumable":
      objectType = "Consommable";
      break;
    case "WeaponAttachment":
      objectType = "Accessoire armement";
      break;
    case "WeaponPersonal":
      objectType = "Arme Personnelles";
      break;
    case "WeaponGun":
      objectType = "Arme Véhicule";
      break;
    case "Turret":
      objectType = "Tourelle";
      break;
    case "Missile":
      objectType = "Missile";
      break;
    case "MissileLauncher":
      objectType = "Lance Missiles";
      break;
    case "Cooler":
      objectType = "Refroidisseur";
      break;
    case "WeaponMining":
      objectType = "Laser de minage";
      break;
    case "MiningModifier":
      objectType = "Module de minage";
      break;
    case "PowerPlant":
      objectType = "Générateur";
      break;
    case "Paints":
      objectType = "Peinture";
      break;
    case "QuantumDrive":
      objectType = "Moteur de quantum";
      break;
    case "Shield":
      objectType = "Bouclier";
      break;
    case "ExternalFuelTank":
      objectType = "Réservoir à carburant";
      break;
    case "Gadget":
      objectType = "Gadget";
      break;
    case "DockingCollar":
      objectType = "Collier d'amarrage";
      break;
    case "Container":
      objectType = "Container";
      break;
    case "Scrap":
      objectType = "Recyclage";
      break;
    case "Waste":
      objectType = "Déchets";
      break;
    case "Mineral":
      objectType = "Minerais";
      break;
    case "Metal":
      objectType = "Métal";
      break;
    default:
  }

  switch (item.sub_type) {
    case "UNDEFINED":
      objectSubType = "";
      break;
    case "Small":
      objectSubType = "Equipement Léger";
      break;
    case "Medium":
      objectSubType = "Equipement moyen";
      break;
    case "Heavy":
      objectSubType = "Equipement Lourd";
      break;
    case "Grenade":
      objectSubType = "Grenade";
      break;
    case "Magazine":
      objectSubType = "Chargeur";
      break;
    case "Bottle":
      objectSubType = "Bouteille";
      break;
    case "Bar":
      objectSubType = "Barre";
      break;
    case "Hacking":
      objectSubType = "Piratage";
      break;
    case "Gadget":
      objectSubType = "Gadget";
      break;
    case "Knife":
      objectSubType = "Couteau";
      break;
    case "BottomAttachment":
      objectSubType = "Sous le canon";
      break;
    case "IronSight":
      objectSubType = "Viseur";
      break;
    case "OxygenCap":
      objectSubType = "Oxygène";
      break;
    case "MedPack":
      objectSubType = "MedPack";
      break;
    case "Utility":
      objectSubType = "Utilitaire";
      break;
    case "Gun":
      objectSubType = "Arme";
      break;
    case "BallTurret":
      objectSubType = "Support Balle de Tourelle ";
      break;
    case "CanardTurret":
      objectSubType = "Support Avant de Tourelle ";
      break;
    case "Barrel":
      objectSubType = "Embout Canon ";
      break;
    case "NoseMounted":
      objectSubType = "Support Nasal de tourelle ";
      break;
    case "Missile":
      objectSubType = "Missile";
      break;
    case "Torpedo":
      objectSubType = "Torpille";
      break;
    case "GunTurret":
      objectSubType = "Point de montage";
      break;
    case "MissileRack":
      objectSubType = "Rack à missiles";
      break;

    default:
  }

  return (
    <div className="encyclopedia-shop-item-page-card-body">
      <div className="encyclopedia-shop-item-card-header">
        <h2 className="shop-item-name">{item.name}</h2>
        <h4 className="shop-item-type">Catégorie: {objectType}</h4>
        {objectSubType !== "" ? (
          <h4 className="shop-item-type">Sous-catégorie: {objectSubType}</h4>
        ) : (
          ""
        )}

        {shopName && shopName?.includes("Rental") === true ? (
          <div className="commercial-rental-details-container">
            <span className="shop-item-detail">
              <h5>Pour 1j:</h5>
              <span className="rental-price">
                <h4 className="yes-rental">
                  {item?.rental_price_days[1] &&
                    item?.rental_price_days[1]?.toLocaleString("fr-FR")}
                </h4>
                aUEC
              </span>
            </span>
            <span className="shop-item-detail">
              <h5>Pour 3j:</h5>
              <span className="rental-price">
                <h4 className="yes-rental">
                  {item.rental_price_days[3] &&
                    item.rental_price_days[3]?.toLocaleString("fr-FR")}
                </h4>
                aUEC
              </span>
            </span>
            <span className="shop-item-detail">
              <h5>Pour 7j:</h5>
              <span className="rental-price">
                <h4 className="yes-rental">
                  {item?.rental_price_days[7] &&
                    item?.rental_price_days[7]?.toLocaleString("fr-FR")}
                </h4>
                aUEC
              </span>
            </span>
            <span className="shop-item-detail">
              <h5>Pour 30j:</h5>
              <span className="rental-price">
                <h4 className="yes-rental">
                  {item?.rental_price_days[30] &&
                    item?.rental_price_days[30]?.toLocaleString("fr-FR")}
                </h4>
                aUEC
              </span>
            </span>
          </div>
        ) : (
          <div className="commercial-details-container">
            <span className="shop-item-detail">
              <h5>Achetable</h5>
              {item.buyable === true ? (
                <span className="yes"></span>
              ) : (
                <span className="no"></span>
              )}
            </span>
            <span className="shop-item-detail">
              <h5>Vendable</h5>
              {item.sellable === true ? (
                <span className="yes"></span>
              ) : (
                <span className="no"></span>
              )}
            </span>
          </div>
        )}
      </div>

      {shopName && shopName?.includes("Rental") === true ? (
        ""
      ) : (
        <div className="encyclopedia-shop-item-card-header">
          {item?.price_range?.min === item?.price_range?.max ? (
            <>
              <div className="commercial-details-container">
                <span className="shop-item-detail">
                  <h5>prix:</h5>
                  {
                    <h4>
                      {(
                        Math.round(item?.base_price * 100) / 100
                      ).toLocaleString("fr-FR")}{" "}
                      aUEC
                    </h4>
                  }
                </span>
              </div>
            </>
          ) : (
            <>
              <h2 className="shop-item-name">Fourchette de prix</h2>
              <div className="commercial-details-container">
                <span className="shop-item-detail">
                  <h5>min:</h5>
                  {
                    <h4>
                      {(
                        Math.round(item?.price_range?.min * 100) / 100
                      ).toLocaleString("fr-FR")}{" "}
                      aUEC
                    </h4>
                  }
                </span>
                <span className="shop-item-detail">
                  <h5>max:</h5>
                  {
                    <h4>
                      {(
                        Math.round(item?.price_range?.max * 100) / 100
                      ).toLocaleString("fr-FR")}{" "}
                      aUEC
                    </h4>
                  }
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EncyclopediaShopItemsPageCard;
