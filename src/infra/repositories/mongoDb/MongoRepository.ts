import { MongoClient, Db } from 'mongodb';

export const DUPLICATE_KEY_ERROR_CODE = 11000;

// This class must be use as a singleton and injected in other mongo repos
export class MongoRepository {
  dbName: string;
  client: MongoClient;
  database: Db;

  constructor(connectionString: string, dbName: string) {
    this.dbName = dbName;
    this.client = new MongoClient(connectionString);
  }

  public getDatabase() {
    return this.client.db(this.dbName);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public close() {
    this.client.close();
  }

  static formatConnectionString(dbUserName: string, dbPassword: string) {
    return `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.pvqlc.mongodb.net/retryWrites=true&w=majority`;
  }
}
