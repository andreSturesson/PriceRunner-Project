import {
  Container,
  Card,
  Group,
  Avatar,
  Text,
  Space,
  Divider,
  Image,
  Button,
  Center,
} from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { userAtom } from "../../State/auth.state";
import { useAtom } from "jotai";
import ReviewList from "../Review/ReviewList";
export function ViewProduct({ product }) {
  const [user] = useAtom(userAtom);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Center>
          <Text>{product.title}</Text>
        </Center>
        <Container padding="lg">
          <Image radius="sm" src={product.imageUrl} alt={product.title} />
        </Container>
        <Space h={25} />
        <Divider />
        <Container>
          <Button>View On Amazon</Button>
        </Container>
        <ReviewList productId={product.id} />
      </Card>
      <Space h={10} />
    </>
  );
}

ViewProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
