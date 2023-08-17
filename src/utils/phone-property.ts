export const check_phone_number = (input: string): boolean => {
  if (input.length !== 10) {
    return false;
  }

  if (input[0] !== '0') {
    return false;
  }

  return true;
};
