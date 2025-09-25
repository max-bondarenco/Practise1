const buildGrid = (
  poem: string,
  rows: number,
  cols: number,
  filler: string
) => {
  const grid: string[][] = [];

  const chars = Array.from(poem);
  const size = rows * cols;

  const filled = chars.slice(0, size);
  while (filled.length < size) filled.push(filler);

  for (let row = 0; row < rows; row++) {
    grid.push([]);

    for (let col = 0; col < cols; col++) {
      grid[row].push(filled[row * cols + col]);
    }
  }

  return grid;
};

const findPositions = (grid: string[][], character: string) => {
  const pos: { row: number; col: number }[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === character) pos.push({ row, col });
    }
  }

  return pos;
};

const encodeCharacter = (positions: { row: number; col: number }[]) => {
  const pickIndex =
    positions.length > 1 ? Math.floor(Math.random() * positions.length) : 0;
  const position = positions[pickIndex];

  return `${String(position.row + 1).padStart(2, '0')}/${String(
    position.col + 1
  ).padStart(2, '0')}`;
};

export const encryptBook = (content: string, data: any) => {
  const { key: poem = '', rows = 10, cols = 10, filler = ' ' } = data;
  if (!poem || !poem.length) return content;

  const grid = buildGrid(poem, rows, cols, filler);
  const tokens: string[] = [];

  for (const character of content) {
    const positions = findPositions(grid, character);

    if (positions.length === 0) {
      tokens.push('00/00');
      continue;
    }

    tokens.push(encodeCharacter(positions));
  }

  return tokens.join(', ');
};

export const decryptBook = (content: string, data: any) => {
  const { key: poem = '', rows = 10, cols = 10, filler = ' ' } = data;
  if (!poem || !poem.length) return content;

  const grid = buildGrid(poem, rows, cols, filler);
  const tokens = content.split(',').map((t) => t.trim());
  let result = '';

  for (const token of tokens) {
    if (token === '00/00') {
      result += '[?]';
      continue;
    }

    const [rowStr, colStr] = token.split('/');
    const row = parseInt(rowStr, 10) - 1;
    const col = parseInt(colStr, 10) - 1;

    if (
      isNaN(row) ||
      isNaN(col) ||
      row < 0 ||
      col < 0 ||
      row >= grid.length ||
      col >= grid[row].length
    ) {
      result += '[?]';
      continue;
    }

    result += grid[row][col];
  }

  return result;
};
