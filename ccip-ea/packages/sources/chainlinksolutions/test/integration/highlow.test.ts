import { Requester } from '@chainlink/ea-bootstrap'
import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'

describe('highlow endpoint', () => {
    const jobID = '1'
    const execute = makeExecute()
    process.env.API_KEY = process.env.API_KEY ?? 'test_api_key'

    describe('successful high calls', () => {
      const requests = [
        {
          name: 'address with highest amount',
          testData: { id: jobID, data: { endpoint: 'highlow', highlow: 'high' } },
        }
      ]

      requests.forEach((req) => {
        it(`${req.name}`, async () => {
          const data = await execute(req.testData as AdapterRequest)
          assertSuccess({ expected: 200, actual: data.statusCode }, data, jobID)
          
          expect(data.result).toEqual("0x097a6eace20a3368a85fe423e50294f1c342de1e76f422167f40000000000000")
          expect(data.data.result).toEqual("0x097a6eace20a3368a85fe423e50294f1c342de1e76f422167f40000000000000")
        })
      })
    })

    describe('successful low calls', () => {
      const requests = [
        {
          name: 'address with lowest amount',
          testData: { id: jobID, data: { endpoint: 'highlow', highlow: 'low' } },
        }
      ]

      requests.forEach((req) => {
        it(`${req.name}`, async () => {
          const data = await execute(req.testData as AdapterRequest)
          assertSuccess({ expected: 200, actual: data.statusCode }, data, jobID)

          expect(data.result).toEqual("0x08685a43250bb9ab7d7ad18a329f2b4b46cc5f72caf3eb98c8a0000000000000")
          expect(data.data.result).toEqual("0x08685a43250bb9ab7d7ad18a329f2b4b46cc5f72caf3eb98c8a0000000000000")
        })
      })
    })

    describe('validation error', () => {
        const requests = [
            { name: 'empty body', testData: {} },
            { name: 'empty data', testData: { data: {} } },
            {
              name: 'highlow not supplied',
              testData: { id: jobID, data: { endpoint: 'highlow' } },
            },
            {
              name: 'endpoint not supplied',
              testData: { id: jobID, data: { highlow: 'high' } },
            },
            {
              name: 'unknown highlow',
              testData: { id: jobID, data: { endpoint: 'highlow', highlow: 'not_real' } },
            }
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
