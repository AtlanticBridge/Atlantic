import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteFactory, ExecuteWithConfig } from '@chainlink/types'
import { DEFAULT_ENDPOINT, makeConfig } from './config'
// import { getHighLow } from "./util";
import { average, highlow } from './endpoint'

const inputParams = {
  endpoint: false
}
export const execute: ExecuteWithConfig<Config> = async (request, config) => {

  const validator = new Validator(request, inputParams)
  if (validator.error) throw validator.error

  Requester.logConfig(config)

  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint || DEFAULT_ENDPOINT

  switch (endpoint) {

    case 'average':
      return await average.execute(request, config)

    case 'highlow':
      return await highlow.execute(request, config)

    default:
      throw new AdapterError({
        jobRunID,
        message: `Endpoint ${endpoint} not supported.`,
        statusCode: 400,
      })
  }
}

export const makeExecute: ExecuteFactory<Config> = (config) => {
  return async (request) => execute(request, config || makeConfig())
}
