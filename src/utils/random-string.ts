export function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]:;<>,.?~\\/-';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
