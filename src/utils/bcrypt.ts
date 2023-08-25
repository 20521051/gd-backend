import * as bcrypt from 'bcrypt';
import * as random from './random';

export const hash = (password: string): string => {
  const saltRounds = random.generateRandomNumber(8, 12);
  return bcrypt.hashSync(password, saltRounds);
};

export const verify = (property: { password: string; hash: string }) => {
  return bcrypt.compare(property.password, property.hash);
};
