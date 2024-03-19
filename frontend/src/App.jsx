import "./App.css";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import ErrorPage from "./Pages/ErrorPage";
import TopNavigation from "./Components/TopNavigation";
import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <>
      <SideBar />
      {/*<MainPage />*/}
      <TopNavigation />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
