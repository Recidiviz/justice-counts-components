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
import React from "react";

import Modal from "../Modal";
import County from "./County";
import { countySelectorPropTypes } from "./propTypes";

import "./CountySelector.scss";

const CountySelector = ({ counties }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCounty, setSelectedCounty] = React.useState("");

  return (
    <>
      <button className="CountySelector" type="button" onClick={() => setOpen(true)}>
        (Switch counties)
      </button>
      <Modal
        isShowing={open}
        hide={() => setOpen(false)}
        title="Counties in Colorado"
        subtitle="Select a county below and click “View County” to see the trend of the county’s incarceration rate over time. Counties are arranged in alphabetical order."
        selectedCounty={selectedCounty}
      >
        {counties.map((county) => (
          <County
            key={county.name}
            name={county.name}
            population={county.population}
            isSelected={selectedCounty}
            onClick={() => setSelectedCounty(county.name)}
          >
            {county.name}
          </County>
        ))}
      </Modal>
    </>
  );
};

CountySelector.propTypes = {
  counties: countySelectorPropTypes.isRequired,
};

export default CountySelector;
