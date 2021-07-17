export enum ENV_KEYS {
  DBUSERNAME = 'DBUSERNAME',
  DBPASSWORD = 'DBPASSWORD',
  DBNAME = 'DBNAME',
}

export const getEnvVariable = (key: ENV_KEYS): string => {
  return process.env[key] || '';
};
