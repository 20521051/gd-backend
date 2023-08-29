import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export const hash = (input: string): string => {
  return bcrypt.hashSync(input, saltRounds);
};

export const verify = async (property: { input: string; hash: string }): Promise<boolean> => {
  return await bcrypt.compare(property.input, property.hash);
};
