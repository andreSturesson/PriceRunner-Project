import {
  Box,
  Button,
  Card,
  ScrollArea,
  Stack,
  Text,
  Image,
  Center,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getWishList, deleteFromWishList } from "../Helpers/APIManager";
import { wishlistAtom } from "../State/wishlist.state";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
function WishList() {
  const [wishList, setWishList] = useAtom(wishlistAtom);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistItems = await getWishList();
        if (wishlistItems) {
          setWishList(wishlistItems.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, [setWishList]);

  function handleDelete(productId) {
    const tempList = wishList.filter((item) => item.id !== productId);
    setWishList(tempList);

    try {
      console.log(productId);
      deleteFromWishList(productId);
    } catch (error) {
      console.log("this", error);
    }
  }

  return (
    <Box>
      <Text>
        <Center>Wish List</Center>
      </Text>
      <ScrollArea h={380} type="scroll" scrollbarSize={5}>
        {wishList.length > 0 ? (
          wishList.map((item) => (
            <Card padding="sm" key={item.id} withBorder>
              <Image src={item.imageUrl} alt="No way!" radius="lg" />
              <Stack
                align="flex-start"
                justify="flex-start"
                className="itemNames"
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/product/${item.id}`}
                >
                  {item.title}
                </Link>
                <Text>Price: ${item.price.toFixed(2)}</Text>
                <Button
                  size="compact-xs"
                  variant="default"
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </Button>
              </Stack>
            </Card>
          ))
        ) : (
          <Text>Your wishlist seems to be empty</Text>
        )}
      </ScrollArea>
    </Box>
  );
}

export default WishList;
