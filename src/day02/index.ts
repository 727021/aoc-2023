import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n')

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const badGame =
    /(?:1[3-9]|[2-9]\d) red|(?:1[4-9]|[2-9]\d) green|(?:1[5-9]|[2-9]\d) blue/
  const gameNumber = /Game (\d+)/

  let sum = 0

  for (const line of input) {
    if (!badGame.test(line)) {
      sum += +(gameNumber.exec(line)?.[1] ?? 0)
    }
  }

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const minColor = (color: string, line: string) => {
    const exp = new RegExp(`(\\d+) ${color}`, 'g')
    const matches = line.matchAll(exp)
    const min = Math.max(...[...matches].map((m) => +m[1]))
    return min
  }

  let sum = 0

  for (const line of input) {
    const red = minColor('red', line)
    const green = minColor('green', line)
    const blue = minColor('blue', line)
    const power = red * blue * green
    sum += power
  }

  return sum
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
