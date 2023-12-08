import run from 'aocrunner'

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split(''))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const includesSymbol = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
    return input
      .slice(Math.max(0, yStart), Math.min(input.length, yEnd + 1))
      .some(row =>
        row
          .slice(Math.max(0, xStart), Math.min(row.length, xEnd + 1))
          .some(char => !/[\d\.]/.test(char))
      )
  }

  let sum = 0

  for (let y = 0; y < input.length; ++y) {
    const row = input[y]
    let curNum = ''
    for (let x = 0; x < row.length; ++x) {
      const cell = row[x]
      if (/\d/.test(cell)) {
        curNum += cell
      } else if (curNum.length) {
        // see if the number touches a symbol
        if (includesSymbol(x - curNum.length - 1, y - 1, x, y + 1)) {
          sum += +curNum
        }
        curNum = ''
      }
    }
    if (curNum.length) {
      // see if the number touches a symbol
      const x = row.length
      if (includesSymbol(x - curNum.length - 1, y - 1, x, y + 1)) {
        sum += +curNum
      }
      curNum = ''
    }
  }

  return sum
}

type PartNumber = {
  value: number
  x: number
  y: number
  length: number
}

type Gear = {
  value: 'gear'
  x: number
  y: number
}

type Part = PartNumber | Gear

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const includesSymbol = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
    return input
      .slice(Math.max(0, yStart), Math.min(input.length, yEnd + 1))
      .some(row =>
        row
          .slice(Math.max(0, xStart), Math.min(row.length, xEnd + 1))
          .some(char => !/[\d\.]/.test(char))
      )
  }

  let parts: Part[] = []

  for (let y = 0; y < input.length; ++y) {
    const row = input[y]
    let curNum = ''
    for (let x = 0; x < row.length; ++x) {
      const cell = row[x]
      if (/\d/.test(cell)) {
        curNum += cell
      } else if (curNum.length) {
        // see if the number touches a symbol
        if (includesSymbol(x - curNum.length - 1, y - 1, x, y + 1)) {
          const partNumber = +curNum
          parts.push({
            value: partNumber,
            length: curNum.length,
            x: x - curNum.length, // the start of the part number
            y
          })
        }
        curNum = ''
      }
      if (row[x] === '*') {
        // a potential gear. once we build our list of parts, we'll check which ones are actually gears.
        parts.push({
          value: 'gear',
          x,
          y
        })
      }
    }
    if (curNum.length) {
      // see if the number touches a symbol
      const x = row.length
      if (includesSymbol(x - curNum.length - 1, y - 1, x, y + 1)) {
        const partNumber = +curNum
        parts.push({
          value: partNumber,
          length: curNum.length,
          x: x - curNum.length, // the start of the part number
          y
        })
      }
      curNum = ''
    }
  }

  const potentialGears = parts.filter(({ value }) => value === 'gear') as Gear[]
  const sumOfGearRatios = potentialGears.reduce((sum, gear) => {
    const adjacentPartNumbers = parts.filter(part => {
      if (part.value === 'gear') return false
      if (part.y < gear.y - 1) return false
      if (part.y > gear.y + 1) return false
      if (part.x > gear.x + 1) return false
      if (part.x + part.length < gear.x) return false
      return true
    }) as PartNumber[]

    if (adjacentPartNumbers.length === 2) {
      return sum + adjacentPartNumbers[0].value * adjacentPartNumbers[1].value
    }

    return sum
  }, 0)
  return sumOfGearRatios
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
