import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

import "./Chart.scss";

const TICKS_COLOR = "#808C99";
const chartColors = ["#06AEEE", "#004AD9", "#64D400", "#00A12D"];

const Chart = ({ title, hint, datasets, labels }) => {
  const styledDatasets = datasets.map((dataset, i) => ({
    ...dataset,
    borderColor: chartColors[i],
    pointBorderWidth: 0,
    backgroundColor: "transparent",
    pointBorderColor: "transparent",
    pointHoverBackgroundColor: chartColors[i],
    pointRadius: 12,
    pointHoverRadios: 12,
  }));

  return (
    <div className="Chart">
      <div className="Chart__header">
        <div className="Chart__title">{title}</div>
        <div className="Chart__period-picker" />
        <div className="Chart__hint">{hint}</div>
      </div>
      <div className="Chart__body">
        <div className="Chart__chart">
          <Line
            data={{ datasets: styledDatasets, labels }}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      display: false,
                      zeroLineColor: "#C4CCD4",
                    },
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
                    gridLines: {
                      tickMarkLength: 0,
                      color: "#D9D9D9",
                      zeroLineColor: "#D9D9D9",
                    },
                    ticks: {
                      color: TICKS_COLOR,
                      padding: 15,
                      fontSize: 10,
                      fontWeight: 700,
                      lineHeight: "16px",
                      callback: (tick) => tick,
                    },
                  },
                ],
              },
              tooltips: {
                mode: "nearest",
                intersect: false,
              },
            }}
          />
        </div>
        <div className="Chart__legends">
          {styledDatasets.map((dataset) => (
            <div className="Chart__legend">
              <span
                className="Chart__legend-point"
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span className="Chart__legend-label">{dataset.label}</span>
              <span className="Chart__legend-percent">-33%</span>
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
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Chart;
