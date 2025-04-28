import express from "express"
import { getPlacementCellJobs, publishJobs } from "../controllers/placement.controller.js";
const placementRoute = express.Router();

placementRoute.post('/placement-post',publishJobs);
placementRoute.get('/placement-jobs',getPlacementCellJobs);

export default placementRoute;

