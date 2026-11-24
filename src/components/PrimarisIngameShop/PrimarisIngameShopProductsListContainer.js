import React from "react";
import {useSelector} from "react-redux";
import PrimarisIngameShopProductCard from "./PrimarisIngameShopProductCard";

const PrimarisIngameShopProductsListContainer = () => {
  const productsList = useSelector(
    (state) => state.primarisIngameShop.products
  );
  const productsSearchResult = useSelector(
    (state) => state.primarisIngameShop.productsSearchResult
  );
  return (
    <>
      {productsSearchResult && productsSearchResult[0] ? (
        <div className="primaris-ingame-shop-products-list-container-body">
          {productsSearchResult &&
            [...productsSearchResult]
              .sort((a, b) => b.announcementCreatedAt - a.announcementCreatedAt)
              .map((product) => (
                <PrimarisIngameShopProductCard
                  product={product}
                  key={product.id}
                />
              ))}
        </div>
      ) : (
        <div
          className={
            productsList && productsList[0]
              ? "primaris-ingame-shop-products-list-container-body"
              : "primaris-ingame-shop-products-list-container-body hidden"
          }
        >
          {productsList &&
            [...productsList]
              .sort((a, b) => b.announcementCreatedAt - a.announcementCreatedAt)
              .map((product) => (
                <PrimarisIngameShopProductCard
                  product={product}
                  key={product.id}
                />
              ))}
        </div>
      )}
    </>
  );
};

export default PrimarisIngameShopProductsListContainer;
