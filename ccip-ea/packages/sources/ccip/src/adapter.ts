import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteFactory, ExecuteWithConfig } from '@chainlink/types'
import { DEFAULT_CHAINID_ENDPOINT, makeConfig } from './config'
// import { getHighLow } from "./util";
import { ethereum, binance } from './endpoint'

const inputParams = {
  endpoint: false
}
export const execute: ExecuteWithConfig<Config> = async (request, config) => {

  const validator = new Validator(request, inputParams)
  
  // !!!!!!!!!!!!!!!!!!!!
  console.log(request)
  // !!!!!!!!!!!!!!!!!!!!

  if (validator.error) throw validator.error

  Requester.logConfig(config)

  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint || DEFAULT_CHAINID_ENDPOINT

  switch (endpoint) {

    /*
    Each case switch should be the chainId for which blockchain to send the message to.
    */
    
    case 'ethereum':
      return await ethereum.execute(request, config)

    case 'binance':
      return await binance.execute(request, config)

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
