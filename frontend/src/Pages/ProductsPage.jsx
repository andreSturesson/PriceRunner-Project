import ProductList from "../Components/Products/ProductList";
import { Center, Container } from "@mantine/core";
import ProductFilter from "../Components/Products/ProductFilter";
import SearchBox from "../Components/Products/SearchBox";
import ProductSort from "../Components/Products/ProductSort";
function ProductsPage() {
  return (
    <Container>
      <h1>Products</h1>
      <SearchBox />
      <ProductFilter />
      <Center>
        <ProductSort />
      </Center>
      <ProductList />
    </Container>
  );
}

export default ProductsPage;
