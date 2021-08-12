// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
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
import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Source from "./Source";

import { sourcePropTypes } from "./propTypes";
import { CORRECTIONS, JAILS } from "../MainPage/constants";

import "./Sources.scss";

const Sources = ({ data, tab }) => (
  <div className="Sources">
    <h2 className="Sources__title">Sources</h2>
    {!data.length ? (
      <p className="Sources__no-data">No public sources available.</p>
    ) : (
      <p className="Sources__data">
        {tab === JAILS && "This dashboard is powered by data compiled by the"}
        {tab === CORRECTIONS &&
          "All data for these visualizations comes from public reports published by the"}
        &nbsp;
        {data.map((source, index) => (
          <Fragment key={source.name}>
            {index === data.length - 1 && data.length > 1 && "and "}
            <Source key={source.name} {...source} />
            {index !== data.length - 1 && data.length > 2 && ","}
            {index !== data.length - 1 && " "}
            {index === data.length - 1 && "."}
          </Fragment>
        ))}
        {tab === JAILS &&
          " Data from Vera is continuously integrated from January 2020 onwards, while BJS data is pulled in manually as reports are published with the most recent report showing 2018 data. Note that this leads to a gap in data in 2019, as BJS data is forthcoming."}
      </p>
    )}
  </div>
);

Sources.defaultProps = {
  tab: CORRECTIONS,
};

Sources.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
  tab: PropTypes.string,
};

export default Sources;
