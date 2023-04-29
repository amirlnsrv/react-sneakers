import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img src="./img/logo.png" alt="" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="./img/cart.svg" alt="Cart" />
          <span>{totalPrice} сом</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favourites" exact>
            <img width={18} height={18} src="./img/heart.svg" alt="Features" />
          </Link>
        </li>
        <li>
          <Link to="/orders" exact>
            <img width={18} height={18} src="./img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
