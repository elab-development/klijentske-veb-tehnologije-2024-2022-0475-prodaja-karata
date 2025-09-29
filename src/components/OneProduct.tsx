import React from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import { Product } from "../models/product";
import { useLocation } from "react-router-dom";

interface OneProductProps {
  product: Product;
  onAdd: (id: number) => void;
  onRemove?: (id: number) => void;
  inCart: number;
}

const OneProduct: React.FC<OneProductProps> = ({
  product,
  onAdd,
  onRemove,
  inCart,
}) => {
  const design = { margin: 10, borderStyle: "dashed" };
  const location = useLocation();

  return (
    <div className={inCart === 1 ? "card" : "card-cart"} style={design}>
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description}</p>

        {location.pathname === "/cart" || inCart > 1 ? (
          <h3>Amount: {inCart}</h3>
        ) : (
          <>
            <a className="btn" onClick={() => onAdd(product.id)}>
              <ImPlus />
            </a>
            {onRemove && (
              <a className="btn" onClick={() => onRemove(product.id)}>
                <ImMinus />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OneProduct;
