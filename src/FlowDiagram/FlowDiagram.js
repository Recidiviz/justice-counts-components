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
        <Card className="FlowDiagram__card" title="Prison Sentences" percent={-20} number={337}>
          <Arrow height={28.375} />
        </Card>
        <Card className="FlowDiagram__card" title="Probation Sentences" isNotAvailable>
          <Arrow height={4.25} />
        </Card>
      </div>
    </div>
    <div className="FlowDiagram__box">
      <span className="FlowDiagram__box-name">Corrections</span>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card"
          title="Probation Population"
          number={68285}
          percent={-8}
          isPopulation
          warning="Probation population was last reported on June 30, 2020 (% change compared to September 2019)."
        >
          <Arrow />
        </Card>
      </div>
      <div className="FlowDiagram__row">
        <Card className="FlowDiagram__card" title="Probation Revocations" isNotAvailable>
          <Arrow direction="topLeft" height={23.25} width={6.625} />
          <Arrow />
        </Card>
      </div>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card FlowDiagram__card--doubled"
          title="Prison Population"
          number={16673}
          percent={-16}
          isPopulation
        >
          <Arrow height={14.25} placement="right" />
        </Card>
      </div>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card FlowDiagram__card--offset"
          title="Parole Revocations"
          number={123}
          percent={-53}
        >
          <Arrow direction="top" />
        </Card>
      </div>
      <div className="FlowDiagram__row">
        <Card
          className="FlowDiagram__card"
          title="Parole Population"
          number={12847}
          percent={12}
          isPopulation
        >
          <Arrow direction="top" />
        </Card>
        <Card className="FlowDiagram__card" title="Releases to Parole" number={622} percent={-11}>
          <Arrow direction="left" height={0} width={2} />
        </Card>
      </div>
    </div>
  </section>
);

FlowDiagram.propTypes = {
  lastDate: PropTypes.string.isRequired,
  prevDate: PropTypes.string.isRequired,
};

export default FlowDiagram;
