import { useProductsAtom } from "../../State/products.state";
import { SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";

function ProductSort() {
  const [products, setProducts] = useProductsAtom();
  const [sortingOrder, setSortingOrder] = useState("asc");

  useEffect(() => {
    // Whenever 'sorting' changes, resort the list of products accordingly and re-render
    // Check which order is active
    if (sortingOrder === "asc") {
      // Then sort products
      try {
        products.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error);
      }
    } else if (sortingOrder === "desc") {
      try {
        products.sort((b, a) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error);
      }
    } else if (sortingOrder === "ascP") {
      try {
        products.sort((a, b) => a.price - b.price);
      } catch (error) {
        console.log(error);
      }
    } else if (sortingOrder === "descP") {
      try {
        products.sort((b, a) => a.price - b.price);
      } catch (error) {
        console.log(error);
      }
    }
    // Re-render list
    try {
      setProducts([...products]);
    } catch (error) {
      console.log(error);
    }
  }, [sortingOrder]);

  return (
    <>
      <form>
        <SegmentedControl
          value={sortingOrder}
          onChange={setSortingOrder}
          size="xs"
          radius="md"
          transitionDuration={250}
          transitionTimingFunction="linear"
          data={[
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
            { label: "Price-Asc", value: "ascP" },
            { label: "Price-Des", value: "descP" },
          ]}
        />
      </form>
    </>
  );
}
export default ProductSort;
