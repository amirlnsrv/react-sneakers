import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

const Card = ({
  id,
  onFavourite,
  name,
  img,
  price,
  onPlus,
  favourited = false,
  loading = false,
}) => {
  const { isSneakerAdded } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);
  const obj = { id, parentId: id, name, img, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavourite = () => {
    onFavourite(obj);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="174" rx="5" ry="5" width="155" height="20" />
          <rect x="0" y="202" rx="5" ry="5" width="100" height="20" />
          <rect x="0" y="235" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="232" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavourite && (
            <div className={styles.favourite} onClick={onClickFavourite}>
              <img
                src={isFavourite ? "img/liked.svg" : "img/unliked.svg"}
                alt="Unliked"
              />
            </div>
          )}
          <img width="100%" height={135} src={img} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} сом</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isSneakerAdded(id)
                    ? "img/btn-checked.svg"
                    : "img/btn-plus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
