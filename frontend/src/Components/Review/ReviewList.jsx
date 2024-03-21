import PropTypes from "prop-types";
import { userAtom } from "../../State/auth.state";
import { useEffect, useState } from "react";
import { getReviews } from "../../Helpers/APIManager";

export default function ReviewList({ productId }) {
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getReviews(productId);
      if (response.error) {
        setError(response.error);
        return;
      }
      setReviews(response);
    }
    fetchData();
  }, [productId]);

  return (
    <>
      <h1>test</h1>
      {error && <h1>{error}</h1>}
    </>
  );
}

ReviewList.propTypes = {
  productId: PropTypes.string.isRequired,
};
