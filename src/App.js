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

import KeyInsights from "./KeyInsights";
import FlowDiagram from "./FlowDiagram";
import Chart from "./Chart";

import {
  mockPopulationChartData,
  mockPrisonAdmissionsChartData,
  mockReleasesChartData,
} from "./__mocks__/mockChartData";

import "./App.scss";

const App = () => (
  <section className="App">
    <header className="App__header">
      <h1 className="App__title">Colorado data dashboard</h1>
      <p className="App__description">
        The following is a broad overview of the corrections system in Colorado, representing the
        up-to-date data and changes compared to last year (September 2019 to September 2020). Two
        additional sections containing crime and jail indicators will be added at a later date.
      </p>
    </header>
    <KeyInsights
      prisonPopulation={-3075}
      prisonPopulationPercent={-16}
      revocations={-139}
      revocationsPercent={-53}
      technicalRevocations={-109}
      technicalRevocationsPercent={-62}
    />
    <FlowDiagram lastDate="September 2020" prevDate="September 2019" />
    <Chart
      labels={mockPopulationChartData.labels}
      datasets={mockPopulationChartData.datasets}
      title="Populations"
      hint="By Type (September 2019 - September 2020)"
    />
    <Chart
      labels={mockPrisonAdmissionsChartData.labels}
      datasets={mockPrisonAdmissionsChartData.datasets}
      title="Prison Admissions"
      hint="By Type (September 2019 - September 2020)"
    />
    <Chart
      labels={mockReleasesChartData.labels}
      datasets={mockReleasesChartData.datasets}
      title="Releases"
      hint="By Type (September 2019 - September 2020)"
    />
  </section>
);

export default App;
