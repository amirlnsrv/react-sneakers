import React from "react";
import Card from "../components/Card";

const Home = ({
  sneakers,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavourite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = sneakers.filter((sneaker) =>
      sneaker.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((sneaker, index) => {
      return (
        <Card
          key={index}
          onFavourite={(obj) => onAddToFavourite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...sneaker}
        />
      );
    });
  };

  return (
    <div className="content p-40 ">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: «${searchValue}»` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap justify-center">{renderItems()}</div>
    </div>
  );
};

export default Home;
