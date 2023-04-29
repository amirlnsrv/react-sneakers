import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Card from "../components/Card";
import AppContext from "../context";

const Orders = () => {
  const { onAddToFavourite, onAddToCart } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://react-sneakers-db.onrender.com/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.sneakers], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="content p-40 ">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((sneaker, index) => {
          return <Card key={index} loading={isLoading} {...sneaker} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
