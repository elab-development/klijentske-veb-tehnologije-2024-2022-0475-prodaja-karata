import React from "react";
import { Product } from "../models/product";
import OneProduct from "./OneProduct";

interface CartProps {
  allproducts: Product[];
  onAdd: (id: number) => void;
  onRemove?: (id: number) => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  allproducts,
  onAdd,
  onRemove,
  onClearCart,
}) => {
  const handleCheckout = () => {
    alert("Plaćanje još nije implementirano.");
  };

  return (
    <div className="cart-container">
      <h3>Ovo je vaša korpa.</h3>

      {allproducts.length === 0 ? (
        <p>Nema proizvoda u vašoj korpi</p>
      ) : (
        <>
          {allproducts.map((product) => (
            <OneProduct
              key={product.id}
              product={product}
              onAdd={() => onAdd(product.id)}
              onRemove={onRemove ? (id) => onRemove(id) : undefined}
              inCart={product.amount}
            />
          ))}

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={onClearCart} className="btn-clear">
              Isprazni korpu
            </button>

            <button onClick={handleCheckout} className="btn-checkout">
              Plaćanje
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
