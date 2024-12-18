#!/usr/bin/env node

/**
 * This file is part of the apib2json
 *
 * Copyright (c) 2021 Petr Bugyík
 *
 * For the full copyright and license information, please view
 * the file LICENSE.md that was distributed with this source code.
 */

import Commander from 'commander'
import fs from 'node:fs'
import Apib2Json from '.'
import info from '../package.json'

const Program = new Commander.Command()

Program.configureHelp({
  sortOptions: true,
})

const myParseInt = (value: any): number => {
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) {
    throw new Commander.InvalidArgumentError('Not a number.')
  }

  return parsedValue
}

Program.description(info.description)
  .helpOption('-h, --help', 'Prints this help')
  .option(
    '--indent <number>',
    'Number of space characters used to indent code, use with --pretty',
    myParseInt,
    2,
  )
  .option('-d, --debug', 'Debug (verbose) mode, use only with --output', false)
  .option(
    '-i, --input <file>',
    'Path to input (API Blueprint) file (default: STDIN)',
  )
  .option('-o, --output <file>', 'Path to output (JSON) file (default: STDOUT)')
  .option('-p, --pretty', 'Output pretty (indented) JSON', false)
  .version(info.version, '-v, --version', 'Prints version')

const options = Program.parse(process.argv).opts()

async function main(input: string) {
  const apib = new Apib2Json(options)
  try {
    const json = await apib.toJson(input)
    if(options.output) {
      fs.writeFileSync(options.output, json)
    } else {
      process.stdout.write(json)
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('ERROR: Parsing failed (%s)', error.message)
    } else {
      throw error
    }
    process.exit(1)
  }
}

let input = ''
if (process.stdin.isTTY) {
  if (!options.input) {
    Program.outputHelp()
    process.exit(1)
  }

  try {
    input = fs.readFileSync(options.input).toString()
  } catch {
    console.error('ERROR: File "%s" cannot be opened.', options.input)
    process.exit(1)
  }

  main(input)
} else {
  process.stdin.on('data', chunk => {
    input += chunk
  })

  process.stdin.on('end', () => {
    if (!input) {
      Program.outputHelp()
      process.exit(1)
    }

    main(input)
  })

  process.stdin.setEncoding('utf8')
}
