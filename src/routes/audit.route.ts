import express from "express";
import { 
    getAllAudits, 
    getAuditById, 
    createAudit, 
    updateAudit,
    deleteAudit,
} from "../controllers/audit.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const AuditRouter = express.Router()

AuditRouter.use(MiddlewareService.protect)

AuditRouter.get('/get-audits', getAllAudits)

AuditRouter.get('/one-audit/:id', getAuditById);

AuditRouter.post('/create-audit', createAudit);

AuditRouter.patch('/update-audit/:id', updateAudit);

AuditRouter.delete('/delete-audit/:id', deleteAudit)

export default AuditRouter;