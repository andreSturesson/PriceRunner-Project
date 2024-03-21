import PropTypes from "prop-types";
import { Card, Text, Image, Group, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
export default function ProductListView({ product }) {
  return (
    <>
      <Card>
        <Group h="100%">
          <Image src={product.imageUrl} h="auto" w={100} alt="No way!" />
          <Stack>
            <Text>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/product/${product.id}`}
              >
                {product.title}
              </Link>
            </Text>
            <Text size="sm">Price: ${product.price.toFixed(2)}</Text>
            <Text size="sm">
              Stars: {Array(parseInt(product.stars)).fill("⭐️").join("")}
            </Text>
            <Text size="xs" c="dimmed">
              Category: {product.category.name}
            </Text>
          </Stack>
        </Group>
      </Card>
    </>
  );
}

ProductListView.propTypes = {
  product: PropTypes.object.isRequired,
};
