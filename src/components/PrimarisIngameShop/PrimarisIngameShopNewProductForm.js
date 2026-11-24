import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsAddingANewProduct} from "../../feature/primarisIngameShop.slice";
import {addDoc, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/firebase.config";

const PrimarisIngameShopNewProductForm = () => {
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const newProductCategory = useRef();
  const newProductSubCategory = useRef();
  const newProductName = useRef();
  const newProductSellingPrice = useRef();
  const newProductQuantity = useRef();
  const newProductLocation = useRef();
  const newProductDeliveryAvailability = useRef();
  const newProductDescription = useRef();

  const handleAddNewProductToDataBase = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const name = newProductName.current?.value.trim() || "";
    const category = newProductCategory.current?.value || "";
    const subCategory = newProductSubCategory.current?.value || "";
    const price = Number(newProductSellingPrice.current?.value);
    const quantity = Number(newProductQuantity.current?.value);
    const location = newProductLocation.current?.value.trim() || "";
    const deliveryAvailable = newProductDeliveryAvailability.current?.value || "";

    if (!currentUser?.userId) {
      setFormError("Connectez-vous pour publier une annonce.");
      return;
    }
    if (!name || !category || !subCategory || !location || !deliveryAvailable ||
        !Number.isFinite(price) || price < 0 ||
        !Number.isInteger(quantity) || quantity < 1) {
      setFormError("Vérifiez les champs requis, le prix et la quantité.");
      return;
    }

    setIsSaving(true);
    setFormError("");
    const createdAt = Date.now();
    const notificationId = `${createdAt}-${Math.random().toString(36).slice(2)}`;
    const productDatas = {
      announcementCreatorName: currentUser.currentUser || "",
      announcementCreatorId: currentUser.userId,
      announcementCreatedAt: createdAt,
      productName: name,
      productCategory: category,
      productSubCategory: subCategory,
      productSellingPrice: price,
      productQuantity: quantity,
      productLocation: location,
      deliveryAvailable,
      productDescription: newProductDescription.current?.value.trim() || "",
      messages: [],
      notificationId,
    };
    const notificationDatas = {
      type: "nouvelle annonce de vente",
      associatedAnnouncement: notificationId,
      createdAt,
      announcementCreatorName: productDatas.announcementCreatorName,
      announcementCreatorId: productDatas.announcementCreatorId,
      productSubCategory: subCategory,
      productQuantity: quantity,
      productName: name,
    };

    try {
      await addDoc(collection(db, "primarisIngameShop"), productDatas);
      const notificationResults = await Promise.allSettled(
        (users || [])
          .filter((user) => user?.id && user.id !== currentUser.userId)
          .map((user) =>
            updateDoc(doc(db, "users", user.id), {
              notifications: arrayUnion(notificationDatas),
            })
          )
      );

      dispatch(setIsAddingANewProduct(false));
      if (notificationResults.some((result) => result.status === "rejected")) {
        setFormError("Annonce enregistrée, mais certaines notifications n’ont pas pu être envoyées.");
      }
      [
        newProductCategory,
        newProductSubCategory,
        newProductName,
        newProductSellingPrice,
        newProductQuantity,
        newProductLocation,
        newProductDeliveryAvailability,
        newProductDescription,
      ].forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });
      setCategorySelected("");
    } catch (error) {
      console.error("Impossible d’enregistrer l’annonce :", error);
      setFormError("L’annonce n’a pas pu être enregistrée. Réessayez.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="primaris-ingame-shop-new-product-form-body">
      <form className="primaris-ingame-shop-new-product-form-main-container" onSubmit={handleAddNewProductToDataBase}>
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
        {formError && <p role="alert">{formError}</p>}
        <div className="primaris-ingame-shop-new-product-form-buttons-container">
          <button
            className="primaris-ingame-shop-new-product-form-button-green"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Enregistrement…" : "Valider"}
          </button>
          <button
            className="primaris-ingame-shop-new-product-form-button-red"
            type="button"
            onClick={() => dispatch(setIsAddingANewProduct(false))}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrimarisIngameShopNewProductForm;
