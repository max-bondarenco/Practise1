export const ALPHABETS = [
  'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ',
  'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789'
];

export const encryptCaesar = (content: string, data: any) => {
  const { key } = data;
  let newContent = '';

  outer: for (const char of content) {
    for (const alphabet of ALPHABETS) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) continue;
      newContent += alphabet[(idx + key) % alphabet.length];
      continue outer;
    }
    newContent += char;
  }

  return newContent;
};

export const decryptCaesar = (content: string, data: any) => {
  const { key } = data;
  let newContent = '';

  outer: for (const char of content) {
    for (const alphabet of ALPHABETS) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) continue;
      newContent += alphabet[(idx - key + alphabet.length) % alphabet.length];
      continue outer;
    }
    newContent += char;
  }

  return newContent;
};
