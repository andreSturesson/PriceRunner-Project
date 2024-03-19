import { Text, Container } from "@mantine/core";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <>
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <Text size="xs" c="dimmed" className={classes.description}>
            Developed By André Sturesson, Marcus Palm & Victor Adamson.
          </Text>
        </Container>
        <Container className={classes.afterFooter}>
          <Text c="dimmed" size="sm">
            @Wishlist Wizard 2024 All rights reserved.
          </Text>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
