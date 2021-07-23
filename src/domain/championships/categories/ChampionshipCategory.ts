interface IChampionshipCategory {
  positionPoints: Record<number, number>;
  pointsForPolePosition: number;
  pointsForBestRaceTime: number;
  defaultPoints: number;
}

export class ChampionshipCategory {
  positionPoints: Record<number, number>;
  pointsForPolePosition: number;
  pointsForBestRaceTime: number;
  defaultPoints: number;

  constructor(category: IChampionshipCategory) {
    this.positionPoints = category.positionPoints;
    this.pointsForPolePosition = category.pointsForPolePosition;
    this.pointsForBestRaceTime = category.pointsForBestRaceTime;
    this.defaultPoints = category.defaultPoints;
  }

  getPointsFromPosition(position: number): number {
    return this.positionPoints[position] || this.defaultPoints;
  }
}
