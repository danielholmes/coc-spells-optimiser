interface SpellComposition {
  readonly numLightning: number;
  readonly numEarthquake: number;
}

const emptySpellComposition: SpellComposition = {
  numLightning: 0,
  numEarthquake: 0
}

interface Attack {
  readonly clanCastleSpells: SpellComposition;
  readonly spells: SpellComposition;
}

function totalCompositionSpells(composition: SpellComposition): number {
  return composition.numLightning + composition.numEarthquake
}

function totalEarthquakeSpells(attack: Attack): number {
  return attack.spells.numEarthquake + attack.clanCastleSpells.numEarthquake
}

function totalAttackSpells(attack: Attack): number {
  return totalCompositionSpells(attack.spells) +
    totalCompositionSpells(attack.clanCastleSpells);
}

export type { Attack, SpellComposition }
export { totalAttackSpells, emptySpellComposition, totalCompositionSpells, totalEarthquakeSpells }
