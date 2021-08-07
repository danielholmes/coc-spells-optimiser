import range from "../_snowpack/pkg/lodash/range.js";
import flatMap from "../_snowpack/pkg/lodash/flatMap.js";
import reverse from "../_snowpack/pkg/lodash/reverse.js";
import sortBy from "../_snowpack/pkg/lodash/sortBy.js";
import {
  emptySpellComposition,
  totalAttackSpells,
  totalCompositionSpells,
  totalEarthquakeSpells
} from "./attack.js";
import {createArrayOf} from "./array.js";
function findAllSpellPermutationsForAmount(capacity, amount) {
  return range(0, amount + 1).map((numLightning) => ({
    numLightning,
    numEarthquake: amount - numLightning
  }));
}
function findAllSpellPermutations(capacity) {
  return flatMap(range(0, capacity.amount + 1).map((amount) => findAllSpellPermutationsForAmount(capacity, amount)));
}
function findAllAttackPermutations(townHallLevel) {
  const spellFactoryPermutations = findAllSpellPermutations(townHallLevel.spellFactory);
  const clanCastlePermutations = townHallLevel.clanCastle ? findAllSpellPermutations(townHallLevel.clanCastle) : [emptySpellComposition];
  return flatMap(clanCastlePermutations.map((clanCastleSpells) => spellFactoryPermutations.map((spells) => ({
    spells,
    clanCastleSpells
  }))));
}
function getSpellCompositionDamage(townHallLevel, attack, layout) {
  const spells = [
    ...townHallLevel.clanCastle && townHallLevel.clanCastle.availableEarthquake ? createArrayOf(attack.clanCastleSpells.numEarthquake, townHallLevel.clanCastle.availableEarthquake) : [],
    ...townHallLevel.spellFactory.availableEarthquake ? createArrayOf(attack.spells.numEarthquake, townHallLevel.spellFactory.availableEarthquake) : [],
    ...townHallLevel.clanCastle ? createArrayOf(attack.clanCastleSpells.numLightning, townHallLevel.clanCastle.availableLightning) : [],
    ...createArrayOf(attack.spells.numLightning, townHallLevel.spellFactory.availableLightning)
  ];
  return spells.reduce((p, e) => ({
    totalDamage: p.totalDamage + e.getDamage(layout.defence, p.previousHits),
    previousHits: [...p.previousHits, e]
  }), {totalDamage: 0, previousHits: []}).totalDamage;
}
function scoreAttack(townHallLevel, attack) {
  let score = 100 - totalAttackSpells(attack);
  if (townHallLevel.clanCastle && (attack.clanCastleSpells.numLightning > 0 && townHallLevel.clanCastle.availableLightning.level > townHallLevel.spellFactory.availableLightning.level || townHallLevel.clanCastle.availableEarthquake && townHallLevel.spellFactory.availableEarthquake && attack.clanCastleSpells.numEarthquake > 0 && townHallLevel.clanCastle.availableEarthquake.level > townHallLevel.spellFactory.availableEarthquake.level)) {
    score -= totalCompositionSpells(attack.clanCastleSpells) * 10;
  }
  score += totalEarthquakeSpells(attack) * 5;
  return score;
}
function findSolutions(townHallLevel, layout) {
  const permutations = findAllAttackPermutations(townHallLevel);
  const permutationSolutions = permutations.map((attack) => ({
    attack,
    damage: getSpellCompositionDamage(townHallLevel, attack, layout)
  }));
  const destroyPermutations = permutationSolutions.filter((s) => s.damage >= layout.defence.hitpoints);
  const minimumSpellCount = Math.min(...destroyPermutations.map((s) => totalAttackSpells(s.attack)));
  const lowestSpellCountPermutations = destroyPermutations.filter((s) => totalAttackSpells(s.attack) <= minimumSpellCount);
  const solutionsWithScore = lowestSpellCountPermutations.map((s) => ({
    ...s,
    score: scoreAttack(townHallLevel, s.attack)
  }));
  return reverse(sortBy(solutionsWithScore, "score"));
}
export {findSolutions};
