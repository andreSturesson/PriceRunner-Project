import "./SideBar.css";
//import { Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { AppShell, Avatar, Drawer, Group } from "@mantine/core";

//import useAtom from "jotai";

function SideBar() {
  const isLoggedIn = true; //get this from login condition

  let isCollapsed = true;
  const navigate = useNavigate();

  function goToMainPage() {
    navigate("/");
  }

  function navigateToProducts() {
    navigate("/products");
  }

  function toggleSidebar() {
    if (isCollapsed) {
      document.getElementById("colapsableSidebar").style.width = "350px";
      isCollapsed = false;
      console.log("expanding");
    } else {
      document.getElementById("colapsableSidebar").style.width = "100px";
      isCollapsed = true;
      console.log("reduceing");
    }
  }

  return (
    <AppShell.Navbar>
      <div id="colapsableSidebar" className="sideBar">
        <div className="leftDiv">
          <button className="sidebar-button" onClick={goToMainPage}>
            Home
          </button>
          <button className="sidebar-button" onClick={navigateToProducts}>
            Products
          </button>
          {isLoggedIn && (
            <button className="sidebar-button" onClick={toggleSidebar}>
              wishList
            </button>
          )}
        </div>

        {isLoggedIn && (
          <div className="whishlistTest">wishlist will go here</div>
        )}
      </div>
    </AppShell.Navbar>
  );
}

export default SideBar;
