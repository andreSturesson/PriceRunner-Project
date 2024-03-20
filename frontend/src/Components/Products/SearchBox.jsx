import { Container, Space, TextInput, rem } from "@mantine/core";
import { FaSearchDollar } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { useParametersAtom } from "../../State/products.state";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [parameters, setParameters] = useParametersAtom();

  const navigate = useNavigate();

  const searchForm = useForm({
    initialValues: {
      search_query: "",
      categoryId: 0,
      page: 1,
      limit: 10,
    },
    validate: {
      search_query: (value) =>
        value.length < 3 ? "Search must have at least 3 letters" : null,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    searchForm.validate();
    setParameters(searchForm.values);
    searchForm.values = null;
    navigate("/products");
  };

  const handleClear = () => {
    searchForm.reset();
    setParameters({ ...parameters, search_query: "" });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextInput
          variant="filled"
          size="md"
          placeholder="Search for items"
          rightSection={
            <>
              <FaSearchDollar
                style={{ cursor: "pointer", width: rem(18), height: rem(18) }}
              />
              <Space w="sm" />
              <MdOutlineClear
                onClick={handleClear}
                style={{ cursor: "pointer" }}
              />
            </>
          }
          value={searchForm.values.search_query}
          {...searchForm.getInputProps("search_query")}
        />
      </form>
      <Space h="md" />
    </Container>
  );
}

export default SearchBox;
