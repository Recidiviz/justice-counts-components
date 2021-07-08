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
import cn from "classnames";

import Tabs from "./Tabs";
import Switch from "../Switch";
import Corrections from "../Corrections";
import Jails from "../Jails";

import { chartDataPropTypes } from "../Chart/propTypes";
import { keyInsightsPropTypes } from "../KeyInsights/propTypes";
import { sourcePropTypes } from "../Sources/propTypes";
import { CORRECTIONS, JAILS, LS_TAB_KEY, MONTHLY, LS_SWITCH_KEY, ANNUAL } from "./constants";

import "./MainPage.scss";
import { correctionsDataPropTypes } from "../Corrections/propTypes";

const MainPage = ({
  stateName,
  monthlyCorrectionsData,
  annualCorrectionsData,
  incarcerationRateChartData,
  incarcerationRateTopCountiesChartData,
  jailsKeyInsightsData,
  jailsLastUpdatedDate,
  monthlyCorrectionsLastUpdatedDate,
  annualCorrectionsLastUpdatedDate,
  countySelector,
  jailsSourceData,
  hasMonthlyCorrectionsData,
  hasAnnualCorrectionsData,
  hasJailsData,
  isUnified,
  additionalDescription,
}) => {
  const hasNoData = !hasMonthlyCorrectionsData && !hasAnnualCorrectionsData && !hasJailsData;

  const [storedActiveTab, setActiveTab] = useState(localStorage.getItem(LS_TAB_KEY) || CORRECTIONS);

  // Force the active tab to 'CORRECTIONS' in a unified state.
  const activeTab = isUnified ? CORRECTIONS : storedActiveTab;

  const onActiveTabChange = (newTab) => {
    setActiveTab(newTab);
    localStorage.setItem(LS_TAB_KEY, newTab);
  };

  const [storedActivePane, setActivePane] = useState(
    localStorage.getItem(LS_SWITCH_KEY) || MONTHLY
  );

  // Force the active pane to an available pane.
  const availablePanes = [MONTHLY, ANNUAL].filter((value) => {
    switch (value) {
      case MONTHLY:
        return hasMonthlyCorrectionsData;
      case ANNUAL:
        return hasAnnualCorrectionsData;
      default:
        return true;
    }
  });
  const activePane = availablePanes.includes(storedActivePane)
    ? storedActivePane
    : availablePanes[0];

  const onActivePaneChange = (newPane) => {
    setActivePane(newPane);
    localStorage.setItem(LS_SWITCH_KEY, newPane);
  };

  const correctionsLastUpdatedDate =
    activePane === MONTHLY ? monthlyCorrectionsLastUpdatedDate : annualCorrectionsLastUpdatedDate;

  return (
    <section className="MainPage">
      <header className={cn("MainPage__header", { "MainPage__header--without-border": hasNoData })}>
        <h1 className="MainPage__title">{stateName} data dashboard</h1>
        {hasNoData ? (
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
          <>
            <p className="MainPage__description">
              The following is a broad overview of the corrections and jail systems in {stateName},
              representing up-to-date data and changes compared to last year. An additional section
              on crime indicators will be added at a later date. {additionalDescription}
              <br />
              <i>
                Last updated:{" "}
                {activeTab === JAILS ? jailsLastUpdatedDate : correctionsLastUpdatedDate}
              </i>
            </p>
          </>
        )}
      </header>
      {!hasNoData && (
        <>
          <Tabs activeTab={activeTab} onTabChange={onActiveTabChange} isUnified={isUnified} />
          {activeTab === CORRECTIONS && (
            <div className="MainPage__range">
              <h3 className="MainPage__range-title">Data Aggregation Range</h3>
              <p className="MainPage__description">
                Use the control below to switch between{" "}
                <strong>showing only monthly aggregated data</strong> and showing{" "}
                <strong>both monthly and annually aggregated data</strong>.
              </p>
              <div className="MainPage__switch">
                {/* TODO: hide panes */}
                <Switch
                  activeTab={activePane}
                  onTabChange={onActivePaneChange}
                  availablePanes={availablePanes}
                />
                <p className="MainPage__switch-label">
                  {activePane === ANNUAL
                    ? `Only data that is aggregated annual will be shown in the Key Insights and flow diagram below. Click the control to the left to see monthly data.`
                    : `Only data that is aggregated monthly will be shown in the Key Insights and flow
                  diagram below. Click the control to the left to see annualized data.`}
                </p>
              </div>
            </div>
          )}
          {activeTab === CORRECTIONS && (
            <Corrections
              isAnnual={activePane === ANNUAL}
              correctionsData={
                activePane === ANNUAL ? annualCorrectionsData : monthlyCorrectionsData
              }
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
        </>
      )}
    </section>
  );
};

MainPage.defaultProps = {
  countySelector: null,
  additionalDescription: null,
};

MainPage.propTypes = {
  stateName: PropTypes.string.isRequired,
  monthlyCorrectionsData: correctionsDataPropTypes.isRequired,
  annualCorrectionsData: correctionsDataPropTypes.isRequired,
  jailsLastUpdatedDate: PropTypes.string.isRequired,
  monthlyCorrectionsLastUpdatedDate: PropTypes.string.isRequired,
  annualCorrectionsLastUpdatedDate: PropTypes.string.isRequired,
  incarcerationRateChartData: chartDataPropTypes.isRequired,
  incarcerationRateTopCountiesChartData: chartDataPropTypes.isRequired,
  jailsKeyInsightsData: keyInsightsPropTypes.isRequired,
  countySelector: PropTypes.node,
  jailsSourceData: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
  hasAnnualCorrectionsData: PropTypes.bool.isRequired,
  hasMonthlyCorrectionsData: PropTypes.bool.isRequired,
  hasJailsData: PropTypes.bool.isRequired,
  isUnified: PropTypes.bool.isRequired,
  additionalDescription: PropTypes.string,
};

export default MainPage;
