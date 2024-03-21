import { Box, Button, ScrollArea, Stack } from "@mantine/core";
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
      <h2>Wish List</h2>
      <ScrollArea h={380} type="scroll" scrollbarSize={5}>
        {wishList.map((item) => (
          <Box key={item.id}>
            <Stack
              align="flex-start"
              justify="flex-start"
              className="itemNames"
            >
              Item: {item.title} <br />
              Price: {item.price} <br />
              Category: {item.category.name}
              <Button
                size="compact-xs"
                variant="default"
                onClick={() => handleDelete(item.id)}
              >
                remove
              </Button>
            </Stack>
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
}

export default WishList;
