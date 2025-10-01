import React from "react";
import { Product } from "../models/product";
import OneProduct from "./OneProduct";

interface CartProps {
  allproducts: Product[];
  onAdd: (id: number) => void;
  onRemove?: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ allproducts, onAdd, onRemove }) => {
  return (
    <div className="cart-container">
      <h3>Ovo je vasa korpa.</h3>
      {allproducts.length === 0
        ? "Nema proizvoda u vasoj korpi"
        : allproducts.map((product) => (
            <OneProduct
              key={product.id}
              product={product}
              onAdd={() => onAdd(product.id)}
              onRemove={onRemove ? (id) => onRemove(id) : undefined}
              inCart={product.amount}
            />
          ))}
    </div>
  );
};

export default Cart;
