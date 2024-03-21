import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { AppShell, Box, Button, Card } from "@mantine/core";
import WishList from "./WishList";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../State/auth.state";

function SideBar() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  //const isLoggedIn = true; //get this from login condition

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
    } else {
      document.getElementById("colapsableSidebar").style.width = "90px";
      isCollapsed = true;
    }
  }

  return (
    <AppShell.Navbar className="leftBox">
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
          <Card className="whishlistTest">
            <WishList />
          </Card>
        )}
      </Box>
    </AppShell.Navbar>
  );
}

export default SideBar;
