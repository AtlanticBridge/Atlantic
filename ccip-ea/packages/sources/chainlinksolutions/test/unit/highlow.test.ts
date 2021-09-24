import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'


describe('highlow endpoint', () => {
    const jobID = '1'
    const execute = makeExecute()
    process.env.API_KEY = process.env.API_KEY ?? 'test_api_key'
    // const request = { name: 'empty body', testData: { id: jobID, data: { options: 'average' } } }
    

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