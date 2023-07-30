import { WorkerURL } from '../common/env';

export const ping = async () => {
  const res = await fetch(`${WorkerURL}/ping`);
  try {
    res.text();
  } catch {
    return new Error('ping failed');
  }
};
