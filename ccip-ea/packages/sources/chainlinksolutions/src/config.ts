import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

export const NAME = 'COINGECKO'

export const DEFAULT_HIGHLOW = 'high'
export const DEFAULT_ENDPOINT = 'average'
export const DEFAULT_API_ENDPOINT = 'https://gist.githubusercontent.com/thodges-gh/3bd03660676504478de60c3a17800556/raw/0013f560b97eb1b2481fd4d57f02507c96f0d88f/balances.json'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_API_ENDPOINT
  return config
}
