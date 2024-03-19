import { Container, Space, TextInput } from "@mantine/core";

function SearchBox() {
  return (
    <Container>
      <form>
        <TextInput variant="filled" size="md" placeholder="Search for items" />
      </form>
      <Space h="md" />
    </Container>
  );
}

export default SearchBox;
