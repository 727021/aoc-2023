import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => {
  const [winning, yours] = line.replace(/Card\s+\d+: /, '').split('|')
  const winningNumbers = winning.split(' ').filter(Boolean).map(n => parseInt(n, 10))
  const yourNumbers = yours.split(' ').filter(Boolean).map(n => parseInt(n, 10))
  return { winningNumbers, yourNumbers }
})

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const points = input.reduce((sum, { winningNumbers, yourNumbers }) => {
    const matching = yourNumbers.filter(n => winningNumbers.includes(n)).length
    if (matching > 0) return sum + (2 ** (matching - 1))
    return sum
  }, 0)

  return points
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const copies: number[] = new Array(input.length).fill(0)

  for (let i = 0; i < input.length; ++i) {
    const { winningNumbers, yourNumbers } = input[i]
    const matching = yourNumbers.filter(n => winningNumbers.includes(n)).length
    const numCards = copies[i] + 1
    for (let j = i + 1; j < copies.length && j <= i + matching; ++j) {
      copies[j] += numCards
    }
  }

  const total = copies.reduce((sum, num) => sum + num, 0) + copies.length

  return total
}

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
