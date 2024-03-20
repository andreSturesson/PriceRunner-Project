import { useProductsAtom } from "../../State/products.state";
import { SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";

function ProductSort() {
  const [products, setProducts] = useProductsAtom();
  const [sortingOrder, setSortingOrder] = useState("asc");

  useEffect(() => {
    // Whenever 'sorting' changes, resort the list of products accordingly and re-render
    // Default is 'ascending'-Id

    // Check which order is active
    if (sortingOrder === "asc") {
      // Then sort products
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
    } else if (sortingOrder === "desc") {
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
    } else if (sortingOrder === "ascP") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortingOrder === "descP") {
      products.sort((b, a) => a.price - b.price);
    }
    // Re-render list
    setProducts([...products]);
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
