import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig } from '@chainlink/types'
import { getAverage } from "../util";

export const NAME = 'average'

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
  const response = await Requester.request<AverageResponse[]>(options)

  const avg = getAverage(response.data)
  
  const res = Requester.withResult(response, avg)

  return Requester.success(jobRunID, res, false)
}