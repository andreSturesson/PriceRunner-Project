import SearchBox from "../Components/Products/SearchBox";
import { Title, Container, Overlay, Button } from "@mantine/core";
import classes from "./MainPage.module.css";
import TopNavigation from "../Components/TopNavigation";
import SideBar from "../Components/SideBar";

function MainPage() {
  return (
    <>
      <SideBar />
      <TopNavigation />
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />
        <div className={classes.inner}>
          <Title className={classes.title}>Wishlist Wizard</Title>
          <Container size={640}>
            <SearchBox />
          </Container>
          <div className={classes.controls}>
            <Button className={classes.control} variant="white" size="lg">
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
