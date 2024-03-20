import "./App.css";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import ErrorPage from "./Pages/ErrorPage";
import TopNavigation from "./Components/TopNavigation";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import SideBar from "./Components/SideBar";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Profile from "./Components/Profile";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 120,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <TopNavigation />
        <AppShell.Main>
          <SideBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AppShell.Main>
        <Footer />
      </AppShell>
    </>
  );
}

export default App;
