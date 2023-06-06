interface BaseDefence {
  readonly townHallLevel: number;
  readonly level: number;
  readonly hitpoints: number
}

interface AirDefence extends BaseDefence {
  readonly type: "air-defence";
}

interface InfernoTower extends BaseDefence {
  readonly type: "inferno-tower";
}

type Defence = AirDefence | InfernoTower;

interface DefenderLayout {
  readonly defence: Defence;
}

function createAirDefence(level: number, hitpoints: number, townHallLevel: number): AirDefence {
  return {
    type: "air-defence",
    level,
    hitpoints,
    townHallLevel
  }
}

const airDefenses = [
  createAirDefence(1, 800, 4),
  createAirDefence(2, 850, 4),
  createAirDefence(3, 900, 5),
  createAirDefence(4, 950, 6),
  createAirDefence(5, 1000, 7),
  createAirDefence(6, 1050, 8),
  createAirDefence(7, 1100, 9),
  createAirDefence(8, 1210, 10),
  createAirDefence(9, 1300, 11),
  createAirDefence(10, 1400, 12),
  createAirDefence(11, 1500, 13),
  createAirDefence(12, 1650, 14),
  createAirDefence(13, 1750, 15),
];

function createInfernoTower(level: number, hitpoints: number, townHallLevel: number): InfernoTower {
  return {
    type: "inferno-tower",
    level,
    hitpoints,
    townHallLevel
  }
}

const infernoTowers = [
  createInfernoTower(1, 1_500, 10),
  createInfernoTower(2, 1_800, 10),
  createInfernoTower(3, 2_100, 10),
  createInfernoTower(4, 2_400, 11),
  createInfernoTower(5, 2_700, 11),
  createInfernoTower(6, 3_000, 12),
  createInfernoTower(7, 3_300, 13),
  createInfernoTower(8, 3_700, 14),
  createInfernoTower(9, 4_000, 15),
];

const allDefences = [
  ...airDefenses,
  ...infernoTowers
]

export type { Defence, DefenderLayout }
export { airDefenses, infernoTowers, allDefences }
