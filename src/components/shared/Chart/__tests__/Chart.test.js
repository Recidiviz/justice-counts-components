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
import { Line } from "react-chartjs-2";
import { act, render } from "@testing-library/react";
import PeriodPicker from "../PeriodPicker";

import Chart from "../Chart";
import calcMetricPercentage from "../utils/calcMetricPercentage";
import adjustChartDataLength from "../utils/adjustChartDataLength";
import formatDatePeriod from "../../../../utils/formatDatePeriod";

jest.mock("react-chartjs-2");
jest.mock("../PeriodPicker");
jest.mock("../utils/adjustChartDataLength");
jest.mock("../utils/calcMetricPercentage");
jest.mock("../../../../utils/formatDatePeriod");
describe("Chart.js", () => {
  const mockDatePeriod = "September 2019 - October 2020";
  const mockHint = "By System";
  const mockTitle = "some title";
  const mockChartData = {
    datasets: [
      { metric: "some metric", data: [50], label: "some label", isNotAvailable: false },
      { metric: "another metric", data: [10], label: "another label", isNotAvailable: true },
    ],
    labels: [{ year: 2020, month: 10 }],
  };

  beforeEach(() => {
    PeriodPicker.mockReturnValue(null);
    adjustChartDataLength.mockReturnValue(mockChartData);
    formatDatePeriod.mockReturnValue(mockDatePeriod);
    calcMetricPercentage.mockReturnValue(null);
    Line.mockReturnValue(null);

    jest.clearAllMocks();
  });

  it("should render chart component", () => {
    const { container } = render(
      <Chart hint={mockHint} title={mockTitle} chartData={mockChartData} />
    );

    // should pass initial value to period picker
    expect(PeriodPicker.mock.calls[0][0].period).toMatchObject({ value: 13, label: "1 year" });

    // should pass options to period picker
    expect(PeriodPicker.mock.calls[0][0].periods).toMatchObject([
      { value: 13, label: "1 year" },
      { value: 61, label: "5 years" },
      { value: 1, label: "All Time" },
    ]);

    // should render date range
    expect(container.querySelector(".Chart__hint").innerHTML).toBe(
      "By System (September 2019 - October 2020)"
    );

    // should render legends for each dataset
    expect(container.querySelectorAll(".Chart__legend").length).toBe(2);
    // legend should be disabled if isNotAvailable flag is set
    expect(container.querySelectorAll(".Chart__legend--disabled").length).toBe(1);
    // should hide even labels
    expect(
      [
        { year: 2019, month: 0 },
        { year: 2019, month: 1 },
        { year: 2019, month: 2 },
        { year: 2019, month: 3 },
      ].map((item, index) =>
        Line.mock.calls[0][0].options.scales.xAxes[0].ticks.callback(item, index)
      )
    ).toStrictEqual(["1/19", null, "3/19", null]);
  });

  it("should change visible period", () => {
    render(<Chart hint={mockHint} title={mockTitle} chartData={mockChartData} />);

    expect(PeriodPicker.mock.calls[0][0].period).toMatchObject({ value: 13, label: "1 year" });

    const option = PeriodPicker.mock.calls[0][0].periods[0];

    act(() => {
      PeriodPicker.mock.calls[0][0].onChange(option.value);
    });

    expect(PeriodPicker.mock.calls[1][0].period).toBe(option.value);
  });
});
