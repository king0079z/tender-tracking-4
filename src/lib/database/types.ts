export interface DatabaseConfig {
  type: 'supabase' | 'custom';
  url: string;
  credentials: {
    [key: string]: string;
  };
}

export interface DatabaseProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T>;
  transaction<T>(callback: () => Promise<T>): Promise<T>;
}

export interface DatabaseConnection {
  provider: DatabaseProvider;
  config: DatabaseConfig;
}