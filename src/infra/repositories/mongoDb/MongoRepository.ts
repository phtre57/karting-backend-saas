import { MongoClient, Db } from 'mongodb';

// This class must be use as a singleton and injected in other mongo repos
export class MongoRepository {
  dbName: string;
  client: MongoClient;
  database: Db;

  constructor(connectionString: string, dbName: string) {
    this.dbName = dbName;
    this.client = new MongoClient(connectionString);
    this.client.connect();
  }

  public getDatabase() {
    return this.client.db(this.dbName);
  }

  public close() {
    this.client.close();
  }
}
