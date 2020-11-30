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
import KeyInsights from "./KeyInsights";

import "./App.scss";

const App = () => (
  <section className="App">
    <header className="App__header">
      <h1 className="App__title">Colorado Data Dashboard</h1>
      <p className="App__description">
        The following is a broad overview of the corrections system in Colorado, representing the
        up-to-date data and changes compared to last year (September 2019 to September 2020). Two
        additional sections containing crime and jail indicators will be added at a later date.
      </p>
    </header>
    <KeyInsights />
  </section>
);

export default App;
