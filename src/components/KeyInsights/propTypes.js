import PropTypes from "prop-types";

export const keyInsightsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    percentChange: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
  })
);