import * as crypto from 'crypto';

export const hash = (input: string): string => {
  return crypto.createHash('sha256').update(input).digest('hex');
};

export const verify = (input: string, hash: string): boolean => {
  return hash === crypto.createHash('sha256').update(input).digest('hex');
};
