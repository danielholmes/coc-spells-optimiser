function createAirDefence(level, hitpoints) {
  return {
    type: "air-defence",
    level,
    hitpoints
  };
}
const airDefenses = Object.fromEntries([
  createAirDefence(1, 800),
  createAirDefence(2, 850),
  createAirDefence(3, 900),
  createAirDefence(4, 950),
  createAirDefence(5, 1e3),
  createAirDefence(6, 1050),
  createAirDefence(7, 1100),
  createAirDefence(8, 1210),
  createAirDefence(9, 1300),
  createAirDefence(10, 1400),
  createAirDefence(11, 1500),
  createAirDefence(12, 1600)
].map((a) => [a.level, a]));
export {airDefenses};
