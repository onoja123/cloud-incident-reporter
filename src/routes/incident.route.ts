import express from "express";
import { 
    getAllIncidents, 
    getIncidentById, 
    createIncident, 
    updateIncident,
    deleteIncident,
} from "../controllers/incident.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const IncidentRouter = express.Router()

IncidentRouter.use(MiddlewareService.protect)

IncidentRouter.get('/get-incidents', getAllIncidents)

IncidentRouter.get('/one-incident/:id', getIncidentById);

IncidentRouter.post('/create-incident', createIncident);

IncidentRouter.patch('/update-incident/:id', updateIncident);

IncidentRouter.delete('/delete-incident/:id', deleteIncident)

export default IncidentRouter;