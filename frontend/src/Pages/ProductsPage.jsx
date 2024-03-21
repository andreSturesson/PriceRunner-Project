import ProductList from "../Components/Products/ProductList";
import { Center, Container, Space, Title } from "@mantine/core";
import ProductFilter from "../Components/Products/ProductFilter";
import SearchBox from "../Components/Products/SearchBox";
import ProductSort from "../Components/Products/ProductSort";
function ProductsPage() {
  return (
    <>
      <Title ta="center">Products</Title>
      <Space h="lg" />
      <Container>
        <SearchBox />
        <ProductFilter />
        <Center>
          <ProductSort />
        </Center>
        <Space h="lg" />
        <ProductList />
      </Container>
    </>
  );
}

export default ProductsPage;
