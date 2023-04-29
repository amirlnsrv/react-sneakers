import React, { useContext } from "react";

import Card from "../components/Card";
import AppContext from "../context";

const Favourites = () => {
  const { favourites, onAddToFavourite } = useContext(AppContext);

  return (
    <div className="content p-40 ">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Список желаемого</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favourites.map((sneaker, index) => {
          return (
            <Card
              key={index}
              favourited={true}
              onFavourite={onAddToFavourite}
              {...sneaker}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;
