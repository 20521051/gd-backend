import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hash = (password: string): string => {
  return bcrypt.hashSync(password, saltRounds);
};

export const verify = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const check = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return false;
  }
  return true;
};
