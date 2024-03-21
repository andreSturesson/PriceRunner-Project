import { atom, useAtom } from "jotai";

export const isLoadingAtom = atom(false);
export const productsAtom = atom([]);
export const categoriesAtom = atom([]);
export const parametersAtom = atom({
  search_query: "",
  categoryId: 0,
  page: 1,
  limit: 20,
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
