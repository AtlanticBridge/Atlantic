import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig } from '@chainlink/types'
import Web3 from "web3";

/**
 * @note We want to create a web3 connection to Binance and the smart contract address.
 */

export const NAME = 'binance'

export interface AverageResponse {
  address: string
  balance: number
}

export const execute: ExecuteWithConfig<Config> = async (request, config) => {

  // --- CREATE VALIDATOR ---
  const validator = new Validator(request)
  if (validator.error) throw validator.error

  // --- LOCAL VARIABLES ---
  const jobRunID = validator.validated.id
  const options = {
    ...config.api,
  }

  /**
   * Create a link to bianance with a provider to send information to.
   */
  const web3_provider = new Web3('') // add ws socket from Ankr

  // Set 2: Connect 



  const response = await Requester.request<AverageResponse[]>(options)

  const avg = 27
  
  const res = Requester.withResult(response, avg)

  return Requester.success(jobRunID, res, false)
}