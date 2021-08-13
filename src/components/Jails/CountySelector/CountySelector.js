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
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import Modal from "../../shared/Modal";
import County from "../../shared/County";

import "./CountySelector.scss";

const CountySelector = (counties, topCounties, stateName) => {
  const [open, setOpen] = useState(false);

  const isNoCounty = "County";

  const initialCountyName = topCounties.length ? topCounties[0].name : isNoCounty;
  const initialCountyCode = topCounties.length ? topCounties[0].code : isNoCounty;

  const [selectedCountyName, setSelectedCountyName] = useState(initialCountyName);
  const [selectedCountyCode, setSelectedCountyCode] = useState(initialCountyCode);

  const [viewedCountyName, setViewedCountyName] = useState(initialCountyName);
  const [viewedCountyCode, setViewedCountyCode] = useState(initialCountyCode);

  const createOnSelect = useCallback(
    (name, code) => () => {
      setSelectedCountyName(name);
      setSelectedCountyCode(code);
    },
    []
  );

  const createOnChange = useCallback(() => {
    setViewedCountyName(selectedCountyName);
    setViewedCountyCode(selectedCountyCode);
    setOpen(!open);
  }, [open, selectedCountyName, selectedCountyCode]);

  return {
    countySelectorComponent: counties.length ? (
      <span className="CountySelector">
        <button className="CountySelector__button" type="button" onClick={() => setOpen(!open)}>
          (Switch counties)
        </button>
        <Modal isShowing={open} hide={() => setOpen(false)}>
          <h1 className="CountySelector__title">{`Counties in ${stateName}`}</h1>
          <div className="CountySelector__subtitle">
            Select a county below and click “View County” to see the trend of the county’s jail
            confinement rate over time.
            <br /> Counties are arranged in alphabetical order. Some counties cannot be selected due
            to missing data; see FAQs and Methodology for more details.
          </div>
          <div className="CountySelector__body-content">
            {counties.map((county) => (
              <County
                key={county.name}
                name={county.name}
                population={county.population}
                isNoData={county.isNoData}
                isSelected={selectedCountyName}
                onClick={createOnSelect(county.name, county.code)}
              />
            ))}
          </div>
          <div className="CountySelector__footer">
            <div className="CountySelector__footer-county">
              SELECTED COUNTY:&nbsp;
              <span className="CountySelector__footer-county--selected">{selectedCountyName}</span>
            </div>
            <button
              type="button"
              className="CountySelector__footer-button"
              onClick={createOnChange}
            >
              View County
            </button>
          </div>
        </Modal>
      </span>
    ) : null,
    selectorCountyCode: viewedCountyCode,
    selectorCountyName: viewedCountyName,
  };
};

CountySelector.propTypes = {
  stateName: PropTypes.string.isRequired,
  counties: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      population: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CountySelector;
