import constant from "../_snowpack/pkg/lodash/constant.js";

function isEarthquakeSpell(spell) {
  return "type" in spell && spell.type === "earthquake";
}

function createLightningSpell(level, damage) {
  return {
    type: "lightning",
    level,
    getDamage: constant(damage)
  };
}

function getEarthquakeDamage(hitpoints, percent) {
  return Math.floor(hitpoints * percent / 100);
}

function createEarthquakeSpell(level, percent) {
  return {
    type: "earthquake",
    level,
    percent,

    getDamage(defence, previousSpellHits) {
      const remainingHitpoints = previousSpellHits.filter(isEarthquakeSpell).reduce((r, eq) => r - getEarthquakeDamage(r, eq.percent), defence.hitpoints);
      return getEarthquakeDamage(remainingHitpoints, percent);
    }

  };
}

const lightningSpells = Object.fromEntries([createLightningSpell(4, 240), createLightningSpell(5, 270), createLightningSpell(6, 320), createLightningSpell(7, 400), createLightningSpell(8, 480), createLightningSpell(9, 560)].map(l => [l.level, l]));
const earthquakeSpells = Object.fromEntries([createEarthquakeSpell(2, 17), createEarthquakeSpell(3, 21), createEarthquakeSpell(4, 25), createEarthquakeSpell(5, 29)].map(l => [l.level, l]));
export { lightningSpells, earthquakeSpells };