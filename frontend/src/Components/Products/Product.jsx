import { Card, Center, Image, Space, Text } from "@mantine/core";
import PropTypes from "prop-types";

function Product({ product }) {
  console.log(product);
  return (
    <>
      <Card shadow="sm" padding="xl" component="a" target="_blank" withBorder>
        <Card.Section>
          <Center>
            <Image src={product.imageUrl} h={400} w={350} alt="No way!" />
          </Center>
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href={product.productUrl}
            target="_blank"
          >
            {product.title}
          </a>
        </Text>

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
