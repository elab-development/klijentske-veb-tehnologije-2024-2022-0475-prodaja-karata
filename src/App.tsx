import "./App.css";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import { Product } from "./models/product";
import { useState, useEffect } from "react";
import axios from "axios";
import Cart from "./components/Cart";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Suspense } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Newsletter from "./components/Newsletter";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./components/Profile";
import Kontakt from "./components/Kontakt";
import EventDetails from "./components/EventDetails";

function App() {
  const [cartNum, setCartNum] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/productsData.json");
      const productsArray: Product[] = response.data.products.map(
        (product: any) =>
          new Product(
            product.id,
            product.name,
            product.description,
            product.amount,
            product.image
          )
      );

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const savedProducts = JSON.parse(savedCart);
        const mergedProducts = productsArray.map((p) => {
          const saved = savedProducts.find((sp: any) => sp.id === p.id);
          if (saved) {
            return new Product(
              p.id,
              p.name,
              p.description,
              saved.amount,
              p.image
            );
          }
          return p;
        });
        setProducts(mergedProducts);

        const totalAmount = mergedProducts.reduce(
          (acc, p) => acc + p.amount,
          0
        );
        setCartNum(totalAmount);
      } else {
        setProducts(productsArray);
      }
    };
    fetchData();
  }, []);

  const updateCartStorage = (updatedProducts: Product[]) => {
    const cartProducts = updatedProducts.filter((p) => p.amount > 0);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  };

  const addToCart = (id: number) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return new Product(
          product.id,
          product.name,
          product.description,
          product.amount + 1,
          product.image
        );
      }
      return product;
    });
    setProducts(newProducts);
    setCartNum(cartNum + 1);
    updateCartStorage(newProducts);
  };

  const removeFromCart = (id: number) => {
    const newProducts = products.map((product) => {
      if (product.id === id && product.amount > 0) {
        return new Product(
          product.id,
          product.name,
          product.description,
          product.amount - 1,
          product.image
        );
      }
      return product;
    });
    setProducts(newProducts);
    setCartNum(Math.max(cartNum - 1, 0));
    updateCartStorage(newProducts);
  };

  const getCartProducts = () => {
    return products.filter((p) => p.amount > 0);
  };

  const clearCart = () => {
    const newProducts = products.map(
      (p) => new Product(p.id, p.name, p.description, 0, p.image)
    );
    setProducts(newProducts);
    setCartNum(0);
    localStorage.removeItem("cart");
  };

  let router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<NavBar cartNum={cartNum} />}>
        <Route
          path="/"
          element={
            <Products
              products={products}
              onAdd={addToCart}
              onRemove={removeFromCart}
            />
          }
        />
        ,
        <Route
          path="cart"
          element={
            <Cart
              allproducts={getCartProducts()}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onClearCart={clearCart}
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="profile"
          element={<Profile cartProducts={getCartProducts()} />}
        />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="/event/:id" element={<EventDetails onAdd={addToCart} />} />
      </Route>,
    ])
  );

  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
        <Newsletter />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
