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
import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import useOnClickOutside from "use-onclickoutside";

import "./PeriodPicker.scss";

const PeriodPicker = ({ period, periods, onChange }) => {
  const ref = useRef();
  const [isOpened, setIsOpened] = useState(false);

  const currentPeriod = (
    periods.find(({ value, label }) => value === period.value && label === period.label) || {}
  ).label;

  const notChosenPeriods = periods.filter(
    ({ value, label }) => !(value === period.value && label === period.label)
  );

  const toggleOptions = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const closeOptions = useCallback(() => {
    setIsOpened(false);
  }, []);

  const createOnChange = useCallback(
    (v) => () => {
      onChange(v);
      closeOptions();
    },
    [onChange, closeOptions]
  );

  useOnClickOutside(ref, closeOptions);

  return (
    <div className="PeriodPicker" ref={ref}>
      <button
        type="button"
        className={cn("PeriodPicker__selected-value", {
          "PeriodPicker__selected-value--opened": isOpened,
        })}
        onClick={toggleOptions}
      >
        {currentPeriod}
      </button>
      {isOpened && (
        <div className="PeriodPicker__options">
          {notChosenPeriods.map(({ value, label }) => (
            <button
              type="button"
              key={`${value}-${label}`}
              className={cn("PeriodPicker__option", {
                "PeriodPicker__option--active": value === period.value && label === period.label,
              })}
              onClick={createOnChange({ value, label })}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const optionPropTypes = PropTypes.shape({ value: PropTypes.number, label: PropTypes.string });

PeriodPicker.propTypes = {
  period: optionPropTypes.isRequired,
  periods: PropTypes.arrayOf(optionPropTypes).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PeriodPicker;
