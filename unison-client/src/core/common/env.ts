class EnvNotFoundError extends Error {
  constructor(envName: string) {
    super(`Environment variable ${envName} not found`);
  }
}

const tryGetEnv = (envName: string): string => {
  const env = import.meta.env[envName];
  if (!env) {
    // For production, it should not be ane error, but just error log for the case of missing env.
    throw new EnvNotFoundError(envName);
  }
  return env;
};

const envNames = {
  WorkerURL: 'VITE_WORKER_URL',
};

export const WorkerURL = tryGetEnv(envNames.WorkerURL);
