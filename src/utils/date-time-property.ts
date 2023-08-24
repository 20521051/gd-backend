export const check = (input: string): boolean => {
  if (input.length < 8) {
    /* ex: 1/1/2002 have at least 8 characters */
    return false;
  }
  const parts = input.split('/');

  if (parts.length !== 3) {
    return false;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const maxDays = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDays) {
    return false;
  }

  return true;
};

export const format = (input: string): string => {
  const parts = input.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return `${0 < day && day < 10 ? '0' : ''}${day}/${0 < month && month < 10 ? '0' : ''}${month}/${year}`;
};
