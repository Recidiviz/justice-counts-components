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

import "./App.scss";

const mockPopulationsChartData = {
  datasets: [
    {
      label: "Prison Population",
      data: [700, 820, 740, 800, 700, 650, 600, 550, 500, 400, 400, 400, 420],
    },
    {
      label: "Total Prison Admissions",
      data: [400, 550, 580, 530, 420, 370, 340, 340, 340, 340, 340, 320, 330],
    },
    {
      label: "New Court Admissions",
      data: [200, 250, 260, 180, 140, 100, 100, 130, 80, 70, 80, 55, 95],
    },
    {
      label: "Parole Revocations, New Offense",
      data: [250, 220, 210, 40, 200, 57, 99, 123, 50, 70, 80, 55, 110],
    },
  ],
  // prettier-ignore
  labels: ["9/19", null, "11/19", null, "1/20", null, "3/20", null, "5/20", null, "7/20", null, "9/20"],
};

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
      labels={mockPopulationsChartData.labels}
      datasets={mockPopulationsChartData.datasets}
      title="Populations"
      hint="By Type (September 2019 - September 2020)"
    />
    <Chart
      labels={mockPopulationsChartData.labels}
      datasets={mockPopulationsChartData.datasets}
      title="Prison Admissions"
      hint="By Type (September 2019 - September 2020)"
    />
  </section>
);

export default App;
