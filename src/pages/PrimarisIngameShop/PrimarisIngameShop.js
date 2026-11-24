import React, {useEffect} from "react";
import NavBar from "../../components/Navbar/NavBar";

import PrimarisIngameShopSearchBar from "../../components/PrimarisIngameShop/PrimarisIngameShopSearchBar";
import PrimarisIngameShopProductsListContainer from "../../components/PrimarisIngameShop/PrimarisIngameShopProductsListContainer";
import PrimarisIngameShopNewProductBtn from "../../components/PrimarisIngameShop/PrimarisIngameShopNewProductBtn";
import PrimarisIngameShopNewProductForm from "../../components/PrimarisIngameShop/PrimarisIngameShopNewProductForm";
import {useDispatch, useSelector} from "react-redux";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../utils/firebase.config";
import {getAllProducts} from "../../feature/primarisIngameShop.slice";

const PrimarisIngameShop = () => {
  const dispatch = useDispatch();
  const isAddingANewProduct = useSelector(
    (state) => state.primarisIngameShop.isAddingANewProduct
  );

  useEffect(() => {
    onSnapshot(collection(db, "primarisIngameShop"), (snapshot) => {
      let primarisIngameShopData = [];
      snapshot.docs.forEach((doc) => {
        primarisIngameShopData.push({...doc.data(), id: doc.id});
      });
      dispatch(getAllProducts(primarisIngameShopData));
    });
  }, []);

  return (
    <div className="primaris-ingame-shop-body">
      <NavBar
        factionPart={"primarisIngameShop"}
        pageActive={"primarisIngameShop"}
      />
      <div className="primaris-ingame-shop-title-container">
        <h2>Boutiques Primaris</h2>
      </div>
      <div className="primaris-ingame-shop-main-container">
        <PrimarisIngameShopNewProductBtn />
        <PrimarisIngameShopSearchBar />
        <div
          className={
            isAddingANewProduct === false
              ? "primaris-ingame-shop-form-and-list-container"
              : "primaris-ingame-shop-form-and-list-container slide-left"
          }
        >
          <PrimarisIngameShopProductsListContainer />
          <PrimarisIngameShopNewProductForm />
        </div>
      </div>
    </div>
  );
};

export default PrimarisIngameShop;
