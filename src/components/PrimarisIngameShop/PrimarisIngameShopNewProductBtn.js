import {AttachMoney} from "@mui/icons-material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsAddingANewProduct} from "../../feature/primarisIngameShop.slice";

const PrimarisIngameShopNewProductBtn = () => {
  const dispatch = useDispatch();
  const isAddingANewProduct = useSelector(
    (state) => state.primarisIngameShop.isAddingANewProduct
  );

  return (
    <div className="primaris-ingame-shop-new-product-body">
      {isAddingANewProduct === false ? (
        <span
          className="primaris-ingame-shop-new-product-button-green"
          onClick={() => dispatch(setIsAddingANewProduct(true))}
        >
          <AttachMoney /> <span>vendre un objet</span> <AttachMoney />
        </span>
      ) : (
        <div>Ajout en cours</div>
      )}
    </div>
  );
};

export default PrimarisIngameShopNewProductBtn;
