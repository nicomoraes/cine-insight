type GenerateRandonKeyOptions = {
  length?: number;
  prefix?: string;
};

export function generateRandonKey({ length = 10, prefix }: GenerateRandonKeyOptions) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  if (prefix) result = `${prefix}_${result}`;

  return result;
}
