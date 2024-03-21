import PropTypes from "prop-types";

export default function Review({ review }) {
  return (
    <div>
      <h3>{review.title}</h3>
      <p>{review.content}</p>
      <p>{review.rating}</p>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};
