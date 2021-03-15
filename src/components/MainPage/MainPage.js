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
import React, { useState } from "react";
import PropTypes from "prop-types";

import Tabs from "./Tabs";
import Corrections from "../Corrections";
import Jails from "../Jails";

import { chartDataPropTypes } from "../shared/Chart/propTypes";
import { flowDiagramDataPropTypes } from "../Corrections/FlowDiagram/propTypes";
import { keyInsightsPropTypes } from "../shared/KeyInsights/propTypes";
import { sourcePropTypes } from "../shared/Sources/propTypes";
import { CORRECTIONS, JAILS, LS_TAB_KEY } from "./constants";

import "./MainPage.scss";

const MainPage = ({
  stateName,
  populationsChartData,
  prisonAdmissionsChartData,
  paroleRevocationsChartData,
  probationRevocationsChartData,
  incarcerationRateChartData,
  incarcerationRateTopCountiesChartData,
  releasesChartData,
  flowDiagramData,
  flowDiagramLastDate,
  flowDiagramPrevDate,
  correctionsKeyInsightsData,
  jailsKeyInsightsData,
  countySelector,
  correctionsSourceData,
  jailsSourceData,
  isNoData,
}) => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LS_TAB_KEY) || CORRECTIONS);

  const onActiveTabChange = (newTab) => {
    setActiveTab(newTab);
    localStorage.setItem(LS_TAB_KEY, newTab);
  };

  return (
    <section className="MainPage">
      <header className="MainPage__header">
        <h1 className="MainPage__title">{stateName} data dashboard</h1>
        {isNoData ? (
          <p className="MainPage__description">
            No data was publicly available for this state. If you are a representative of this state
            and would like to contribute your data to this site, please{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://justicecounts.csgjusticecenter.org/stay-in-touch/"
              className="MainPage__contact-link"
            >
              contact us
            </a>
            .
          </p>
        ) : (
          <p className="MainPage__description">
            The following is a broad overview of the corrections system in {stateName}, representing
            up-to-date data and changes compared to last year ({flowDiagramPrevDate} to{" "}
            {flowDiagramLastDate}). Two additional sections containing crime and jail indicators
            will be added at a later date.
          </p>
        )}
      </header>
      <Tabs activeTab={activeTab} onTabChange={onActiveTabChange} />
      {activeTab === CORRECTIONS && (
        <Corrections
          populationsChartData={populationsChartData}
          prisonAdmissionsChartData={prisonAdmissionsChartData}
          paroleRevocationsChartData={paroleRevocationsChartData}
          probationRevocationsChartData={probationRevocationsChartData}
          releasesChartData={releasesChartData}
          flowDiagramData={flowDiagramData}
          flowDiagramLastDate={flowDiagramLastDate}
          flowDiagramPrevDate={flowDiagramPrevDate}
          keyInsightsData={correctionsKeyInsightsData}
          sourceData={correctionsSourceData}
        />
      )}
      {activeTab === JAILS && (
        <Jails
          keyInsightsData={jailsKeyInsightsData}
          countySelector={countySelector}
          incarcerationRateChartData={incarcerationRateChartData}
          incarcerationRateTopCountiesChartData={incarcerationRateTopCountiesChartData}
          sourceData={jailsSourceData}
        />
      )}
    </section>
  );
};

MainPage.propTypes = {
  stateName: PropTypes.string.isRequired,
  populationsChartData: chartDataPropTypes.isRequired,
  prisonAdmissionsChartData: chartDataPropTypes.isRequired,
  paroleRevocationsChartData: chartDataPropTypes.isRequired,
  probationRevocationsChartData: chartDataPropTypes.isRequired,
  releasesChartData: chartDataPropTypes.isRequired,
  incarcerationRateChartData: chartDataPropTypes.isRequired,
  incarcerationRateTopCountiesChartData: chartDataPropTypes.isRequired,
  flowDiagramLastDate: PropTypes.string.isRequired,
  flowDiagramPrevDate: PropTypes.string.isRequired,
  flowDiagramData: flowDiagramDataPropTypes.isRequired,
  correctionsKeyInsightsData: keyInsightsPropTypes.isRequired,
  jailsKeyInsightsData: keyInsightsPropTypes.isRequired,
  countySelector: PropTypes.node.isRequired,
  correctionsSourceData: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
  jailsSourceData: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
  isNoData: PropTypes.bool.isRequired,
};

export default MainPage;
