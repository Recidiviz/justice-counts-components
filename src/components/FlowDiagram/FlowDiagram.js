// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
import React from "react";
import PropTypes from "prop-types";
import { useWindowWidth } from "@react-hook/window-size";

import Card from "../shared/Card";
import Arrow from "./Arrow";

import {
  ADMISSIONS,
  ADMISSIONS_NEW_COURT,
  ADMISSIONS_FROM_PAROLE,
  ADMISSIONS_FROM_PROBATION,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES,
} from "../../constants/metrics";
import { flowDiagramDataPropTypes } from "./propTypes";

import "./FlowDiagram.scss";

const FlowDiagram = ({ data, lastDate, prevDate }) => {
  const width = useWindowWidth();
  const isMobile = width < 1024;

  return (
    <section className="FlowDiagram">
      <div className="FlowDiagram__header">
        <div className="FlowDiagram__date">{lastDate}</div>
        <div className="FlowDiagram__hint">(% change compared to {prevDate})</div>
      </div>
      <div className="FlowDiagram__box">
        <span className="FlowDiagram__box-name">Court</span>
        <div className="FlowDiagram__row">
          <Card className="FlowDiagram__card" {...data[ADMISSIONS]}>
            <Arrow
              isDisabled={data[ADMISSIONS].isNotAvailable || data[POPULATION_PRISON].isNotAvailable}
              height={28.375}
              isMobile={isMobile}
              mobileHeight={51}
              mobileWidth={2.5}
              mobilePlacement="left"
            />
          </Card>
          <Card className="FlowDiagram__card" {...data[ADMISSIONS_NEW_COURT]}>
            <Arrow
              isDisabled={
                data[ADMISSIONS_NEW_COURT].isNotAvailable ||
                data[POPULATION_PROBATION].isNotAvailable
              }
              height={4.25}
              isMobile={isMobile}
              mobileHeight={2.5}
            />
          </Card>
        </div>
      </div>
      <div className="FlowDiagram__box">
        <span className="FlowDiagram__box-name">Corrections</span>
        <div className="FlowDiagram__row">
          <Card className="FlowDiagram__card" isPopulation {...data[POPULATION_PROBATION]}>
            <Arrow
              isDisabled={
                data[POPULATION_PROBATION].isNotAvailable ||
                data[ADMISSIONS_FROM_PROBATION].isNotAvailable
              }
              isMobile={isMobile}
              mobileHeight={2.5}
            />
          </Card>
        </div>
        <div className="FlowDiagram__row">
          <Card className="FlowDiagram__card" {...data[ADMISSIONS_FROM_PROBATION]}>
            <Arrow
              isDisabled={
                data[ADMISSIONS_FROM_PROBATION].isNotAvailable || data[ADMISSIONS].isNotAvailable
              }
              direction="topLeft"
              height={23.25}
              width={6.625}
              isMobile={isMobile}
              mobileDirection="top"
              mobilePlacement="right"
              mobileHeight={37.375}
              mobileWidth={2.5}
            />
            <Arrow
              isDisabled={
                data[ADMISSIONS_FROM_PROBATION].isNotAvailable ||
                data[POPULATION_PRISON].isNotAvailable
              }
              isMobile={isMobile}
              mobileHeight={2.5}
            />
          </Card>
        </div>
        <div className="FlowDiagram__row">
          <Card
            className="FlowDiagram__card FlowDiagram__card--doubled"
            isPopulation
            {...data[POPULATION_PRISON]}
          >
            <Arrow
              isDisabled={data[RELEASES].isNotAvailable || data[POPULATION_PRISON].isNotAvailable}
              height={14.25}
              placement="right"
              isMobile={isMobile}
              mobileHeight={37.375}
              mobileWidth={2.5}
              mobilePlacement="right"
            />
          </Card>
        </div>
        <div className="FlowDiagram__row">
          <Card
            className="FlowDiagram__card FlowDiagram__card--offset"
            {...data[ADMISSIONS_FROM_PAROLE]}
          >
            <Arrow
              isDisabled={
                data[POPULATION_PRISON].isNotAvailable ||
                data[ADMISSIONS_FROM_PAROLE].isNotAvailable
              }
              direction="top"
              isMobile={isMobile}
              mobileHeight={2.5}
              mobileDirection="top"
            />
          </Card>
        </div>
        <div className="FlowDiagram__row">
          <Card className="FlowDiagram__card" isPopulation {...data[POPULATION_PAROLE]}>
            <Arrow
              isDisabled={
                data[POPULATION_PAROLE].isNotAvailable ||
                data[ADMISSIONS_FROM_PAROLE].isNotAvailable
              }
              direction="top"
              isMobile={isMobile}
              mobileDirection="top"
              mobileHeight={2.5}
            />
          </Card>
          <Card className="FlowDiagram__card" {...data[RELEASES]}>
            <Arrow
              isDisabled={data[RELEASES].isNotAvailable || data[POPULATION_PAROLE].isNotAvailable}
              direction="left"
              height={0}
              width={2}
              isMobile={isMobile}
              mobileDirection="top"
              mobileHeight={2.5}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

FlowDiagram.propTypes = {
  data: flowDiagramDataPropTypes.isRequired,
  lastDate: PropTypes.string.isRequired,
  prevDate: PropTypes.string.isRequired,
};

export default FlowDiagram;
