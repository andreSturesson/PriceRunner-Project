import { isLoggedInAtom } from "../../State/auth.state";
import { useState, useEffect } from "react";
import { getProducts } from "../../Helpers/APIManager";
import {
  Container,
  Group,
  Divider,
  Space,
  Button,
  Text,
  Loader,
} from "@mantine/core";
import { useProductsAtom, useParametersAtom } from "../../State/products.state";
import { useAtom } from "jotai";
import Product404 from "./Product404";
import Product from "./Product";
import { useSearchParams } from "react-router-dom";

//TODO Implement a better looking design.
function ProductList() {
  const [products, setProducts] = useProductsAtom();
  const [parameters, setParameters] = useParametersAtom();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [nextPageButton, setNextPageButton] = useState(false);
  const [previousPageButton, setPreviousPageButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const products = await getProducts(parameters);
        if (products) {
          setTotalPages(products.data.totalPages);
          setNumberOfProducts(products.data.numberOfProducts);
          setProducts(products.data.products);
          setNextPageButton(false);
        } else {
          setNextPageButton(true);
        }
        const url = new URL(window.location.origin);
        url.pathname = "/products";
        url.search = new URLSearchParams(parameters).toString();
        setSearchParams(url.search);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [parameters, setProducts, setSearchParams]);

  function goToNextPage() {
    setPreviousPageButton(false);
    if (nextPageButton) {
      return;
    }
    setParameters({ ...parameters, page: currentPage + 1 });
    setCurrentPage(currentPage + 1);
  }

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  function goToPreviousPage() {
    setNextPageButton(false);
    if (currentPage <= 1) {
      setPreviousPageButton(true);
      return;
    }
    setParameters({ ...parameters, page: currentPage - 1 });
    setCurrentPage(currentPage - 1);
  }

  return (
    <>
      {setIsLoading ? (
        <Container>
          <Space h="md" />
          <Text align="left" size="xs">
            Returned: {formatNumber(numberOfProducts)} items
          </Text>
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
            <Text size="sm">
              {currentPage} / {formatNumber(totalPages)} pages
            </Text>
          </Group>
          <Space h="md" />
        </Container>
      ) : (
        <Container>
          <Space h="md" />
          <Loader color="blue" />
          <Space h="md" />
        </Container>
      )}
    </>
  );
}

export default ProductList;
