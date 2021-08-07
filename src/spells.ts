import constant from "lodash/constant";
import type {Defence} from "./layout";

type SpellLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Spell {
  readonly level: SpellLevel;
  getDamage(defence: Defence, previousSpellHits: ReadonlyArray<Spell>): number;
}

interface LightningSpell extends Spell {
  readonly type: "lightning";
}

interface EarthquakeSpell extends Spell {
  readonly type: "earthquake";
  readonly percent: number;
}

function isEarthquakeSpell(spell: Spell): spell is EarthquakeSpell {
  return "type" in spell && (spell as any).type === "earthquake";
}

function createLightningSpell(level: SpellLevel, damage: number): LightningSpell {
  return {
    type: "lightning",
    level,
    getDamage: constant(damage)
  }
}

function getEarthquakeDamage(hitpoints: number, percent: number): number {
  return Math.floor(hitpoints * percent / 100);
}

function createEarthquakeSpell(level: SpellLevel, percent: number): EarthquakeSpell {
  return {
    type: "earthquake",
    level,
    percent,
    getDamage(defence: Defence, previousSpellHits: ReadonlyArray<Spell>): number {
      const remainingHitpoints: number = previousSpellHits
        .filter(isEarthquakeSpell)
        .reduce(
          (r, eq) => r - getEarthquakeDamage(r, eq.percent),
          defence.hitpoints
        );
      return getEarthquakeDamage(remainingHitpoints, percent);
    }
  }
}

const lightningSpells = Object.fromEntries([
  createLightningSpell(4, 240),
  createLightningSpell(5, 270),
  createLightningSpell(6, 320),
  createLightningSpell(7, 400),
  createLightningSpell(8, 480),
  createLightningSpell(9, 560)
].map(l => [l.level, l]));

const earthquakeSpells = Object.fromEntries([
  createEarthquakeSpell(2, 17),
  createEarthquakeSpell(3, 21),
  createEarthquakeSpell(4, 25),
  createEarthquakeSpell(5, 29)
].map(l => [l.level, l]));

export type { Spell, LightningSpell, EarthquakeSpell }
export { lightningSpells, earthquakeSpells }
