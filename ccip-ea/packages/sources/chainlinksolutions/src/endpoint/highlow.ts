import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig } from '@chainlink/types'
import { getHighAddress, getLowAddress } from "../util";
import { TextEncoding6bit } from "../coding";

export const NAME = 'highlow'

export interface HighlowResponse {
  address: string
  balance: number
}

const customParams = {
  highlow: false
}

export const execute: ExecuteWithConfig<Config> = async (request, config) => {

  // --- CREATE VALIDATOR ---
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  // --- LOCAL VARIABLES ---
  let address: string = ''
  var textEncoding6bit: any = new TextEncoding6bit();
  var dataHex: string;
  const jobRunID = validator.validated.id
  const highlow = validator.validated.data.highlow

  const options = {
    ...config.api,
  }

  const response = await Requester.request<HighlowResponse[]>(options)

  switch (highlow) {

    case 'high':
      address = getHighAddress(response.data)
      dataHex = textEncoding6bit.Encode(address)

      return Requester.success(jobRunID, {
        data: { result: dataHex },
        status: 200
      })

    case 'low':
      address = getLowAddress(response.data)
      dataHex = textEncoding6bit.Encode(address)

      return Requester.success(jobRunID, {
        data: { result: dataHex },
        status: 200
      })
      
    default:
      throw new AdapterError({
        jobRunID,
        message: `HighLow specification ${highlow} not supported or not given.`,
        statusCode: 400,
      })
  }
}