import React, { useState } from "react";
import OneProduct from "./OneProduct";
import { Product } from "../models/product";

interface ProductsProps {
  products: Product[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

const Products: React.FC<ProductsProps> = ({ products, onAdd, onRemove }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  return (
    <div className="bg-light-blue-custom py-24 w-full flex flex-col gap-10">
      <div className="products-container-title">
        <h2 className="products-title font-sans uppercase text-4xl font-extrabold text-blue-800 tracking-wider">
          AKTUELNA PONUDA
        </h2>
      </div>

      {/* Proizvodi */}
      <div className="all-products">
        {currentProducts.map((product) => (
          <OneProduct
            key={product.id}
            product={product}
            onAdd={() => onAdd(product.id)}
            onRemove={() => onRemove(product.id)}
            inCart={1}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &laquo; Prethodna
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Sledeća &raquo;
        </button>
      </div>
    </div>
  );
};

export default Products;
