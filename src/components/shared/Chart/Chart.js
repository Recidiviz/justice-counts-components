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
/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Line } from "react-chartjs-2";

import PeriodPicker from "./PeriodPicker";
import formatDatePeriod from "../../../utils/formatDatePeriod";
import calcMetricPercentage from "./utils/calcMetricPercentage";
import adjustChartDataLength from "./utils/adjustChartDataLength";
import { chartDataPropTypes } from "./propTypes";
import formatNumber from "../../../utils/formatNumber";
import months from "../../../constants/months";

import "./Chart.scss";

const TICKS_COLOR = "#808C99";
const chartColors = ["#06AEEE", "#004AD9", "#64D400", "#00A12D", "#FFA600"];
const CONNECTING_LINE_COLOR = "#00475D";

const Chart = ({ title, hint, chartData, switchCounties }) => {
  const availablePeriods = [
    { value: 13, label: "1 year" },
    { value: 61, label: "5 years" },
    { value: chartData.labels.length, label: "All Time" },
  ];
  const [period, setPeriod] = useState(availablePeriods[0]);

  const changePeriod = useCallback((value) => {
    setPeriod(value);
  }, []);

  const isChartUnavailable = chartData.datasets.every(
    (dataset) => !dataset.data.filter((dataPoint) => dataPoint !== null).length
  );

  const { datasets, labels } = adjustChartDataLength(
    chartData,
    isChartUnavailable ? 13 : period.value
  );

  const styledDatasets = datasets.map((dataset, i) => ({
    ...dataset,
    data: dataset.data,
    borderColor: chartColors[i],
    isNotAvailable: dataset.isNotAvailable || dataset.data.every((dataPoint) => dataPoint === null),
    backgroundColor: "transparent",
    pointBackgroundColor: chartColors[i],
    pointHoverBackgroundColor: chartColors[i],
    pointBorderColor: "transparent",
    pointHoverBorderColor: chartColors[i],
    pointRadius: dataset.data.filter((dataPoint) => dataPoint !== null).length === 1 ? 4 : 0,
    pointHitRadius: 12,
    spanGaps: true,
  }));
  const { month: startMonth, year: startYear } = labels[0];
  const { month: endMonth, year: endYear } = labels[labels.length - 1];

  const drawLinePlugin = {
    afterDraw(chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const activePoint = chart.tooltip._active[0];
        const { ctx } = chart;
        const { x } = activePoint.tooltipPosition();
        const topY = chart.legend.bottom;
        const bottomY = chart.chartArea.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = CONNECTING_LINE_COLOR;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  return (
    <div className="Chart">
      <div className="Chart__header">
        <div className="Chart__title">{title}</div>
        <div className="Chart__period-picker">
          <PeriodPicker period={period} periods={availablePeriods} onChange={changePeriod} />
        </div>
        <div className="Chart__hint">
          {hint} ({formatDatePeriod(startYear, startMonth, endYear, endMonth)})
        </div>
      </div>
      <div className="Chart__body">
        <div className="Chart__chart">
          {isChartUnavailable && <div className="Chart__chart-unavailable">No Data Available</div>}
          <Line
            data={{ datasets: styledDatasets, labels }}
            options={{
              hover: {
                intersect: false,
              },
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
                      callback: (label) => formatNumber(label),
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
                      callback: (tick, index) =>
                        index % 2 ? null : `${tick.month + 1}/${tick.year % 100}`,
                    },
                  },
                ],
              },
              tooltips: {
                callbacks: {
                  title: (item) => `${months[item[0].xLabel.month]} ${item[0].xLabel.year}`,
                  label: (tooltipItem, data) =>
                    `${data.datasets[tooltipItem.datasetIndex].label}: ${formatNumber(
                      tooltipItem.value
                    )}`,
                },
                backgroundColor: CONNECTING_LINE_COLOR,
                yPadding: 10,
                xPadding: 16,
                cornerRadius: 4,
                bodySpacing: 10,
                intersect: false,
                mode: "index",
              },
            }}
            plugins={[drawLinePlugin]}
          />
        </div>
        <div className="Chart__legends">
          {styledDatasets.map((dataset) => (
            <div
              key={dataset.label}
              className={cn("Chart__legend", { "Chart__legend--disabled": dataset.isNotAvailable })}
            >
              <span
                className="Chart__legend-point"
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span className="Chart__legend-label">
                {dataset.label}&nbsp;
                {dataset.isStatewide ? dataset.countyCoverage : switchCounties}
              </span>
              <span className="Chart__legend-percent">
                {dataset.isNotAvailable ? "N/A" : calcMetricPercentage(dataset.data)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Chart.defaultProps = {
  switchCounties: null,
};

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  chartData: chartDataPropTypes.isRequired,
  switchCounties: PropTypes.node,
};

export default Chart;
