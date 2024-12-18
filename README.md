# apib2json-esm

[![Release][img-release]][link-release]
[![License][img-license]][link-license]

A command-line utility for get JSON Schema(s) from API Blueprint. Now in ESM environment

## Introduction

**Attention!**

This one is a slight remake from original `apib2json` (<https://github.com/slimapi/apib2json>) which intentionally replacing the protagonist with `drafter.js` to make it much portable in multiple systems (as drafter.js is pure JS without native bindings). While we at it, I also rework the package into ESM environment and use `tsx` and `pkgroll` as well to bundle and run.

**Original Readme:**

If you are building your API with [Apiary][link-apiary] you should know [API Blueprint][link-apib], right? Good documentation is cool but it would be nice to re-use your validation which you already wrote in [MSON][link-mson] (or [JSON Schema][link-json-schema]). So here is the task: **Get JSON Schema(s) from API Blueprint**. Good news for you: This tool does it!

It is built on top of [apiaryio/protagonist][link-protagonist] which does the hard job, but if you know this Node.js C++ binding you sure know that compilation of this library (`npm install protagonist`) is very slow. This is the reason why this tool is also wrapped with [Docker][link-docker], but sure you can also use it with [`npm`][link-npm].

## Installation

```bash
npm install --global @akasection/apib2json-esm
```

~~> **NOTE**: The dockerized version is recommended, just try `$ docker run --rm slimapi/apib2json --help`~~

## Usage

**$ apib2json-esm, --help**

```bash
Usage: apib2json-esm [options]

A command-line utility for get JSON Schema(s) from API Blueprint

Options:
  -d, --debug          Debug (verbose) mode, use only with --output (default: false)
  -h, --help           Prints this help
  -i, --input <file>   Path to input (API Blueprint) file (default: STDIN)
  --indent <number>    Number of space characters used to indent code, use with --pretty (default: 2)
  -o, --output <file>  Path to output (JSON) file (default: STDOUT)
  -p, --pretty         Output pretty (indented) JSON (default: false)
  -v, --version        Prints version
```

## Example

~~> **NOTE**: The example below requires `docker` installed (npm's version without prefix `docker run --rm -i slimapi/`)~~

**$ cat input.apib**

```
# Awesome API

## Coupon [/coupons/{id}]
A coupon contains information about a percent-off or amount-off discount you
might want to apply to a customer.

+ Attributes (object)
    + id: 250FF (string, required)
    + created: 1415203908 (number) - Time stamp
    + percent_off: 25 (number)

        A positive integer between 1 and 100 that represents the discount the coupon will apply.

    + redeem_by (number) - Date after which the coupon can no longer be redeemed

### Retrieve a Coupon [GET]
Retrieves the coupon with the given ID.

+ Response 200 (application/json)
    + Attributes (Coupon)
```

**$ cat output.json**

```json
{
  "[GET]/coupons/{id}": [
    {
      "meta": {
        "type": "response",
        "title": "Retrieve a Coupon",
        "group": "Coupon",
        "statusCode": "200"
      },
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "created": {
            "type": "number"
          },
          "percent_off": {
            "type": "number"
          },
          "redeem_by": {
            "type": "number"
          }
        },
        "required": [
          "id"
        ]
      }
    }
  ]
}
```

> **NOTE**: More examples of input/ouput are available in [test/fixtures](./test/fixtures) folder.

## Contributing

#### Bug Reports & Feature Requests

Please use the [issue tracker][link-issue] to report any bugs or file feature requests.

#### Developing

Simply clone and start coding. You can test your changes by running:

```bash
pnpm tsx src/index.ts
```

## License

Originally licensed MIT @ [Petr Bugyík][link-twitter]

[link-apiary]: https://apiary.io
[link-apib]: https://github.com/apiaryio/api-blueprint
[link-docker]: https://www.docker.com/what-docker
[link-issue]: https://github.com/akasection/apib2json-esm/issues
[link-json-schema]: http://json-schema.org
[link-license]: LICENSE.md
[link-mson]: https://github.com/apiaryio/mson
[link-npm]: https://www.npmjs.com/package/apib2json
[link-protagonist]: https://github.com/apiaryio/protagonist
[link-release]: https://github.com/akasection/apib2json/releases
[link-twitter]: https://twitter.com/bugyik

[img-license]: https://img.shields.io/github/license/akasection/apib2json-esm?style=flat-square&label=License&color=blue
[img-release]: https://img.shields.io/github/v/tag/akasection/apib2json-esm.svg?label=Release&style=flat-square
