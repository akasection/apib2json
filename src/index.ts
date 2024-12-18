/**
 * This file is part of the apib2json
 *
 * Copyright (c) 2021 Petr Bugyík
 *
 * For the full copyright and license information, please view
 * the file LICENSE.md that was distributed with this source code.
 */

import Drafter from 'drafter.js'

type ClassOpts = {
  debug: boolean
  pretty: boolean
  indent: number
  logger: CallableFunction
}

class Apib2Json {
  protected options: ClassOpts
  protected defaults: ClassOpts

  constructor(options: Partial<ClassOpts>) {
    this.defaults = {
      debug: false,
      pretty: false,
      indent: 2,
      logger: console.log, // eslint-disable-line no-console
    }

    this.options = Object.assign(this.defaults, options)
  }

  log(...args: any[]) {
    if(this.options.debug) this.options.logger(...args)
  }

  toArray(apib: string): Promise<any> {
    const that = this
    return new Promise((resolve, reject) => {
      const data = {} as Record<string, any>
      const result = Drafter.parseSync(apib, { requireBlueprintName: true })

      // console.log(JSON.stringify(result, null, 4));
      // process.exit(1);

      if (
        result.content.length === 1 &&
        result.content[0].element === 'annotation'
      ) {
        reject(new SyntaxError(result.content[0].content))
        return
      }

      for (const content of result.content) {
        /* istanbul ignore if: tired of writing tests */
        if (content.element !== 'category') {
          continue
        }

        for (const category of content.content) {
          let group = null
          if (['category', 'resource'].includes(category.element)) {
            group = category.meta.title ? category.meta.title.content : null
          } else {
            continue
          }

          if (group !== null) {
            this.log('GROUP: %s', group)
          }

          let catResContent = category.content
          if (category.element === 'resource') {
            catResContent = []
            catResContent.push({
              element: 'resource',
              attributes: category.attributes,
              content: category.content,
            })
          }

          for (const resource of catResContent) {
            /* istanbul ignore if: tired of writing tests */
            if (resource.element !== 'resource') {
              continue
            }

            let path = resource.attributes.href.content
            for (const transition of resource.content) {
              if (transition.element !== 'transition') {
                continue
              }

              if (transition.attributes && transition.attributes.href) {
                path = transition.attributes.href.content
              }

              for (const httpTransaction of transition.content) {
                if (httpTransaction.element !== 'httpTransaction') {
                  continue
                }

                for (const httpTransactionType of httpTransaction.content) {
                  const type =
                    httpTransactionType.element === 'httpRequest'
                      ? 'request'
                      : 'response'

                  let title = null
                  if (
                    httpTransactionType.meta &&
                    httpTransactionType.meta.title
                  ) {
                    title = httpTransactionType.meta.title.content
                  } else if (transition.meta && transition.meta.title) {
                    title = transition.meta.title.content
                  }

                  const method =
                    httpTransaction.content[0].attributes.method.content
                  const endpoint = `[${method}]${path}`
                  this.log('%s: [%s %s]', type.toUpperCase(), method, path)

                  for (const asset of httpTransactionType.content) {
                    if (
                      asset.element !== 'asset' ||
                      !asset.attributes ||
                      !asset.attributes.contentType ||
                      asset.attributes.contentType.content !==
                        'application/schema+json'
                    ) {
                      continue
                    }

                    if (!Object.prototype.hasOwnProperty.call(data, endpoint)) {
                      data[endpoint] = []
                    }

                    const item = {
                      meta: {
                        type,
                        title,
                        group,
                        statusCode: undefined as any,
                      },
                      schema: asset.content,
                    }

                    if (
                      type === 'response' &&
                      httpTransactionType.attributes.statusCode
                    ) {
                      item.meta.statusCode =
                        httpTransactionType.attributes.statusCode.content
                    }

                    data[endpoint].push(item)
                  }
                }
              }
            }
          }
        }
      }

      if (that.options.debug) {
        const counter = { endpoints: 0, transactions: 0 }
        for (const key of Object.keys(data)) {
          counter.endpoints += 1
          counter.transactions += Object.keys(data[key]).length
        }

        that.log(
          'DONE: Found %i endpoints (%i transactions) with JSON Schema.',
          counter.endpoints,
          counter.transactions,
        )
      }

      resolve(data)
    })
  }

  async toJson(apib: string): Promise<any> {
    const result = await this.toArray(apib)
    const data = {} as Record<string, any>
    for (const endpoint of Object.keys(result)) {
      const items = result[endpoint]
      if (!Object.prototype.hasOwnProperty.call(data, endpoint)) {
        data[endpoint] = []
      }

      for (const item of items) {
        const i = item
        i.schema = JSON.parse(i.schema)
        data[endpoint].push(i)
      }
    }
    return this.options.pretty
      ? JSON.stringify(data, null, this.options.indent)
      : JSON.stringify(data)
  }
}

export default Apib2Json
