import {
  Card,
  Center,
  Group,
  Image,
  Space,
  Text,
  Rating,
  Container,
} from "@mantine/core";
import PropTypes from "prop-types";
import { isLoggedInAtom } from "../../State/auth.state";
import { useAtom } from "jotai";
function Product({ product }) {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  return (
    <>
      <Card shadow="sm" padding="xl" component="a" target="_blank" withBorder>
        <Card.Section>
          <Center>
            <Image src={product.imageUrl} h={400} w={350} alt="No way!" />
          </Center>
        </Card.Section>
        <Group>
          <Text fw={500} size="lg" mt="md">
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href={product.productUrl}
              target="_blank"
            >
              {product.title}
            </a>
          </Text>
          {isLoggedIn && (
            <Container mr={0}>
              <Rating defaultValue={2} />
            </Container>
          )}
        </Group>

        <Text size="sm">Price: ${product.price.toFixed(2)}</Text>

        <Text size="sm">
          Stars: {Array(parseInt(product.stars)).fill("⭐️").join("")}
        </Text>
        <Text size="xs" c="dimmed">
          {product.category.name}
        </Text>
      </Card>
      <Space h="md" mt="xl" />
    </>
  );
}

export default Product;

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
