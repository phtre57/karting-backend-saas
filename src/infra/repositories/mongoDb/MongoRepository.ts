import { MongoClient, Db } from 'mongodb';

export class MongoRepository {
  dbName: string;
  client: MongoClient;
  database: Db;

  constructor(connectionString: string, dbName: string) {
    this.dbName = dbName;
    this.client = new MongoClient(connectionString);
  }

  protected getDatabase() {
    this.client.connect();
    return this.client.db(this.dbName);
  }

  protected close() {
    this.client.close();
  }
}
