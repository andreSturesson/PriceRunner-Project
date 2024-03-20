import ViewProduct from "../Components/Products/ViewProduct";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../Helpers/APIManager";

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getProduct(productId);
      setProduct(response);
    }
    fetchData();
  }, [productId]);

  console.log(product);

  return <ViewProduct product={product} />;
}

export default ProductPage;
