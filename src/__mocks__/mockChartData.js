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
import mockDataPoints from "./mockDataPoints";

const mockLabels = [
  { month: 9, year: 19 },
  { month: 10, year: 19 },
  { month: 11, year: 19 },
  { month: 0, year: 20 },
  { month: 1, year: 20 },
  { month: 2, year: 20 },
  { month: 3, year: 20 },
  { month: 4, year: 20 },
  { month: 5, year: 20 },
  { month: 6, year: 20 },
  { month: 7, year: 20 },
  { month: 8, year: 20 },
];

export const mockPopulationChartData = {
  datasets: [
    { label: "Prison Population", data: mockDataPoints(400, 800, 13) },
    { label: "Probation Population", data: mockDataPoints(320, 500, 13) },
    { label: "Parole Population", data: mockDataPoints(350, 50, 13) },
  ],
  labels: mockLabels,
};

export const mockPrisonAdmissionsChartData = {
  datasets: [
    { label: "Total Prison Admissions", data: mockDataPoints(200, 500, 13) },
    { label: "New Court Admissions", data: mockDataPoints(100, 180, 13) },
    { label: "Parole Revocations", data: mockDataPoints(300, 500, 13) },
    { label: "Probation Revocations", data: mockDataPoints(20, 120, 13) },
  ],
  labels: mockLabels,
};

export const mockReleasesChartData = {
  datasets: [{ label: "Releases", data: mockDataPoints(200, 800, 13) }],
  labels: mockLabels,
};
