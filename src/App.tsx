import React, {useMemo, useState} from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { findOrThrow } from './array';
import {townHallLevels} from "./townHallLevels";
import {airDefenses, allDefences, Defence} from "./layout";
import { findSolutions } from './solver';

function getDefenceId(defence: Defence): string {
  return `${defence.type}-${defence.level}`
}

function App() {
  const [townHallLevel, setTownHallLevel] = useLocalStorage("townHallLevel", 8);
  const townHall = findOrThrow(townHallLevels, t => t.level === townHallLevel);
  const [defence, setDefence] = useState<Defence>(airDefenses[5])
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
            <select value={getDefenceId(defence)} onChange={e => {
              setDefence(
                findOrThrow(allDefences, d => getDefenceId(d) === e.target.value)
              )
            }}>
              {allDefences.map(a => (
                <option key={getDefenceId(a)} value={getDefenceId(a)}>
                  {a.type} Lvl {a.level} ({a.hitpoints.toLocaleString()}HP, TH level {a.townHallLevel})
                </option>
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
              <th rowSpan={2}>Space</th>
              <th rowSpan={2}>Damage</th>
            </tr>
            <tr>
            <th>
              Lightnings ({townHall.spellFactory.availableLightning.getDamage(defence, [])})
            </th>
            <th>
              Earthquakes{" "}
              ({townHall.spellFactory.availableEarthquake
              ? `${townHall.spellFactory.availableEarthquake.percent}% - ${townHall.spellFactory.availableEarthquake.getDamage(defence, [])}`
              : "N/A"})
            </th>
            <th>
              Lightnings{" "}
              {townHall.clanCastle
                ? `${townHall.clanCastle.availableLightning.getDamage(defence, [])}`
                : "N/A"}
            </th>
            <th>
            Earthquakes{" "}
              ({townHall.clanCastle?.availableEarthquake
              ? `${townHall.clanCastle.availableEarthquake.percent}% - ${townHall.clanCastle.availableEarthquake.getDamage(defence, [])}`
              : "N/A"})
            </th>
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
                <td>
                  {attack.spells.numLightning + attack.spells.numEarthquake +
                    attack.clanCastleSpells.numLightning + attack.clanCastleSpells.numEarthquake}
                </td>
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
