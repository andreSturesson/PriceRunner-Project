import { Card, Center, Image, Space, Text } from "@mantine/core";
import PropTypes from "prop-types";

function Product({ product }) {
  return (
    <>
      <Card
        shadow="sm"
        padding="xl"
        component="a"
        href={product.productUrl}
        target="_blank"
        withBorder
      >
        <Card.Section>
          <Center>
            <Image src={product.imageUrl} h={400} w={350} alt="No way!" />
          </Center>
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          {product.title}
        </Text>

        <Text size="sm">Price: ${product.price.toFixed(2)}</Text>
      </Card>
      <Space h="md" mt="xl" />
    </>
  );
}

export default Product;

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
