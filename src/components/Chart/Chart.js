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
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

import PeriodPicker from "./PeriodPicker";
import formatDatePeriod from "../../utils/formatDatePeriod";
import formatPercentage from "./utils/formatPercentage";
import adjustChartDataLength from "./utils/adjustChartDataLength";
import { chartDataPropTypes } from "./propTypes";

import "./Chart.scss";

const TICKS_COLOR = "#808C99";
const chartColors = ["#06AEEE", "#004AD9", "#64D400", "#00A12D"];

const Chart = ({ title, hint, chartData }) => {
  const [period, setPeriod] = useState(12);

  const changePeriod = useCallback((value) => {
    setPeriod(value);
  }, []);

  const { datasets, labels } = adjustChartDataLength(chartData, period);

  const styledDatasets = datasets.map((dataset, i) => ({
    ...dataset,
    data: dataset.data,
    borderColor: chartColors[i],
    backgroundColor: "transparent",
    pointBackgroundColor: chartColors[i],
    pointHoverBackgroundColor: chartColors[i],
    pointBorderColor: "transparent",
    pointHoverBorderColor: chartColors[i],
    pointRadius: 0,
    pointHitRadius: 12,
  }));
  const formattedLabels = labels.map(({ year, month }) => `${month + 1}/${year % 100}`);

  const { month: startMonth, year: startYear } = labels[0];
  const { month: endMonth, year: endYear } = labels[labels.length - 1];

  return (
    <div className="Chart">
      <div className="Chart__header">
        <div className="Chart__title">{title}</div>
        <div className="Chart__period-picker">
          <PeriodPicker
            period={period}
            periods={[
              { value: 60, label: "5 years" },
              { value: 12, label: "1 year" },
              { value: chartData.labels.length, label: "All Time" },
            ]}
            onChange={changePeriod}
          />
        </div>
        <div className="Chart__hint">
          {hint} ({formatDatePeriod(startYear, startMonth, endYear, endMonth)})
        </div>
      </div>
      <div className="Chart__body">
        <div className="Chart__chart">
          <Line
            data={{ datasets: styledDatasets, labels: formattedLabels }}
            options={{
              maintainAspectRatio: false,
              legend: { display: false },
              scales: {
                yAxes: [
                  {
                    gridLines: { display: false, zeroLineColor: "#C4CCD4" },
                    ticks: {
                      color: TICKS_COLOR,
                      fontSize: 10,
                      fontWeight: 700,
                      lineHeight: "10px",
                      padding: 15,
                      min: 0,
                      maxTicksLimit: 6,
                      stepSize: 100,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: { tickMarkLength: 0, color: "#D9D9D9", zeroLineColor: "#D9D9D9" },
                    ticks: {
                      color: TICKS_COLOR,
                      padding: 15,
                      fontSize: 10,
                      fontWeight: 700,
                      lineHeight: "16px",
                      callback: (tick, index) => (index % 2 ? null : tick),
                    },
                  },
                ],
              },
              tooltips: { mode: "nearest" },
            }}
          />
        </div>
        <div className="Chart__legends">
          {styledDatasets.map((dataset) => (
            <div key={dataset.label} className="Chart__legend">
              <span
                className="Chart__legend-point"
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span className="Chart__legend-label">{dataset.label}</span>
              <span className="Chart__legend-percent">{formatPercentage(dataset.data)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  chartData: chartDataPropTypes.isRequired,
};

export default Chart;
