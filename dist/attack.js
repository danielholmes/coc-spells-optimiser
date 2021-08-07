const emptySpellComposition = {
  numLightning: 0,
  numEarthquake: 0
};
function totalCompositionSpells(composition) {
  return composition.numLightning + composition.numEarthquake;
}
function totalEarthquakeSpells(attack) {
  return attack.spells.numEarthquake + attack.clanCastleSpells.numEarthquake;
}
function totalAttackSpells(attack) {
  return totalCompositionSpells(attack.spells) + totalCompositionSpells(attack.clanCastleSpells);
}
export {totalAttackSpells, emptySpellComposition, totalCompositionSpells, totalEarthquakeSpells};
