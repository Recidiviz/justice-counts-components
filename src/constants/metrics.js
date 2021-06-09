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
export const ADMISSIONS = "ADMISSIONS";
export const ADMISSIONS_NEW_COMMITMENTS = "ADMISSIONS_NEW_COMMITMENTS";
export const SUPERVISION_STARTS_PROBATION = "SUPERVISION_STARTS_PROBATION";
export const ADMISSIONS_FROM_PAROLE = "ADMISSIONS_FROM_PAROLE";
export const ADMISSIONS_FROM_PAROLE_NEW_CRIME = "ADMISSIONS_FROM_PAROLE_NEW_CRIME";
export const ADMISSIONS_FROM_PROBATION = "ADMISSIONS_FROM_PROBATION";
export const ADMISSIONS_FROM_PROBATION_NEW_CRIME = "ADMISSIONS_FROM_PROBATION_NEW_CRIME";
export const POPULATION_PAROLE = "POPULATION_PAROLE";
export const POPULATION_PRISON = "POPULATION_PRISON";
export const POPULATION_PROBATION = "POPULATION_PROBATION";
export const RELEASES_TO_PAROLE = "RELEASES_TO_PAROLE";
export const RELEASES_COMPLETED = "RELEASES_COMPLETED";
export const ADMISSIONS_FROM_PAROLE_TECHNICAL = "ADMISSIONS_FROM_PAROLE_TECHNICAL";
export const ADMISSIONS_FROM_PROBATION_TECHNICAL = "ADMISSIONS_FROM_PROBATION_TECHNICAL";

export const metricToCardName = {
  [ADMISSIONS_NEW_COMMITMENTS]: "New Prison Commitments",
  [SUPERVISION_STARTS_PROBATION]: "New Probation Commitments",
  [POPULATION_PROBATION]: "Probation Population",
  [ADMISSIONS_FROM_PROBATION]: "Probation Revocations",
  [POPULATION_PRISON]: "Prison Population",
  [POPULATION_PAROLE]: "Parole Population",
  [ADMISSIONS_FROM_PAROLE]: "Parole Revocations",
  [RELEASES_TO_PAROLE]: "Releases to Parole",
  [ADMISSIONS_FROM_PAROLE_TECHNICAL]: "Parole Revocations (Technical)",
  [ADMISSIONS_FROM_PROBATION_TECHNICAL]: "Probation Revocations (Technical)",
};
