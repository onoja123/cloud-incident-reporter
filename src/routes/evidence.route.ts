import express from "express";
import { 
    getAllEvidence, 
    getEvidenceById, 
    createEvidence, 
    updateEvidence,
    deleteEvidence,
} from "../controllers/evidence.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const EvidenceRouter = express.Router()

EvidenceRouter.use(MiddlewareService.protect)

EvidenceRouter.get('/get-evidences', getAllEvidence)

EvidenceRouter.get('/one-evidence/:id', getEvidenceById);

EvidenceRouter.post('/create-evidence', createEvidence);

EvidenceRouter.patch('/update-evidence/:id', updateEvidence);

EvidenceRouter.delete('/delete-evidence/:id', deleteEvidence)

export default EvidenceRouter;