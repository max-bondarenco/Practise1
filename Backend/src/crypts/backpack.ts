const egcd = (a: number, b: number): { x: number; y: number; g: number } => {
  if (b === 0) return { x: 1, y: 0, g: a };
  const r = egcd(b, a % b);
  return { x: r.y, y: r.x - Math.floor(a / b) * r.y, g: r.g };
};

const modInv = (a: number, m: number): number => {
  const r = egcd(a, m);
  if (r.g !== 1) throw new Error('t has no modular inverse mod q');
  return ((r.x % m) + m) % m;
};

const intToBits = (x: number, n: number): number[] => {
  if (x < 0) throw new Error('intToBits requires non-negative integer');
  const s = x.toString(2).padStart(n, '0');
  return s.split('').map((ch) => parseInt(ch, 10));
};

const bitsToInt = (bits: number[]): number => {
  return parseInt(bits.join(''), 2);
};

const encryptBits = (bits: number[], publicKey: number[]): number => {
  if (bits.length !== publicKey.length)
    throw new Error('bits and public key lengths mismatch');
  return bits.reduce((acc, b, i) => acc + b * publicKey[i], 0);
};

const decryptBits = (
  c: number,
  privateKey: number[],
  tInv: number,
  q: number
): number[] => {
  let remaining = (c * tInv) % q;
  const n = privateKey.length;
  const bits = Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    if (privateKey[i] <= remaining) {
      bits[i] = 1;
      remaining -= privateKey[i];
    }
  }

  return bits;
};

const generatePrivateKey = (n: number, maxIncrement = 50): number[] => {
  if (n <= 0) throw new Error('n must be positive');
  const key: number[] = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const num = sum + Math.floor(Math.random() * maxIncrement) + 1;
    key.push(num);
    sum += num;
  }
  return key;
};

const generatePublicKey = (privateKey: number[], t: number, q: number) => {
  const sum = privateKey.reduce((acc, val) => acc + val, 0);

  if (sum >= q) throw new Error('q must be greater than sum(privateKey)');
  if (egcd(t, q).g !== 1) throw new Error('t and q must be coprime');

  return privateKey.map((e) => (e * t) % q);
};

export const generateKeyPair = (data: any) => {
  const { prKey, n, t, q } = data;
  if (!prKey && !n) throw new Error('Not enough inputs to generate key pair');

  const privateKey = n
    ? generatePrivateKey(n, 100)
    : prKey.split(',').map((a: any) => Number(a.trim()));
  const publicKey = generatePublicKey(privateKey, t, q);

  console.log(privateKey, publicKey);

  return { privateKey, publicKey };
};

export const encryptBackpack = (
  content: string,
  data: { pbKey: string | number[] }
): string => {
  const { pbKey } = data;
  let publicKey: number[];

  if (Array.isArray(pbKey)) publicKey = pbKey.map((x) => Number(x));
  else publicKey = pbKey.split(',').map((a) => Number(a.trim()));

  if (!publicKey || publicKey.length === 0) return content;

  const tokens: string[] = [];
  const n = publicKey.length;

  for (const char of content) {
    const code = char.charCodeAt(0);
    if (code >= 2 ** n)
      throw new Error(`Character code ${code} doesn't fit in ${n} bits`);
    const bits = intToBits(code, n);
    const c = encryptBits(bits, publicKey);
    tokens.push(c.toString());
  }

  return tokens.join(',');
};

export const decryptBackpack = (
  content: string,
  data: { prKey: string | number[]; t: number; q: number }
): string => {
  const { prKey, t, q } = data;
  let privateKey: number[];

  if (Array.isArray(prKey)) privateKey = prKey.map((x) => Number(x));
  else privateKey = prKey.split(',').map((a) => Number(a.trim()));

  if (!privateKey || privateKey.length === 0 || !t || !q) return content;

  const tInv = modInv(t, q);
  const tokens = content.split(',').map((tkn) => tkn.trim());
  let result = '';

  for (const token of tokens) {
    const c = parseInt(token, 10);
    if (isNaN(c)) {
      result += '[?]';
      continue;
    }
    const bits = decryptBits(c, privateKey, tInv, q);
    const code = bitsToInt(bits);
    result += String.fromCharCode(code);
  }

  return result;
};
