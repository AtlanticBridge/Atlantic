import { Requester } from '@chainlink/ea-bootstrap'
import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('average endpoint', () => {
    const jobID = '1'
    const execute = makeExecute()
    process.env.API_KEY = process.env.API_KEY ?? 'test_api_key'

    describe('successful calls', () => {
      const requests = [
        {
          name: 'address with highest amount',
          testData: { id: jobID, data: { endpoint: 'average' } },
        }
      ]

      requests.forEach((req) => {
        it(`${req.name}`, async () => {
          const data = await execute(req.testData as AdapterRequest)
          assertSuccess({ expected: 200, actual: data.statusCode }, data, jobID)
          expect(data.result).toEqual(462122230678539)
          expect(data.data.result).toEqual(462122230678539)
        })
      })
    })

    describe('validation error', () => {
        const requests = [
            { name: 'empty body', testData: {} },
            { name: 'empty data', testData: { data: {} } }
        ]

        requests.forEach((req) => {
            it(`${req.name}`, async () => {
                try {
                    await execute(req.testData as AdapterRequest)
                } catch (error) {
                    const errorResp = Requester.errored(jobID, error)
                    assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
                }
            })
        })
    })
})
