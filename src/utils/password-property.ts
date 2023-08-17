import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hash_password = (password: string): string => {
  return bcrypt.hashSync(password, saltRounds);
};

export const compare_password = (password: string, hash: string): boolean => {
  return bcrypt.compare(password, hash);
};

export const check_password = (input: string): boolean => {
  if (input.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(input)) {
    return false;
  }
  if (!/[a-z]/.test(input)) {
    return false;
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(input)) {
    return false;
  }
  return true;
};
