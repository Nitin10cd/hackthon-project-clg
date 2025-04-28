import express from "express"
import { EventCreation , FetchEvents , EventDetails , EventPoll  } from "../controllers/events.controller.js";
import { generateContent } from "../services/Aimodel.js";


const EventRouter = express.Router();

EventRouter.post("/eventcreation" , EventCreation);
EventRouter.get("/eventsfetch" , FetchEvents);
EventRouter.post("/eventdetails" , EventDetails);
EventRouter.post("/eventpoll" , EventPoll);
EventRouter.post("/generatecontent" , generateContent)
export default EventRouter ;