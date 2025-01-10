import { AzureDatabase } from './azure';

export const db = AzureDatabase.getInstance();

export async function initializeDatabase() {
  try {
    await db.connect();
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}