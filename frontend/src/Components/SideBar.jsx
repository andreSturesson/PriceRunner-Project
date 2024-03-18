import "./SideBar.css";
import { Group } from "@mantine/core";
function SideBar() {
  const isLoggedIn = true; //get this from login condition

  let isCollapsed = true;

  function toggleSidebar() {
    if (isCollapsed) {
      document.getElementById("colapsableSidebar").style.width = "350px";
      isCollapsed = false;
      console.log("expanding");
    } else {
      document.getElementById("colapsableSidebar").style.width = "85px";
      isCollapsed = true;
      console.log("reduceing");
    }
  }

  return (
    <div id="colapsableSidebar" className="sideBar">
      <Group gap="xs">
        <div>
          <button className="sidebar-button">Home</button>
          {isLoggedIn && (
            <button className="sidebar-button" onClick={toggleSidebar}>
              wishList
            </button>
          )}
        </div>
        {isLoggedIn && (
          <div className="whishlistTest">wishlist will go here</div>
        )}
      </Group>
    </div>
  );
}

export default SideBar;
