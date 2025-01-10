import { Client } from 'pg';

export class AzureDatabase {
  private client: Client;
  private static instance: AzureDatabase;

  private constructor() {
    this.client = new Client({
      host: import.meta.env.VITE_AZURE_DB_HOST,
      database: import.meta.env.VITE_AZURE_DB_NAME,
      user: import.meta.env.VITE_AZURE_DB_USER,
      password: import.meta.env.VITE_AZURE_DB_PASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false // Required for Azure Database for PostgreSQL
      }
    });
  }

  static getInstance() {
    if (!AzureDatabase.instance) {
      AzureDatabase.instance = new AzureDatabase();
    }
    return AzureDatabase.instance;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to Azure Database');
    } catch (error) {
      console.error('Failed to connect to Azure Database:', error);
      throw error;
    }
  }

  async query(text: string, params?: any[]) {
    try {
      return await this.client.query(text, params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async end() {
    await this.client.end();
  }
}

export const db = AzureDatabase.getInstance();