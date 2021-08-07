import React, {useMemo, useState} from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { findOrThrow } from './array';
import {townHallLevels} from "./townHallLevels";
import {airDefenses} from "./layout";
import { findSolutions } from './solver';

function App() {
  const [townHallLevel, setTownHallLevel] = useLocalStorage("townHallLevel", 8);
  const townHall = findOrThrow(townHallLevels, t => t.level === townHallLevel);
  const [defence, setDefence] = useState(airDefenses[6])
  const solutions = useMemo(
    () => findSolutions(
      townHall,
      { defence }
    ),
    [townHall, defence]
  );

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>Town Hall
            <select value={townHallLevel} onChange={e => {
              setTownHallLevel(parseInt(e.target.value, 10))
            }}>
              {townHallLevels.map(t => (
                <option key={t.level} value={t.level}>{t.level}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Air Defence
            <select value={defence.level} onChange={e => {
              setDefence(airDefenses[parseInt(e.target.value, 10)])
            }}>
              {Object.values(airDefenses).map(a => (
                <option key={a.level} value={a.level}>Air Defence Lvl {a.level} ({a.hitpoints.toLocaleString()}HP)</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <h3>Solutions</h3>
          <table>
            <thead>
            <tr>
              <th rowSpan={2}>Score</th>
              <th colSpan={2}>Spell Factory</th>
              <th colSpan={2}>Clan Castle</th>
              <th rowSpan={2}>Damage</th>
            </tr>
            <tr>
            <th>Lightnings</th>
            <th>Earthquakes</th>
            <th>Lightnings</th>
            <th>Earthquakes</th>
            </tr>
            </thead>
            <tbody>
            {solutions.map(({ score, damage, attack }, i) => (
              <tr key={i}>
                <td>{score}</td>
                <td>{attack.spells.numLightning}</td>
                <td>{attack.spells.numEarthquake}</td>
                <td>{attack.clanCastleSpells.numLightning}</td>
                <td>{attack.clanCastleSpells.numEarthquake}</td>
                <td>{damage.toLocaleString()}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
