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
const formatPercent = (percent, isPassive) => {
  const isPositive = percent >= 0;
  let formattedPercent = Math.round(Math.abs(percent));

  if (formattedPercent === 0) {
    formattedPercent = "~0";
  }

  if (isPassive) {
    return isPositive
      ? `increased ${formattedPercent} percent`
      : `declined ${formattedPercent} percent`;
  }

  return `a ${formattedPercent} percent ${isPositive ? "increase" : "decline"}`;
};

export default formatPercent;
