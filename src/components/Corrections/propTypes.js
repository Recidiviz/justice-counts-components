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
import PropTypes from "prop-types";

import { chartDataPropTypes } from "../Chart/propTypes";
import { keyInsightsPropTypes } from "../KeyInsights/propTypes";
import { sourcePropTypes } from "../Sources/propTypes";
import { flowDiagramDataPropTypes } from "./FlowDiagram/propTypes";

export const correctionsDataPropTypes = PropTypes.shape({
  populationsChartData: chartDataPropTypes.isRequired,
  prisonAdmissionsChartData: chartDataPropTypes.isRequired,
  paroleRevocationsChartData: chartDataPropTypes.isRequired,
  probationRevocationsChartData: chartDataPropTypes.isRequired,
  releasesChartData: chartDataPropTypes.isRequired,
  flowData: flowDiagramDataPropTypes.isRequired,
  keyInsightsData: keyInsightsPropTypes.isRequired,
  flowDiagramLastDate: PropTypes.string.isRequired,
  flowDiagramPrevDate: PropTypes.string.isRequired,
  sourceData: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
});
