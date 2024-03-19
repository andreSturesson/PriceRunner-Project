import SearchBox from "../Components/Products/SearchBox";
import { Title, Container, Overlay, Button } from "@mantine/core";
import classes from "./MainPage.module.css";

function MainPage() {
  return (
    <>
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
