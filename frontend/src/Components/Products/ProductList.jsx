import { isLoggedInAtom } from "../../State/auth.state";
import { useState, useEffect } from "react";
import { getProducts } from "../../Helpers/APIManager";
import { Container, Group, Divider, Space, Button } from "@mantine/core";
import { useProductsAtom, useParametersAtom } from "../../State/products.state";
import { useAtom } from "jotai";
import Product404 from "./Product404";
import Product from "./Product";

//TODO Implement a better looking design.
function ProductList() {
  const [products, setProducts] = useProductsAtom();
  const [parameters, setParameters] = useParametersAtom();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [nextPageButton, setNextPageButton] = useState(false);
  const [previousPageButton, setPreviousPageButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts(parameters);
        if (products) {
          setProducts(products.data);
          setNextPageButton(false);
        } else {
          setNextPageButton(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [parameters, setProducts]);

  function goToNextPage() {
    setPreviousPageButton(false);
    if (nextPageButton) {
      return;
    }
    setParameters({ ...parameters, page: parameters.page + 1 });
  }

  function goToPreviousPage() {
    setNextPageButton(false);
    if (parameters.page <= 1) {
      setPreviousPageButton(true);
      return;
    }
    setParameters({ ...parameters, page: parameters.page - 1 });
  }
  return (
    <Container>
      {products ? (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <Product404 />
      )}
      <Divider />
      <Space h="md" />
      <Group justify="center">
        <Button onClick={goToPreviousPage} disabled={previousPageButton}>
          Previous Page
        </Button>
        <Button onClick={goToNextPage} disabled={nextPageButton}>
          Next Page
        </Button>
      </Group>
      <Space h="md" />
    </Container>
  );
}

export default ProductList;
