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
import { sourcesPropTypes } from "./propTypes";

import "./Sources.scss";

const Sources = ({ data }) => {
  const sourcesText = data.reduce((acc, { name, links }, index) => {
    if (data.length > 1 && index === data.length - 1) {
      acc.push("and");
    } else if (index !== 0) {
      acc.push(",");
    }

    acc.push(` ${name} (`);

    links.forEach((link, linkIndex) => {
      acc.push(
        <a target="_blank" rel="noreferrer" className="Sources__link" href={link}>
          link {linkIndex + 1}
        </a>
      );
      if (linkIndex !== links.length - 1) {
        acc.push(",");
      }
    });

    acc.push(") ");

    return acc;
  }, []);

  return (
    <div className="Sources">
      <h2 className="Sources__title">Sources</h2>
      {!data.length ? (
        <p className="Sources__no-data">No public sources available.</p>
      ) : (
        <p className="Sources__data">
          All data for these visualizations was from public reports published by the {sourcesText}
        </p>
      )}
    </div>
  );
};

Sources.propTypes = {
  data: sourcesPropTypes.isRequired,
};

export default Sources;
