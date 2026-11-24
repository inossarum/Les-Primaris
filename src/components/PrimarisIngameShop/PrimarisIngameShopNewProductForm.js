import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsAddingANewProduct} from "../../feature/primarisIngameShop.slice";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const PrimarisIngameShopNewProductForm = () => {
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState("");
  const newProductCategory = useRef();
  const newProductSubCategory = useRef();
  const newProductName = useRef();
  const newProductSellingPrice = useRef();
  const newProductQuantity = useRef();
  const newProductLocation = useRef();
  const newProductDeliveryAvailability = useRef();
  const newProductDescription = useRef();

  // useEffect(() => {

  // }, [

  // ])

  const handleAddNewProductToDataBase = async (e) => {
    e.preventDefault();
    const productDatas = {
      announcementCreatorName: currentUser.currentUser,
      announcementCreatorId: currentUser.userId,
      announcementCreatedAt: Date.now(),
      productName: newProductName.current.value,
      productCategory: newProductCategory.current.value,
      productSubCategory: newProductSubCategory.current.value,
      productSellingPrice: Number(newProductSellingPrice.current.value),
      productQuantity: Number(newProductQuantity.current.value),
      productLocation: newProductLocation.current.value,
      deliveryAvailable: newProductDeliveryAvailability.current.value,
      productDescription: newProductDescription.current.value,
      messages: [],
      notificationId: Math.random(Date.now()),
    };

    if (
      newProductName.current.value !== "" &&
      newProductCategory.current.value !== "" &&
      newProductSubCategory.current.value !== "" &&
      newProductSellingPrice.current.value !== "" &&
      newProductLocation.current.value !== "" &&
      newProductDeliveryAvailability.current.value !== ""
    ) {
      addDoc(collection(db, "primarisIngameShop"), productDatas);
      dispatch(setIsAddingANewProduct(false));

      const notificationDatas = {
        type: "nouvelle annonce de vente",
        associatedAnnouncement: productDatas.notificationId,
        createdAt: productDatas.announcementCreatedAt,
        announcementCreatorName: productDatas.announcementCreatorName,
        announcementCreatorId: productDatas.announcementCreatorId,
        productSubCategory: productDatas.productSubCategory,
        productQuantity: productDatas.productQuantity,
        productName: productDatas.productName,
      };

      users &&
        [...users]
          .filter((user) => user.id !== productDatas?.announcementCreatorId)
          .map((user) => {
            const userNotifications = user.notifications;
            updateDoc(doc(db, "users", user.id), {
              notifications: [...userNotifications, notificationDatas],
            });
          });

      newProductCategory.current.value = null;
      newProductSubCategory.current.value = null;
      newProductName.current.value = null;
      newProductSellingPrice.current.value = null;
      newProductQuantity.current.value = null;
      newProductLocation.current.value = null;
      newProductDeliveryAvailability.current.value = null;
      newProductDescription.current.value = null;
    } else {
      console.log("Veuillez remplir les champs");
    }
  };

  return (
    <div className="primaris-ingame-shop-new-product-form-body">
      <form className="primaris-ingame-shop-new-product-form-main-container">
        <span className="primaris-ingame-shop-new-product-form-title">
          {" "}
          Votre annonce
        </span>
        <div className="primaris-ingame-shop-new-product-form-informations-container">
          <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
            <label htmlFor="product-category">Catégorie du produit</label>
            <select
              id="product-category"
              type="text"
              ref={newProductCategory}
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              <option value="">Selectionner une catégorie...</option>
              <option value="equipement de vaisseau">
                Equipement de vaisseau
              </option>
              <option value="equipement individuel">
                Equipement individuel
              </option>
            </select>
          </div>
          {categorySelected?.includes("vaisseau") === true ? (
            <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
              <label htmlFor="product-ship-sub-category">
                Sous catégorie du produit
              </label>
              <select
                id="product-ship-sub-category"
                type="text"
                ref={newProductSubCategory}
              >
                <option value="">Selectionner une sous catégorie...</option>
                <option value="Shield">Shield</option>
                <option value="Cooler">Cooler</option>
                <option value="Power-plant">Power-plant</option>
                <option value="Radar">Radar</option>
                <option value="Quantum drive">Quantum drive</option>
                <option value="Paints">Paints</option>
                <option value="armement de vaisseau">
                  Armement de vaisseau
                </option>
                <option value="peinture de vaisseau">
                  Peinture de vaisseau
                </option>
              </select>
            </div>
          ) : (
            ""
          )}
          {categorySelected?.includes("individuel") === true ? (
            <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
              <label htmlFor="product-personnal-sub-category">
                Sous catégorie du produit
              </label>
              <select
                id="product-personnal-sub-category"
                type="text"
                ref={newProductSubCategory}
              >
                <option value="">Selectionner une sous catégorie</option>
                <option value="undersuit">Undersuit</option>
                <option value="armure">Armure</option>
                <option value="arme principale">Arme principale</option>
                <option value="arme secondaire">Arme secondaire</option>
                <option value="utilitaire">Utilitaire</option>
                <option value="nourriture">Nourriture</option>
              </select>
            </div>
          ) : (
            ""
          )}
          <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
            <label htmlFor="product-name">Nom du produit</label>
            <input
              id="product-name"
              type="text"
              placeholder="Entrez le nom du produit"
              ref={newProductName}
            />
          </div>
          <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
            <label htmlFor="product-price">Prix de vente</label>
            <input
              id="product-price"
              type="text"
              placeholder="Prix"
              ref={newProductSellingPrice}
            />{" "}
          </div>
          <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
            <label htmlFor="product-quantity">Quantités disponibles</label>
            <input
              id="product-quantity"
              type="text"
              placeholder="Quantité"
              ref={newProductQuantity}
            />{" "}
          </div>
          <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
            <label htmlFor="product-selling-location">Lieu de vente</label>
            <input
              id="product-selling-location"
              type="text"
              placeholder="Lieu de vente"
              ref={newProductLocation}
            />
          </div>
          <div className="primaris-ingame-shop-new-product-form-informations-sub-container">
            <label htmlFor="product-delivery-availability">
              Livraison possible
            </label>
            <select
              id="product-delivery-availability"
              ref={newProductDeliveryAvailability}
              onChange={() => console.log(newProductSubCategory.current.value)}
            >
              <option value="">Livraison</option>

              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>{" "}
          <div className="primaris-ingame-shop-new-product-form-informations-description-container">
            <span>Description</span>
            <textarea
              className="info-green"
              placeholder="Veuillez décrire votre produit..."
              ref={newProductDescription}
            ></textarea>
          </div>
        </div>
        <div className="primaris-ingame-shop-new-product-form-buttons-container">
          <span
            className="primaris-ingame-shop-new-product-form-button-green"
            onClick={(e) => handleAddNewProductToDataBase(e)}
          >
            Valider
          </span>
          <span
            className="primaris-ingame-shop-new-product-form-button-red"
            onClick={(e) => dispatch(setIsAddingANewProduct(false))}
          >
            Annuler
          </span>
        </div>
      </form>
    </div>
  );
};

export default PrimarisIngameShopNewProductForm;
