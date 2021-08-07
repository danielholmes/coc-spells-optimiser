import {EarthquakeSpell, earthquakeSpells, LightningSpell, lightningSpells, Spell} from "./spells";

interface SpellCapacity {
  readonly amount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  readonly availableLightning: LightningSpell;
  readonly availableEarthquake?: EarthquakeSpell;
}

interface TownHallLevel {
  readonly level: number;
  readonly spellFactory: SpellCapacity;
  readonly clanCastle?: SpellCapacity;
}

const townHallLevels: ReadonlyArray<TownHallLevel> = [
  {
    level: 7,
    spellFactory: {
      amount: 6,
      availableLightning: lightningSpells[4]
    }
  },
  {
    level: 8,
    spellFactory: {
      amount: 7,
      availableLightning: lightningSpells[5],
      availableEarthquake: earthquakeSpells[2]
    },
    clanCastle: {
      amount: 1,
      availableLightning: lightningSpells[7],
      availableEarthquake: earthquakeSpells[4]
    }
  },
  {
    level: 9,
    spellFactory: {
      amount: 9,
      availableLightning: lightningSpells[6],
      availableEarthquake: earthquakeSpells[3]
    },
    clanCastle: {
      amount: 1,
      availableLightning: lightningSpells[8],
      availableEarthquake: earthquakeSpells[5]
    }
  },
  {
    level: 10,
    spellFactory: {
      amount: 11,
      availableLightning: lightningSpells[7],
      availableEarthquake: earthquakeSpells[4]
    },
    clanCastle: {
      amount: 1,
      availableLightning: lightningSpells[9],
      availableEarthquake: earthquakeSpells[5]
    }
  },
  {
    level: 11,
    spellFactory: {
      amount: 11,
      availableLightning: lightningSpells[8],
      availableEarthquake: earthquakeSpells[5]
    },
    clanCastle: {
      amount: 2,
      availableLightning: lightningSpells[9],
      availableEarthquake: earthquakeSpells[5]
    }
  },
  {
    level: 12,
    spellFactory: {
      amount: 11,
      availableLightning: lightningSpells[9],
      availableEarthquake: earthquakeSpells[5]
    },
    clanCastle: {
      amount: 2,
      availableLightning: lightningSpells[9],
      availableEarthquake: earthquakeSpells[5]
    }
  },
  {
    level: 13,
    spellFactory: {
      amount: 11,
      availableLightning: lightningSpells[9],
      availableEarthquake: earthquakeSpells[5]
    },
    clanCastle: {
      amount: 2,
      availableLightning: lightningSpells[9],
      availableEarthquake: earthquakeSpells[5]
    }
  }
]

export type { TownHallLevel, SpellCapacity };
export { townHallLevels }
