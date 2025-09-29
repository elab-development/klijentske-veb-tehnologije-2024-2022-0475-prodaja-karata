import React from "react";
import OneProduct from "./OneProduct";
import { Product } from "../models/product";

interface ProductsProps {
  products: Product[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

const Products: React.FC<ProductsProps> = ({ products, onAdd, onRemove }) => {
  return (
    <div className="bg-light-blue-custom py-24 w-full flex flex-col gap-10">
      {/* Naslov */}
      <div className="products-container-title">
        <h2 className="products-title font-sans uppercase text-4xl font-extrabold text-blue-800 tracking-wider">
          AKTUELNA PONUDA
        </h2>
      </div>

      {/* Proizvodi */}
      <div className="all-products">
        {products.map((product) => (
          <OneProduct
            key={product.id}
            product={product}
            onAdd={() => onAdd(product.id)}
            onRemove={() => onRemove(product.id)}
            inCart={1}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
