import "./App.css";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>Hello World</div>
      {/*<MainPage />*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
