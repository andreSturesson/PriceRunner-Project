import { atom, useAtom } from "jotai";

export const productsAtom = atom([]);
export const categoriesAtom = atom([]);
export const parametersAtom = atom({
  search_query: "",
  category: "",
  page: 1,
  limit: 10,
});

export const useProductsAtom = () => {
  const [products, setProducts] = useAtom(productsAtom);
  return [products, setProducts];
};

export const useCategoriesAtom = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);
  return [categories, setCategories];
};

export const useParametersAtom = () => {
  const [parameters, setParameters] = useAtom(parametersAtom);
  return [parameters, setParameters];
};
