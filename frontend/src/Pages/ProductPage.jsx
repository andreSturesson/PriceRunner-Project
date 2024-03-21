import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../Helpers/APIManager";
import { ViewProduct } from "../Components/Products/ViewProduct";
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

  return <ViewProduct product={product} />;
}

export default ProductPage;
