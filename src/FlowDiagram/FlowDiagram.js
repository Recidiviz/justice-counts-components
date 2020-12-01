import React from "react";
import PropTypes from "prop-types";

import Card from "../components/Card";
import Arrow from "../components/Arrow";

import "./FlowDiagram.scss";

const FlowDiagram = ({ lastDate, prevDate }) => (
  <section className="FlowDiagram">
    <div className="FlowDiagram__header">
      <div className="FlowDiagram__date">{lastDate}</div>
      <div className="FlowDiagram__hint">(% change compared to {prevDate})</div>
    </div>
    <div className="FlowDiagram__box">
      <span className="FlowDiagram__box-name">Court</span>
      <div className="FlowDiagram__row">
        <Card className="FlowDiagram__card" title="Prison sentences" percent={-20} number={337}>
          <Arrow height="28.5rem" />
        </Card>
        <Card className="FlowDiagram__card" title="Probation sentences" isNotAvailable />
      </div>
    </div>
    <div className="FlowDiagram__box">
      <span className="FlowDiagram__box-name">Corrections</span>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card"
          title="Probation population"
          number={68285}
          percent={-8}
          isPopulation
          warning="Probation population was last reported on June 30, 2020 (% change compared to September 2019)."
        />
      </div>
      <div className="FlowDiagram__row">
        <Card className="FlowDiagram__card" title="Probation population" isNotAvailable />
      </div>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card FlowDiagram__card--doubled"
          title="Prison population"
          number={16673}
          percent={-16}
          isPopulation
        />
      </div>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card FlowDiagram__card--offset"
          title="Parole revocations"
          number={123}
          percent={-53}
        />
      </div>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card"
          title="Parole population"
          number={12847}
          percent={12}
          isPopulation
        />
        <Card className="FlowDiagram__card" title="Releases to parole" number={622} percent={-11} />
      </div>
    </div>
  </section>
);

FlowDiagram.propTypes = {
  lastDate: PropTypes.string.isRequired,
  prevDate: PropTypes.string.isRequired,
};

export default FlowDiagram;
