import {
  Container,
  Group,
  NativeSelect,
  RangeSlider,
  Text,
} from "@mantine/core";
import {
  useCategoriesAtom,
  useParametersAtom,
} from "../../State/products.state";
import { useEffect, useState } from "react";
import { getCategories } from "../../Helpers/APIManager";

//TODO Redesign
function ProductFilter() {
  const [parameters, setParameters] = useParametersAtom();
  const [categories, setCategories] = useCategoriesAtom();
  const [category, setCategory] = useState();

  useEffect(() => {
    const getCategoryArray = async () => {
      const temp = await getCategories();
      return temp;
    };

    getCategoryArray().then((x) => {
      setCategories(x);
    });
  }, []);

  function createData(data) {
    const newData = [
      {
        value: "0",
        label: "---",
      },
      ...data.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      })),
    ];
    return newData;
  }

  const selectData = createData(categories);
  console.log(selectData);
  const handleCategoryChange = (event) => {
    setCategory(event.currentTarget.value);
    setParameters({ ...parameters, categoryId: event.currentTarget.value });
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <Container>
          <Group justify="center">
            <NativeSelect
              size="xs"
              variant="filled"
              label="Category"
              defaultValue="---"
              value={category}
              onChange={handleCategoryChange}
              data={selectData}
            />
          </Group>
          {/* <Text>Price</Text>
          <RangeSlider
            label={(value) => `$${value}`}
            minRange={10000}
            min={0}
            max={100000}
            step={100}
            defaultValue={[0, 100000]}
          /> */}
        </Container>
        <br />
      </div>
    </div>
  );
}

export default ProductFilter;
