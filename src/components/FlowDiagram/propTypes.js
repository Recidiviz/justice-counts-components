import PropTypes from "prop-types";

export const flowDiagramDataPropTypes = PropTypes.objectOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    isNotAvailable: PropTypes.bool,
    number: PropTypes.number,
    percent: PropTypes.number,
  })
);
