import * as crypto from 'crypto';

export const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 4096,
});
