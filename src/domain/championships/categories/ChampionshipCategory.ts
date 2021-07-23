import { RaceResults } from '../races/results';

interface IChampionshipCategory {
  positionPoints: Record<number, number>;
  qualifyingPositionPoints: Record<number, number>;
  pointsForBestRaceTime: number;
  defaultRacePoints: number;
  defaultQualifyingPoints: number;
}

export class ChampionshipCategory {
  positionPoints: Record<number, number>;
  qualifyingPositionPoints: Record<number, number>;
  pointsForBestRaceTime: number;
  defaultRacePoints: number;
  defaultQualifyingPoints: number;

  constructor(category: IChampionshipCategory) {
    this.positionPoints = category.positionPoints;
    this.qualifyingPositionPoints = category.qualifyingPositionPoints;
    this.pointsForBestRaceTime = category.pointsForBestRaceTime;
    this.defaultRacePoints = category.defaultRacePoints;
    this.defaultQualifyingPoints = category.defaultQualifyingPoints;
  }

  getPointsFromResult(result: RaceResults): number {
    return (
      this.getPointsFromPosition(result.racePosition) +
      this.getPointsFromQualifying(result.qualifyingPosition) -
      result.penaltyPoints
    );
  }

  getPointsFromPosition(position: number): number {
    return this.positionPoints[position] || this.defaultRacePoints;
  }

  getPointsFromQualifying(position: number): number {
    return (
      this.qualifyingPositionPoints[position] || this.defaultQualifyingPoints
    );
  }
}
