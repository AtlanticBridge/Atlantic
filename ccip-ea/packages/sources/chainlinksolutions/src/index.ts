import { expose } from '@chainlink/ea-bootstrap'
import { makeExecute } from './adapter'
import { makeConfig, NAME } from './config'

export = { NAME, makeExecute, makeConfig, ...expose(makeExecute()) }


/*

    - Request

    1] curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": "1", "data": { "endpoint": "average" } }'
    2] curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": "1", "data": { "endpoint": "highlow", "highlow": "high" } }'
    3] curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": "1", "data": { "endpoint": "highlow", "highlow": "low" } }'

    - Request from Smart Contract
    
    1]
        req.add("endpoint", "average")
    2]
        req.add("endpoint", "highlow")
        req.add("highlow", "high")
    3]
        req.add("endpoint", "highlow")
        req.add("highlow", "low")

    - Job Specification

    1] We want to have:
        1a] a JobID
        1b]an Orcale Address



    My APIConsumer.sol Contract Address: 0xB2AFBc2EA41E0a8e3a84DD02E8421A8A759201f3
*/