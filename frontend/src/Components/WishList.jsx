import { Box, Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { getWishList, deleteFromWishList } from "../Helpers/APIManager";

function WishList() {
  const [wishList, setWishList] = useState([]);
  // hämtar från API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistItems = await getWishList();
        console.log(wishlistItems);
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
    try {
      deleteFromWishList(productId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      <h2>Wish List</h2>
      {wishList.map((item) => (
        <Box key={item.id}>
          <Stack>
            Item: {item.title}
            Price: {item.price}
            Category: {item.category.name}
            <Button size="compact-xs" onClick={() => handleDelete()}>
              remove
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

export default WishList;
