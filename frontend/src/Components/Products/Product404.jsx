import { Title, Text, Container } from "@mantine/core";
import classes from "./Product404.module.css";

function Product404() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>ERROR</div>
      <Title className={classes.title}>
        Something went wrong with your search.
      </Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, we can not find a product like that. You may have
        mistyped the name, or the product may simply not exist.
      </Text>
    </Container>
  );
}

export default Product404;
