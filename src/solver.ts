import range from "lodash/range";
import flatMap from "lodash/flatMap";
import reverse from "lodash/reverse";
import sortBy from "lodash/sortBy";
import {
  Attack, emptySpellComposition,
  SpellComposition,
  totalAttackSpells,
  totalCompositionSpells,
  totalEarthquakeSpells
} from "./attack";
import type {DefenderLayout} from "./layout";
import type {SpellCapacity, TownHallLevel} from "./townHallLevels";
import {createArrayOf} from "./array";
import {Spell} from "./spells";

function findAllSpellPermutationsForAmount(
  capacity: SpellCapacity,
  amount: number
): ReadonlyArray<SpellComposition> {
  return range(0, amount + 1).map(numLightning => ({
    numLightning,
    numEarthquake: amount - numLightning
  }))
}

function findAllSpellPermutations(
  capacity: SpellCapacity
): ReadonlyArray<SpellComposition> {
  return flatMap(
    range(0, capacity.amount + 1)
      .map(amount => findAllSpellPermutationsForAmount(
        capacity,
        amount
      ))
  )
}

function findAllAttackPermutations(
  townHallLevel: TownHallLevel
): ReadonlyArray<Attack> {
  const spellFactoryPermutations = findAllSpellPermutations(
    townHallLevel.spellFactory,
  );
  const clanCastlePermutations = townHallLevel.clanCastle ? findAllSpellPermutations(
    townHallLevel.clanCastle,
  ) : [emptySpellComposition];
  return flatMap(
    clanCastlePermutations.map(
      clanCastleSpells => spellFactoryPermutations.map(spells => ({
        spells,
        clanCastleSpells
      }))
    )
  )
}

function getSpellCompositionDamage(
  townHallLevel: TownHallLevel,
  attack: Attack,
  layout: DefenderLayout
): number {
  const spells = [
    // CC Earthquake before spell factory is a bigger effect
    ...((townHallLevel.clanCastle && townHallLevel.clanCastle.availableEarthquake)
      ? createArrayOf(
        attack.clanCastleSpells.numEarthquake,
        townHallLevel.clanCastle.availableEarthquake
      )
      : []
    ),
    ...(townHallLevel.spellFactory.availableEarthquake ? createArrayOf(
      attack.spells.numEarthquake,
      townHallLevel.spellFactory.availableEarthquake
    ) : []),
    ...(townHallLevel.clanCastle ? createArrayOf(
      attack.clanCastleSpells.numLightning,
      townHallLevel.clanCastle.availableLightning
    ) : []),
    ...createArrayOf(
      attack.spells.numLightning,
      townHallLevel.spellFactory.availableLightning
    )
  ];
  return spells.reduce(
    (p, e) => ({
      totalDamage: p.totalDamage + e.getDamage(layout.defence, p.previousHits),
      previousHits: [...p.previousHits, e]
    }),
    { totalDamage: 0, previousHits: [] as ReadonlyArray<Spell> }
  ).totalDamage;
}

interface Solution {
  readonly attack: Attack;
  readonly damage: number;
  readonly score: number;
}

function scoreAttack(townHallLevel: TownHallLevel, attack: Attack): number {
  let score = 100 - totalAttackSpells(attack)
  // If a town hall level can't create spells as powerful as cc spells, then there's value in
  // freeing up the cc for other spell types.
  if (
    townHallLevel.clanCastle &&
    (
      (attack.clanCastleSpells.numLightning > 0 &&
      townHallLevel.clanCastle.availableLightning.level >
      townHallLevel.spellFactory.availableLightning.level) ||
      (townHallLevel.clanCastle.availableEarthquake &&
        townHallLevel.spellFactory.availableEarthquake &&
        attack.clanCastleSpells.numEarthquake > 0 &&
        townHallLevel.clanCastle.availableEarthquake.level >
        townHallLevel.spellFactory.availableEarthquake.level)
    )
  ) {
    score -= (totalCompositionSpells(attack.clanCastleSpells) * 10)
  }
  // Earthquakes are easier to aim and have a wider spread so will hit more buildings
  score += (totalEarthquakeSpells(attack)) * 5;
  // TODO: Lightning and Eq spell damage should be taken into account, since it will hit other
  // buildings. eq damage should perhaps be given more weight
  return score;
}

function findSolutions(townHallLevel: TownHallLevel, layout: DefenderLayout): ReadonlyArray<Solution> {
  const permutations = findAllAttackPermutations(
    townHallLevel
  );
  const permutationSolutions = permutations.map(attack => ({
    attack,
    damage: getSpellCompositionDamage(townHallLevel, attack, layout)
  }))
  const destroyPermutations = permutationSolutions.filter(
    s => s.damage >= layout.defence.hitpoints
  );
  const minimumSpellCount = Math.min(
    ...destroyPermutations.map(s => totalAttackSpells(s.attack))
  )
  const lowestSpellCountPermutations = destroyPermutations.filter(
    s => totalAttackSpells(s.attack) <= minimumSpellCount
  );
  const solutionsWithScore = lowestSpellCountPermutations.map(s => ({
    ...s,
    score: scoreAttack(townHallLevel, s.attack)
  }))
  return reverse(
    sortBy(
      solutionsWithScore,
      "score"
    )
  )
}

export { findSolutions }
