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
import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import Switch from "../Switch";
import Corrections from "../Corrections";

import { MONTHLY, LS_TAB_KEY, ANNUAL } from "./constants";

import "./MainPage.scss";
import { correctionsDataPropTypes } from "../Corrections/propTypes";

const MainPage = ({ stateName, monthlyCorrectionsData, annualCorrectionsData, isNoData }) => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LS_TAB_KEY) || MONTHLY);

  const onActiveTabChange = (newTab) => {
    setActiveTab(newTab);
    localStorage.setItem(LS_TAB_KEY, newTab);
  };

  return (
    <section className="MainPage">
      <header className={cn("MainPage__header", { "MainPage__header--without-border": isNoData })}>
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
          <>
            <p className="MainPage__description">
              The following is a broad overview of the corrections system in {stateName},
              representing the latest data available and indicating changes over the course of the
              prior year.
            </p>
            <div className="MainPage__range">
              <h3 className="MainPage__range-title">Data Aggregation Range</h3>
              <p className="MainPage__description">
                Use the control below to switch between{" "}
                <strong>showing only monthly-aggregated data</strong> and showing{" "}
                <strong>both monthly and annually-aggregated data</strong>.
              </p>
              <div className="MainPage__switch">
                <Switch activeTab={activeTab} onTabChange={onActiveTabChange} />
                <p className="MainPage__switch-label">
                  Only data that is aggregated monthly will be shown in the Key Insights and flow
                  diagram below.
                </p>
              </div>
            </div>
          </>
        )}
      </header>
      {!isNoData && (
        <Corrections
          isAnnual={activeTab === ANNUAL}
          correctionsData={activeTab === ANNUAL ? annualCorrectionsData : monthlyCorrectionsData}
        />
      )}
    </section>
  );
};

MainPage.propTypes = {
  stateName: PropTypes.string.isRequired,
  monthlyCorrectionsData: correctionsDataPropTypes.isRequired,
  annualCorrectionsData: correctionsDataPropTypes.isRequired,
  isNoData: PropTypes.bool.isRequired,
};

export default MainPage;
