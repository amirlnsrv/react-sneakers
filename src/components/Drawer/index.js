import React, { useState } from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, sneakers = [], onRemove, opened }) => {
  const { cartSneakers, setCartSneakers, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://react-sneakers-db.onrender.com/orders",
        {
          sneakers: cartSneakers,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartSneakers([]);

      for (let i = 0; i < cartSneakers.length; i++) {
        const sneaker = cartSneakers[i];
        await axios.delete(
          `https://react-sneakers-db.onrender.com/cart/${sneaker.id}`
        );
        delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа =(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="./img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {sneakers.length ? (
          <>
            <div className={styles.items}>
              {sneakers.map((sneaker) => (
                <div
                  key={sneaker.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${sneaker.img})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{sneaker.name}</p>
                    <b>{sneaker.price} руб.</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="./img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemove(sneaker.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} сом</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{totalPrice * 0.05} сом</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="./img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "./img/complete-order.jpg"
                : "./img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
