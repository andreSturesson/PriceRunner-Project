import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { AppShell, Box, Button } from "@mantine/core";

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
      document.getElementById("colapsableSidebar").style.width = "90px";
      isCollapsed = true;
      console.log("reduceing");
    }
  }

  return (
    <AppShell.Navbar>
      <Box id="colapsableSidebar" className="sideBar">
        <Box className="leftBox">
          <Button
            variant="default"
            justify="center"
            fullWidth
            size="compact-md"
            onClick={goToMainPage}
          >
            Home
          </Button>
          <Button
            variant="default"
            justify="center"
            fullWidth
            size="compact-md"
            onClick={navigateToProducts}
          >
            Products
          </Button>
          {isLoggedIn && (
            <Button
              variant="default"
              justify="center"
              fullWidth
              size="compact-md"
              onClick={toggleSidebar}
            >
              Wish List
            </Button>
          )}
        </Box>
        {isLoggedIn && (
          <Box className="whishlistTest">wishlist will go here</Box>
        )}
      </Box>
    </AppShell.Navbar>
  );
}

export default SideBar;
