import {
  Card,
  Center,
  Group,
  Image,
  Space,
  Text,
  Rating,
  Container,
  Button,
} from "@mantine/core";
import PropTypes from "prop-types";
import { isLoggedInAtom } from "../../State/auth.state";
import { useAtom } from "jotai";
import { IoBagAddOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { addToWishList, getWishList } from "../../Helpers/APIManager";
import { useState } from "react";
import { wishlistAtom } from "../../State/wishlist.state";
import { Link } from "react-router-dom";

function Product({ product }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [wishList, setWishlist] = useAtom(wishlistAtom);

  async function addProduct() {
    setError(null);
    try {
      const ret = await addToWishList(product.id);
      const wish = await getWishList();
      setWishlist(wish.products);
      if (ret.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  }

  return (
    <>
      <Card shadow="xl" padding="xl">
        <Card.Section>
          <Center>
            <Image src={product.imageUrl} h={400} w={350} alt="No way!" />
          </Center>
        </Card.Section>
        <Group h="100%" justify="space-between">
          <Text fw={500} size="lg" mt="md">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/product/${product.id}`}
            >
              {product.title}
            </Link>
          </Text>
          {isLoggedIn && (
            <Group justify="flex-end">
              {success ? (
                <IoCheckmarkCircle />
              ) : (
                <Button variant="subtle" size="lg" onClick={addProduct}>
                  <IoBagAddOutline />
                </Button>
              )}
            </Group>
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
