import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n')

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.reduce((acc, cur) => {
    const arr = cur.split('')
    const firstNum = arr.find((c) => /\d/.test(c))
    const lastNum = arr.reverse().find((c) => /\d/.test(c))
    const num = +`${firstNum}${lastNum}`
    return acc + num
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0
  }

  const exp = /\d|one|two|three|four|five|six|seven|eight|nine|zero/g

  return input.reduce((acc, cur) => {
    let m: RegExpExecArray | null
    const matches = []
    while ((m = exp.exec(cur))) {
      matches.push(m[0])
      exp.lastIndex = m.index + 1
    }
    const firstNum = matches[0]
    const lastNum = matches.at(-1)
    const num = +`${numbers[firstNum as keyof typeof numbers] ?? firstNum}${
      numbers[lastNum as keyof typeof numbers] ?? lastNum
    }`
    return acc + num
  }, 0)
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
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
