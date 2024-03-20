import { isLoggedInAtom } from "../../State/auth.state";
import { useState, useEffect } from "react";
import { getProducts } from "../../Helpers/APIManager";
import {
  Card,
  Container,
  Group,
  Image,
  Text,
  Divider,
  Space,
  Center,
  Button,
  Input,
} from "@mantine/core";
import { useProductsAtom, useParametersAtom } from "../../State/products.state";
import { useAtom } from "jotai";

//TODO Implement a better looking design.
function ProductList() {
  const [products, setProducts] = useProductsAtom();
  const [parameters, setParameters] = useParametersAtom();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [nextPageButton, setNextPageButton] = useState(false);
  const [previousPageButton, setPreviousPageButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts(parameters);
      if (products) {
        setProducts(products);
        setNextPageButton(false);
      } else {
        setNextPageButton(true);
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
      {products.map((product) => (
        <div key={product.id}>
          <Card
            shadow="sm"
            padding="xl"
            component="a"
            href={product.productUrl}
            target="_blank"
            withBorder
          >
            <Card.Section>
              <Center>
                <Image src={product.imageUrl} h={400} w={350} alt="No way!" />
              </Center>
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              {product.title}
            </Text>

            <Text size="sm">Price: ${product.price.toFixed(2)}</Text>
          </Card>
          <Space h="md" mt="xl" />
        </div>
      ))}
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
