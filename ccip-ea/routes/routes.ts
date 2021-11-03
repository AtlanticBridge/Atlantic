import { Router } from "express";
import { createRequest } from "..";

const routes = Router();
const jobIds = [];

/** Health check endpoint */
routes.get('/', (req, res) => {
    createRequest(req.body, (status, result) => {
        console.log('Result: ', result);
        res.status(status).json(result);
      });
 });

 /** Called by chainlink node when a job is created using this external initiator */
 routes.post('/jobs', (req, res) => {
     // Recieves info from node about the job id
     jobIds.push(req.body.jobId); // save the job id
     res.sendStatus(200);
  });

 /** Called by chainlink node when running the job */
 routes.get("/temp", (req, res) => {
     res.send({'temp': 42});
 });



export { routes };