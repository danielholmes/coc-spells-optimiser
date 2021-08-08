import React, { useMemo, useState } from '../_snowpack/pkg/react.js';
import useLocalStorage from '../_snowpack/pkg/react-use/lib/useLocalStorage.js';
import { findOrThrow } from './array.js';
import { townHallLevels } from "./townHallLevels.js";
import { airDefenses } from "./layout.js";
import { findSolutions } from './solver.js';

function App() {
  const [townHallLevel, setTownHallLevel] = useLocalStorage("townHallLevel", 8);
  const townHall = findOrThrow(townHallLevels, t => t.level === townHallLevel);
  const [defence, setDefence] = useState(airDefenses[6]);
  const solutions = useMemo(() => findSolutions(townHall, {
    defence
  }), [townHall, defence]);
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Town Hall", /*#__PURE__*/React.createElement("select", {
    value: townHallLevel,
    onChange: e => {
      setTownHallLevel(parseInt(e.target.value, 10));
    }
  }, townHallLevels.map(t => /*#__PURE__*/React.createElement("option", {
    key: t.level,
    value: t.level
  }, t.level))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Air Defence", /*#__PURE__*/React.createElement("select", {
    value: defence.level,
    onChange: e => {
      setDefence(airDefenses[parseInt(e.target.value, 10)]);
    }
  }, Object.values(airDefenses).map(a => /*#__PURE__*/React.createElement("option", {
    key: a.level,
    value: a.level
  }, "Air Defence Lvl ", a.level, " (", a.hitpoints.toLocaleString(), "HP)"))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Solutions"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    rowSpan: 2
  }, "Score"), /*#__PURE__*/React.createElement("th", {
    colSpan: 2
  }, "Spell Factory"), /*#__PURE__*/React.createElement("th", {
    colSpan: 2
  }, "Clan Castle"), /*#__PURE__*/React.createElement("th", {
    rowSpan: 2
  }, "Damage")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Lightnings"), /*#__PURE__*/React.createElement("th", null, "Earthquakes"), /*#__PURE__*/React.createElement("th", null, "Lightnings"), /*#__PURE__*/React.createElement("th", null, "Earthquakes"))), /*#__PURE__*/React.createElement("tbody", null, solutions.map(({
    score,
    damage,
    attack
  }, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, score), /*#__PURE__*/React.createElement("td", null, attack.spells.numLightning), /*#__PURE__*/React.createElement("td", null, attack.spells.numEarthquake), /*#__PURE__*/React.createElement("td", null, attack.clanCastleSpells.numLightning), /*#__PURE__*/React.createElement("td", null, attack.clanCastleSpells.numEarthquake), /*#__PURE__*/React.createElement("td", null, damage.toLocaleString()))))))));
}

export default App;