import PropTypes from "prop-types";

export const countySelectorPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
  })
);
