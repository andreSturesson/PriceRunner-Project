import SearchBox from "../Components/Products/SearchBox";
import { Title, Container, Overlay, Button } from "@mantine/core";
import classes from "./MainPage.module.css";
import { useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../State/auth.state";
function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };
  return (
    <>
      {isLoggedIn && (
        <div>
          <p>You are logged in as: {user.email}</p>
          <p>{user.firstName}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />
        <div className={classes.inner}>
          <Title className={classes.title}>Wishlist Wizard</Title>
          <Container size={640}>
            <SearchBox />
          </Container>
        </div>
      </div>
    </>
  );
}

export default MainPage;
