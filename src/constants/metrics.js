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
export const ADMISSIONS = "ADMISSIONS";
export const ADMISSIONS_NEW_COURT = "ADMISSIONS_NEW_COURT";
export const ADMISSIONS_REVOCATIONS_PAROLE = "ADMISSIONS_REVOCATIONS_PAROLE";
export const ADMISSIONS_REVOCATIONS_PROBATION = "ADMISSIONS_REVOCATIONS_PROBATION";
export const POPULATION_PAROLE = "POPULATION_PAROLE";
export const POPULATION_PRISON = "POPULATION_PRISON";
export const POPULATION_PROBATION = "POPULATION_PROBATION";
export const RELEASES = "RELEASES";

export const metricToChartName = {
  [POPULATION_PRISON]: "Prison Population",
  [POPULATION_PAROLE]: "Parole Population",
  [POPULATION_PROBATION]: "Probation Population",

  [ADMISSIONS]: "Total Prison Admissions",
  [ADMISSIONS_NEW_COURT]: "New Court Admissions",
  [ADMISSIONS_REVOCATIONS_PAROLE]: "Parole Revocations",
  [ADMISSIONS_REVOCATIONS_PROBATION]: "Probation Revocations",

  [RELEASES]: "Releases",
};
