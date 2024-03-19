import ProductList from "../Components/Products/ProductList";
import { Container } from "@mantine/core";
import ProductFilter from "../Components/Products/ProductFilter";
import SearchBox from "../Components/Products/SearchBox";
function ProductsPage() {
  return (
    <Container>
      <h1>Products</h1>
      <SearchBox />
      <ProductFilter />
      <ProductList />
    </Container>
  );
}

export default ProductsPage;
