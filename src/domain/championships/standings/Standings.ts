import { Standing } from './Standing';

export class Standings {
  standings: Record<string, number>;

  constructor(standings: Record<string, number>) {
    this.standings = standings;
  }

  updateStandings(id: string, pointsToBeAdded: number): void {
    const currentPoints = this.standings[id] || 0;
    this.standings[id] = currentPoints + pointsToBeAdded;
  }

  orderByPoints(): Array<Standing> {
    const standingKeys = Object.keys(this.standings);
    const standings: Array<Standing> = standingKeys.map((standingKey) => {
      return {
        id: standingKey,
        points: this.standings[standingKey],
      };
    });

    return standings.sort((standing, otherStanding) => {
      if (standing.points < otherStanding.points) {
        return 1;
      }
      if (standing.points > otherStanding.points) {
        return -1;
      }
      return 0;
    });
  }
}
