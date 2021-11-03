import { Router } from "express";

const mainRoutes = Router();
const jobIds = []

/** Health check endpoint */
mainRoutes.get('/', (req, res) => {
    res.sendStatus(200);
 })

 /** Called by chainlink node when a job is created using this external initiator */
 mainRoutes.post('/jobs', (req, res) => {
     // Recieves info from node about the job id
     jobIds.push(req.body.jobId) // save the job id
     res.sendStatus(200);
  })

 /** Called by chainlink node when running the job */
 mainRoutes.get("/temp", (req, res) => {
     res.send({'temp': 42})
 });



export { mainRoutes }