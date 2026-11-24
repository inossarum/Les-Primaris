import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setProductsSearchResult} from "../../feature/primarisIngameShop.slice";

const PrimarisIngameShopSearchBar = () => {
  const dispatch = useDispatch();
  const productsSearchResultList = useSelector(
    (state) => state.primarisIngameShop.productsSearchResult
  );
  const productsList = useSelector(
    (state) => state.primarisIngameShop.products
  );
  const searchKeyWord = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const handleProductSearch = (e) => {
    e.preventDefault();

    const searchResult =
      productsList &&
      [...productsList].filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchKeyWord.current.value.toLowerCase()) === true
      );

    if (searchResult && searchResult[0]) {
      dispatch(setProductsSearchResult(searchResult));
      searchKeyWord.current.value = "";
    } else if (searchKeyWord.current.value === "") {
      setErrorMessage("Veuillez entrer un mot clé !");
      setTimeout(() => setErrorMessage(""), 5000);
      dispatch(setProductsSearchResult([]));
    } else {
      setErrorMessage("Aucun produit trouvé avec ce mot clé !");
      setTimeout(() => setErrorMessage(""), 5000);
      dispatch(setProductsSearchResult([]));
    }
  };

  return (
    <div className="primaris-ingame-shop-search-bar-body ">
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          ref={searchKeyWord}
          autoFocus
          className="info-green"
        ></input>
        <span
          className="primaris-ingame-shop-new-product-form-button-blue"
          onClick={(e) => handleProductSearch(e)}
        >
          rechercher
        </span>
        {productsSearchResultList && productsSearchResultList[0] ? (
          <span
            className="primaris-ingame-shop-new-product-form-button-blue"
            onClick={() => dispatch(setProductsSearchResult([]))}
          >
            Liste de base
          </span>
        ) : (
          ""
        )}
      </div>
      {errorMessage !== "" ? (
        <span className="info-red-uppercase">{errorMessage}</span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default PrimarisIngameShopSearchBar;
