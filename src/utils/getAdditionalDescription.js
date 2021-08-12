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

import getIsUnified from "./getIsUnified";
import states from "../constants/states";

const whenStatesAbolishedParole = { US_DE: "1990", US_ME: "1976" };

const publishedButNotYetAcquired = ["US_IA", "US_MN", "US_ND", "US_NM"];

const getAdditionalDescription = (stateCode) => {
  const descriptions = [];
  if (getIsUnified(stateCode)) {
    descriptions.push(
      `This state operates a "unified corrections system," which combines the jail and prison systems. As such, some of the numbers below may include pretrial populations.`
    );
  }
  if (stateCode in whenStatesAbolishedParole) {
    descriptions.push(
      `Note: ${states[stateCode]} abolished parole in ${whenStatesAbolishedParole[stateCode]}.`
    );
  }
  if (publishedButNotYetAcquired.includes(stateCode)) {
    descriptions.push(
      `Note: ${states[stateCode]} reports their prison population daily, but we do not currently have the ability to capture that data.`
    );
  }

  if (descriptions.length) {
    return descriptions.join(" ");
  }
  return null;
};

export default getAdditionalDescription;
