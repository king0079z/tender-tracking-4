export const isDevelopment = import.meta.env.DEV;

export const dbConfig = {
  // During development/migration, use Supabase
  development: {
    type: 'supabase',
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY
  },
  // In production, use Azure
  production: {
    type: 'azure',
    host: import.meta.env.VITE_AZURE_DB_HOST,
    database: import.meta.env.VITE_AZURE_DB_NAME,
    user: import.meta.env.VITE_AZURE_DB_USER,
    password: import.meta.env.VITE_AZURE_DB_PASSWORD,
    port: 5432,
    ssl: true
  }
};

export const getDbConfig = () => {
  return isDevelopment ? dbConfig.development : dbConfig.production;
};