import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'CCIP'

export const DEFAULT_MESSAGE = 'high'
export const DEFAULT_CHAINID = 'average'
export const DEFAULT_CHAINID_ENDPOINT = ''

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_CHAINID_ENDPOINT
  return config
}
